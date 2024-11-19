require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const conectarDB = require('./config/db'); // Importar función para conectar a la base de datos
const cors = require('cors');
const path = require('path');

// Conectar a la base de datos
conectarDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parsear JSON desde las peticiones
app.use(express.urlencoded({ extended: true })); // Parsear datos de formularios
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Ruta estática para archivos subidos

// Importar y Definir Rutas
const paseadoresRoutes = require('./routes/paseadoresRoutes');
// const mascotasRoutes = require('./routes/mascotasRoutes');
// const authRoutes = require('./routes/authRoutes');

// app.use('/api/auth', authRoutes); // Registrar las rutas de autenticación
app.use('/api/paseadores', paseadoresRoutes);
// app.use('/api/mascotas', mascotasRoutes);

// Definir el puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} en modo ${process.env.NODE_ENV || 'desarrollo'}`);
});
