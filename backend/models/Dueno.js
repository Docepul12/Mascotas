// models/Dueno.js
const mongoose = require('mongoose');

const DuenoSchema = new mongoose.Schema({
  nombreDueno: {
    type: String,
    required: true,
    maxlength: 100
  },
  telefonoDueno: {
    type: Number,
    required: true
  },
  direccionDueno: {
    type: String,
    required: true,
    maxlength: 50
  },
  correoDueno: {
    type: String,
    required: true,
    maxlength: 50
  },
  fotoDueno: {
    type: String,
    required: true
  },
  mascotas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Dueno', DuenoSchema);
