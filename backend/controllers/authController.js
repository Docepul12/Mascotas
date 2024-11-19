// const jwt = require('jsonwebtoken');
// const Dueño = require('../models/Paseador'); // Modelo de usuario (Dueño)

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Buscar usuario por correo electrónico
//     const user = await Dueño.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }

//     // Verificar contraseña sin encriptación
//     if (user.password !== password) {
//       return res.status(400).json({ message: 'Contraseña incorrecta' });
//     }

//     // Crear token JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Enviar respuesta con token y datos básicos del usuario
//     res.json({ 
//       token, 
//       user: { 
//         id: user._id, 
//         email: user.email 
//       } 
//     });
//   } catch (error) {
//     console.error(error); // Log para ver el error en la consola
//     res.status(500).json({ message: 'Error en el servidor' });
//   }
// };

