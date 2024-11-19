// backend/controllers/paseadoresController.js 

const Paseador = require('../models/Paseador');

// Crear un paseador
const crearPaseador = async (req, res) => {
  try {
    // Verificar qué datos llegan al backend
    console.log("Body recibido:", req.body);      // Esto imprime los datos del formulario que no son archivos
    console.log("Archivo recibido:", req.file);    // Esto imprime la información sobre el archivo de imagen
    // Accede a la imagen y a los demás datos
    const imagen = req.file; // La imagen subida
    const { nombre, tipoIdentificacion, identificacion, telefono, email, telefonoEmpresa, direccionEmpresa, direccionPaseador, tarifa, calificacion } = req.body;

    // Crear un objeto Paseador con la información recibida
    const nuevoPaseador = new Paseador({
      nombre,
      tipoIdentificacion,
      identificacion,
      telefono,
      email,
      telefonoEmpresa,
      direccionEmpresa,
      direccionPaseador,
      tarifa,
      calificacion,
      foto: imagen ? imagen.buffer : null // Guarda la imagen en buffer si es necesario
    });

    // Guardar el paseador en la base de datos
    const paseadorGuardado = await nuevoPaseador.save();
    res.status(201).json(paseadorGuardado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el paseador', error });
  }
};

// Obtener todos los paseadores
const obtenerPaseadores = async (req, res) => {
  try {
    const paseadores = await Paseador.find();
    res.status(200).json(paseadores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los paseadores', error });
  }
};

// Modificar un paseador por ID
const modificarPaseador = async (req, res) => {
  try {
    const paseadorActualizado = await Paseador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paseadorActualizado) {
      return res.status(404).json({ message: 'Paseador no encontrado' });
    }
    res.status(200).json(paseadorActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar el paseador', error });
  }
};

// Eliminar un paseador por ID
const eliminarPaseador = async (req, res) => {
  try {
    const paseadorEliminado = await Paseador.findByIdAndDelete(req.params.id);
    if (!paseadorEliminado) {
      return res.status(404).json({ message: 'Paseador no encontrado' });
    }
    res.status(200).json({ message: 'Paseador eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paseador', error });
  }
};

module.exports = {
  crearPaseador,
  obtenerPaseadores,
  modificarPaseador,
  eliminarPaseador,
};
