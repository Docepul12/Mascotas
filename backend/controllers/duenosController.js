const Dueno = require('../models/Dueno');
const Mascota = require('../models/Mascota');
const mongoose = require('mongoose');
const fs = require('fs');

// Crear un dueño
const crearDueno = async (req, res) => {
  try {
    // Verificar qué datos llegan al backend
    console.log("Body recibido:", req.body);      // Esto imprime los datos del formulario que no son archivos
    console.log("Archivo recibido:", req.file);    // Esto imprime la información sobre el archivo de imagen

    // Validación de campos requeridos
    const { nombreDueno, telefonoDueno, direccionDueno, correoDueno } = req.body;
    if (!nombreDueno || !telefonoDueno || !direccionDueno || !correoDueno) {
      return res.status(400).json({ message: 'Todos los campos requeridos deben ser proporcionados' });
    }

    // Crear un objeto Dueño con la información recibida
    const nuevoDueno = new Dueno({
      nombreDueno,
      telefonoDueno,
      direccionDueno,
      correoDueno,
      fotoDueno: req.file ? req.file.path : null // Guarda la ruta de la imagen si es necesario
    });

    // Guardar el dueño en la base de datos
    const duenoGuardado = await nuevoDueno.save();
    res.status(201).json(duenoGuardado);
  } catch (error) {
    console.error('Error al crear el dueño:', error);
    res.status(500).json({ message: 'Error al crear el dueño', error });
  }
};

// Obtener todos los dueños
const obtenerDuenos = async (req, res) => {
  try {
    const duenos = await Dueno.find().populate('mascotas');
    res.status(200).json(duenos);
  } catch (error) {
    console.error('Error al obtener los dueños:', error);
    res.status(500).json({ message: 'Error al obtener los dueños', error });
  }
};

// Obtener un dueño por ID
const obtenerDuenoPorId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de dueño no válido' });
  }

  try {
    const dueno = await Dueno.findById(id).populate('mascotas');
    if (!dueno) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }
    res.status(200).json(dueno);
  } catch (error) {
    console.error('Error al obtener el dueño:', error);
    res.status(500).json({ error: 'Error al obtener el dueño' });
  }
};

// Modificar un dueño por ID
const modificarDueno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreDueno, telefonoDueno, direccionDueno, correoDueno, mascotas } = req.body;

    // Validación del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de dueño no válido' });
    }

    // Validación de campos requeridos
    if (!nombreDueno || !telefonoDueno || !direccionDueno || !correoDueno) {
      return res.status(400).json({ message: 'Todos los campos requeridos deben ser proporcionados' });
    }

    // Preparar datos a actualizar
    const datosActualizados = {
      nombreDueno,
      telefonoDueno,
      direccionDueno,
      correoDueno,
    };

    // Si se subió una nueva foto, agregarla a los datos
    if (req.file) {
      datosActualizados.fotoDueno = req.file.path;
    }

    // Manejar mascotas si se enviaron
    if (mascotas) {
      // Si es un texto separado por comas, conviértelo en un arreglo
      const listaMascotas = typeof mascotas === 'string' ? mascotas.split(',').map(m => m.trim()) : mascotas;

      // Actualizar o verificar mascotas en la base de datos
      datosActualizados.mascotas = await Mascota.find({
        nombre: { $in: listaMascotas },
      }).select('_id');
    }

    // Actualizar en la base de datos
    const duenoActualizado = await Dueno.findByIdAndUpdate(id, datosActualizados, {
      new: true,
      runValidators: true, // Valida los datos según el esquema
    });

    if (!duenoActualizado) {
      return res.status(404).json({ message: 'Dueño no encontrado' });
    }

    res.status(200).json(duenoActualizado);
  } catch (error) {
    console.error('Error al modificar el dueño:', error);
    res.status(500).json({ message: 'Error al modificar el dueño', error });
  }
};

// Eliminar un dueño por ID
const eliminarDueno = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID de dueño no válido' });
    }

    const duenoEliminado = await Dueno.findByIdAndDelete(id);
    if (!duenoEliminado) {
      return res.status(404).json({ message: 'Dueño no encontrado' });
    }

    // Eliminar las mascotas asociadas al dueño
    await Mascota.deleteMany({ dueno: duenoEliminado._id });

    // Eliminar la foto asociada si existe
    if (duenoEliminado.fotoDueno) {
      fs.unlink(duenoEliminado.fotoDueno, (err) => {
        if (err) console.error('Error al eliminar la foto asociada:', err);
      });
    }

    res.status(200).json({ message: 'Dueño eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el dueño:', error);
    res.status(500).json({ message: 'Error al eliminar el dueño', error });
  }
};

module.exports = {
  crearDueno,
  obtenerDuenos,
  obtenerDuenoPorId,
  modificarDueno,
  eliminarDueno,
};
