// Importar dependencias necesarias  
const express = require('express');
const router = express.Router();
const { crearDueno, obtenerDuenos, modificarDueno, eliminarDueno, obtenerDuenoPorId } = require('../controllers/duenosController');
const multer = require('multer');
const mongoose = require('mongoose');

// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos subidos
  },
  filename: (req, file, cb) => {
    const cleanFileName = file.originalname.replace(/\s+/g, '_'); // Reemplazar espacios por guiones bajos
    cb(null, `${Date.now()}-${cleanFileName}`);
  },
});

const upload = multer({ storage });

// Ruta para agregar un nuevo dueño con una foto
router.post('/', upload.single('fotoDueno'), crearDueno);

// Ruta para actualizar un dueño por ID con posibilidad de actualizar la foto
router.put('/:id', upload.single('fotoDueno'), modificarDueno);

// Ruta para obtener todos los dueños (SIN multer)
router.get('/', obtenerDuenos);

// Ruta para obtener detalles de un dueño por ID (SIN multer)
router.get('/:id', obtenerDuenoPorId);

// Ruta para eliminar un dueño por ID (SIN multer)
router.delete('/:id', eliminarDueno);

// Exportar el enrutador
module.exports = router;
