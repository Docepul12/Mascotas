const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Sin las opciones deprecadas
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Salir del proceso si no puede conectarse a la base de datos
  }
};

module.exports = conectarDB;

