import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// Usuario admin para pruebas
const USUARIOS = [
  {
    id: 1,
    usuario: 'admin',
    password: '12345.'
  }
];

export const login = async (req, res) => {
  const { usuario, password } = req.body;
  
  const user = USUARIOS.find(u => u.usuario === usuario);

  if (!user) {
    return res.status(401).json({ error: 'Usuario no existe' });
  }

  if (password !== user.password) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  const token = jwt.sign(
    { id: user.id, usuario: user.usuario },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, usuario: user.usuario });
};

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};