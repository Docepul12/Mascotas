// // backend/controllers/mascotasController.js

// const Mascota = require('../models/Mascota');

// // Crear una mascota
// const crearMascota = async (req, res) => {
//   try {
//     const nuevaMascota = new Mascota(req.body);
//     const mascotaGuardada = await nuevaMascota.save();
//     res.status(201).json(mascotaGuardada);
//   } catch (error) {
//     res.status(500).json({ message: 'Error al crear la mascota', error });
//   }
// };

// // Obtener todas las mascotas
// const obtenerMascotas = async (req, res) => {
//   try {
//     const mascotas = await Mascota.find();
//     res.status(200).json(mascotas);
//   } catch (error) {
//     res.status(500).json({ message: 'Error al obtener las mascotas', error });
//   }
// };

// // Modificar una mascota por ID
// const modificarMascota = async (req, res) => {
//   try {
//     const mascotaActualizada = await Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!mascotaActualizada) {
//       return res.status(404).json({ message: 'Mascota no encontrada' });
//     }
//     res.status(200).json(mascotaActualizada);
//   } catch (error) {
//     res.status(500).json({ message: 'Error al modificar la mascota', error });
//   }
// };

// // Eliminar una mascota por ID
// const eliminarMascota = async (req, res) => {
//   try {
//     const mascotaEliminada = await Mascota.findByIdAndDelete(req.params.id);
//     if (!mascotaEliminada) {
//       return res.status(404).json({ message: 'Mascota no encontrada' });
//     }
//     res.status(200).json({ message: 'Mascota eliminada con éxito' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al eliminar la mascota', error });
//   }
// };

// module.exports = {
//   crearMascota,
//   obtenerMascotas,
//   modificarMascota,
//   eliminarMascota,
// };
