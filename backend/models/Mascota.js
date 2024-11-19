// // backend/models/Mascota.js

// const mongoose = require('mongoose');

// const MascotaSchema = new mongoose.Schema({
//   nombre: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   raza: {
//     type: String,
//     trim: true
//   },
//   edad: {
//     type: Number,
//     required: true
//   },
//   genero: {
//     type: String,
//     required: true,
//     enum: ['macho', 'hembra']
//   },
//   recomendacionesEspeciales: {
//     type: String,
//     trim: true
//   },
//   dueño: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Dueño',
//     required: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Mascota', MascotaSchema);
