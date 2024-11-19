const mongoose = require('mongoose');

const PaseadorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100 // nompas
  },
  tipoIdentificacion: {
    type: String,
    required: true,
    trim: true,
    maxlength: 3, // Tipide
    default: 'CC'
  },
  identificacion: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20 // Numide
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20 // Numcelpas
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50 // Email
  },
  telefonoEmpresa: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50 // Numcelemp
  },
  direccionEmpresa: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100 // Diremp
  },
  direccionPaseador: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100 // Dirpas
  },
  foto: {
    type: String,
    required: true // Imgpas (PNG/JPG)
  },
  tarifa: {
    type: Number,
    required: true // Tarifa por hora
  },
  calificacion: {
    type: Number,
    required: true,
    min: 1,
    max: 10, // Calpas
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Paseador', PaseadorSchema);

