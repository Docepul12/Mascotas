const Mascota = require('../models/Mascota');
const Dueno = require('../models/Dueno');
const fs = require('fs');

// Crear una mascota
const crearMascota = async (req, res) => {
  try {
    // Verificar qué datos llegan al backend
    console.log("Body recibido:", req.body);      // Esto imprime los datos del formulario que no son archivos
    console.log("Archivo recibido:", req.file);    // Esto imprime la información sobre el archivo de imagen

    // Acceder a los datos del cuerpo y verificar que se hayan proporcionado los campos requeridos
    const { nombre, raza, edad, genero, dueno } = req.body;
    if (!nombre || !raza || !edad || !genero || !dueno) {
      return res.status(400).json({ message: 'Todos los campos requeridos deben ser proporcionados' });
    }

    // Verificar si el dueño existe
    const duenoExistente = await Dueno.findById(dueno);
    if (!duenoExistente) {
      return res.status(404).json({ message: 'Dueño no encontrado' });
    }

    // Accede a la imagen y a los demás datos
    const imagen = req.file; // La imagen subida

    // Crear un objeto Mascota con la información recibida
    const nuevaMascota = new Mascota({
      nombre,
      raza,
      edad,
      genero,
      recomendacionesEspeciales: req.body.recomendacionesEspeciales || '',
      dueno,
      foto: imagen ? imagen.buffer : null // Guarda la imagen en buffer si es necesario
    });

    // Guardar la mascota en la base de datos
    const mascotaGuardada = await nuevaMascota.save();

    // Actualizar el dueño agregando la referencia de la mascota
    await Dueno.findByIdAndUpdate(
      dueno,
      { $push: { mascotas: mascotaGuardada._id } },
      { new: true }
    );

    res.status(201).json(mascotaGuardada);
  } catch (error) {
    console.error('Error al crear la mascota:', error);
    res.status(500).json({ message: 'Error al crear la mascota', error });
  }
};

// Obtener todas las mascotas
const obtenerMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find().populate('dueno');
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las mascotas', error });
  }
};

// Modificar una mascota por ID
const modificarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, raza, edad, genero, dueno } = req.body;

    // Validación de campos requeridos
    if (!nombre || !raza || !edad || !genero || !dueno) {
      return res.status(400).json({ message: 'Todos los campos requeridos deben ser proporcionados' });
    }

    // Verificar si el dueño existe
    const duenoExistente = await Dueno.findById(dueno);
    if (!duenoExistente) {
      return res.status(404).json({ message: 'Dueño no encontrado' });
    }

    // Actualizar los datos de la mascota
    const mascotaActualizada = await Mascota.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!mascotaActualizada) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    res.status(200).json(mascotaActualizada);
  } catch (error) {
    console.error('Error al modificar la mascota:', error);
    res.status(500).json({ message: 'Error al modificar la mascota', error });
  }
};

// Eliminar una mascota por ID
const eliminarMascota = async (req, res) => {
  try {
    const mascotaEliminada = await Mascota.findByIdAndDelete(req.params.id);
    if (!mascotaEliminada) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    // Eliminar la foto asociada si existe
    if (mascotaEliminada.foto) {
      fs.unlink(mascotaEliminada.foto, (err) => {
        if (err) console.error('Error al eliminar la foto asociada:', err);
      });
    }

    // Actualizar el dueño eliminando la referencia de la mascota
    await Dueno.findByIdAndUpdate(
      mascotaEliminada.dueno,
      { $pull: { mascotas: mascotaEliminada._id } },
      { new: true }
    );

    res.status(200).json({ message: 'Mascota eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    res.status(500).json({ message: 'Error al eliminar la mascota', error });
  }
};

module.exports = {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota,
};
