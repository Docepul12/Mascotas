require('dotenv').config(); // Cargar variables de entorno desde .env 
const express = require('express');
const conectarDB = require('./config/db'); // Importar función para conectar a la base de datos
const cors = require('cors');
const path = require('path');

// Conectar a la base de datos
conectarDB();

const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear JSON desde las peticiones
app.use(express.urlencoded({ extended: true })); // Parsear datos de formularios
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Ruta estática para archivos subidos

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('¡Bienvenido a nuestra API! Consulte /api/paseadores, /api/mascotas o /api/duenos para las rutas disponibles.');
});

// Importar y Definir Rutas
const paseadoresRoutes = require('./routes/paseadoresRoutes');
const mascotasRoutes = require('./routes/mascotasRoutes');
const duenosRoutes = require('./routes/duenosRoutes'); // Importar rutas de dueños

// Registrar rutas de paseadores, mascotas y dueños
app.use('/api/paseadores', paseadoresRoutes);
console.log('Rutas de paseadores registradas en /api/paseadores');

app.use('/api/mascotas', mascotasRoutes);
console.log('Rutas de mascotas registradas en /api/mascotas');

app.use('/api/duenos', duenosRoutes); // Aplicar el middleware de rutas de dueños con multer en el archivo de rutas
console.log('Rutas de dueños registradas en /api/duenos');

// Definir el puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} en modo ${process.env.NODE_ENV || 'desarrollo'}`);
});
