const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    maxlength: 100,
    required: true // Campo obligatorio según requerimientos
  },
  raza: {
    type: String,
    trim: true,
    maxlength: 50,
    required: true // Campo obligatorio según requerimientos
  },
  edad: {
    type: Number,
    // required: true // Campo obligatorio según requerimientos
  },
  genero: {
    type: Number, // 1 para macho, 2 para hembra
    enum: [1, 2],
    required: true // Campo obligatorio según requerimientos
  },
  recomendacionesEspeciales: {
    type: String,
    trim: true,
    maxlength: 250,
    // required: true // Campo obligatorio según requerimientos
  },
  foto: {
    type: String, // URL o referencia a la ubicación de la imagen
    required: true // Almacenamiento de documentos/imágenes requerido
  },
  dueno: {
    type: mongoose.Schema.Types.ObjectId, // Referencia al modelo Dueno
    ref: 'Dueno',
    required: true // Campo obligatorio para referenciar al dueño de la mascota
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mascota', MascotaSchema);
