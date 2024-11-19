// backend/middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');

// // Middleware para verificar el token de autenticación
// const verificarToken = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) {
//     return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
//   }

//   try {
//     const verificado = jwt.verify(token, process.env.JWT_SECRET);
//     req.usuario = verificado;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Token no válido.' });
//   }
// };

// module.exports = { verificarToken };
