// Importar dependencias necesarias
const express = require('express');
const router = express.Router();
const Paseador = require('../models/Paseador'); // Importa el modelo de Paseador
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Carpeta donde se guardarán las imágenes

// Ruta para obtener todos los paseadores
router.get('/', async (req, res) => {
  try {
    const paseadores = await Paseador.find();
    res.json(paseadores);
  } catch (error) {
    console.error('Error al obtener paseadores:', error);
    res.status(500).send('Error al obtener paseadores');
  }
});

// Ruta para agregar un nuevo paseador con una foto
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    console.log('Archivo recibido:', req.file);
    console.log('Datos recibidos:', req.body);

    const { nombre, tipoIdentificacion, identificacion, telefono, email, telefonoEmpresa, direccionEmpresa, direccionPaseador, tarifa, calificacion } = req.body;

    if (!req.file) {
      return res.status(400).send('Error: Archivo de foto requerido');
    }

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
      foto: req.file.path
    });

    await nuevoPaseador.save();
    res.status(201).send('Paseador creado exitosamente');
  } catch (error) {
    console.error('Error al agregar paseador:', error);

    // Manejo de errores específicos de Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).send(`Error de validación: ${error.message}`);
    }

    if (error.code === 11000) {
      return res.status(400).send('Error: El email o la identificación ya están registrados.');
    }

    res.status(500).send('Error al agregar paseador');
  }
});

// Ruta para obtener detalles de un paseador por ID
router.get('/:id', async (req, res) => {
  try {
    const paseador = await Paseador.findById(req.params.id);
    if (!paseador) {
      return res.status(404).send('Paseador no encontrado');
    }
    res.json(paseador);
  } catch (error) {
    console.error('Error al obtener paseador:', error);
    res.status(500).send('Error al obtener paseador');
  }
});

// Ruta para actualizar un paseador por ID
router.put('/:id', async (req, res) => {
  try {
    const paseadorActualizado = await Paseador.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!paseadorActualizado) {
      return res.status(404).send('Paseador no encontrado');
    }
    res.send(`Paseador con ID ${req.params.id} actualizado exitosamente`);
  } catch (error) {
    console.error('Error al actualizar paseador:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).send(`Error de validación: ${error.message}`);
    }

    res.status(500).send('Error al actualizar paseador');
  }
});

// Ruta para eliminar un paseador por ID
router.delete('/:id', async (req, res) => {
  try {
    const paseadorEliminado = await Paseador.findByIdAndDelete(req.params.id);
    if (!paseadorEliminado) {
      return res.status(404).send('Paseador no encontrado');
    }
    res.send(`Paseador con ID ${req.params.id} eliminado exitosamente`);
  } catch (error) {
    console.error('Error al eliminar paseador:', error);
    res.status(500).send('Error al eliminar paseador');
  }
});

// Exportar el enrutador
module.exports = router;


