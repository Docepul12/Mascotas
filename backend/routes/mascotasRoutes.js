// Importar dependencias necesarias
const express = require('express');
const router = express.Router();
const Mascota = require('../models/Mascota');
const multer = require('multer');
const fs = require('fs').promises;

// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'));
    }
  },
});

// Ruta para obtener todas las mascotas
router.get('/', async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    res.status(500).json({ error: 'Error al obtener mascotas' });
  }
});

// Ruta para agregar una nueva mascota con una foto
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { nombre, raza, edad, genero, recomendacionesEspeciales, dueno } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Error: Archivo de foto requerido' });
    }

    const nuevaMascota = new Mascota({
      nombre,
      raza,
      edad,
      genero,
      recomendacionesEspeciales,
      dueno,
      foto: req.file.path,
    });

    await nuevaMascota.save();
    res.status(201).json({ message: 'Mascota creada exitosamente', mascota: nuevaMascota });
  } catch (error) {
    console.error('Error al agregar mascota:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: `Error de validación: ${error.message}` });
    }
    res.status(500).json({ error: 'Error al agregar mascota' });
  }
});

// Ruta para actualizar una mascota por ID
router.put('/:id', upload.single('foto'), async (req, res) => {
  const { id } = req.params;
  try {
    // Obtener la mascota actual
    const mascotaActual = await Mascota.findById(id);
    if (!mascotaActual) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    // Construir los datos para la actualización
    const { nombre, raza, edad, genero, recomendacionesEspeciales, dueno } = req.body;

    // Actualizar los datos de la mascota solo si se proporcionan
    const datosActualizados = {
      nombre: nombre || mascotaActual.nombre,
      raza: raza || mascotaActual.raza,
      edad: edad ? Number(edad) : mascotaActual.edad,
      genero: genero || mascotaActual.genero,
      recomendacionesEspeciales: recomendacionesEspeciales || mascotaActual.recomendacionesEspeciales,
      dueno: dueno || mascotaActual.dueno,
    };

    // Si no se proporciona una nueva foto, mantener la existente
    let foto = mascotaActual.foto;
    if (req.file) {
      // Eliminar la foto antigua si existe
      if (mascotaActual.foto) {
        await fs.unlink(mascotaActual.foto).catch((err) => {
          console.error('Error al eliminar la foto antigua:', err);
        });
      }
      foto = req.file.path;
    }
    datosActualizados.foto = foto;

    // Actualizar los datos de la mascota
    const mascotaActualizada = await Mascota.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true, runValidators: true }
    );

    res.json({ message: `Mascota con ID ${id} actualizada exitosamente`, mascota: mascotaActualizada });
  } catch (error) {
    console.error('Error al actualizar mascota:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: `Error de validación: ${error.message}` });
    }
    res.status(500).json({ error: 'Error al actualizar mascota' });
  }
});

// Ruta para obtener detalles de una mascota por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mascota = await Mascota.findById(id);
    if (!mascota) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }
    res.json(mascota);
  } catch (error) {
    console.error('Error al obtener mascota:', error);
    res.status(500).json({ error: 'Error al obtener mascota' });
  }
});

// Ruta para eliminar una mascota por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mascotaEliminada = await Mascota.findByIdAndDelete(id);
    if (!mascotaEliminada) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    // Eliminar la foto asociada a la mascota eliminada
    if (mascotaEliminada.foto) {
      await fs.unlink(mascotaEliminada.foto).catch((err) => {
        console.error('Error al eliminar la foto asociada:', err);
      });
    }

    res.json({ message: `Mascota con ID ${id} eliminada exitosamente` });
  } catch (error) {
    console.error('Error al eliminar mascota:', error);
    res.status(500).json({ error: 'Error al eliminar mascota' });
  }
});

// Exportar el enrutador
module.exports = router;

