import { config } from 'dotenv';
config();

// Puerto de la API
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'clave_maestra_2026';

// Detectar y limpiar los datos de la URL de conexión
const urlConnection = process.env.DATABASE_URL || '';

export const DB_HOST = process.env.DB_HOST || (urlConnection.includes('@') ? urlConnection.split('@')[1].split(':')[0] : 'localhost');
export const DB_USER = process.env.DB_USER || (urlConnection.includes('//') ? urlConnection.split('//')[1].split(':')[0] : 'root');
export const DB_PASSWORD = process.env.DB_PASSWORD || (urlConnection.includes(':') ? urlConnection.split(':')[2]?.split('@')[0] : '');
export const DB_PORT = parseInt(process.env.DB_PORT) || (urlConnection.includes(':') ? parseInt(urlConnection.split(':')[3]?.split('/')[0]) : 3306);

export const DB_DATABASE = process.env.DB_DATABASE || (urlConnection && !urlConnection.includes('localhost') ? 'defaultdb' : 'base2026');

// ✅ Configuración de SSL (Indispensable para Aiven)
export const DB_SSL = (DB_HOST.includes('aivencloud.com') || process.env.DATABASE_URL?.includes('ssl-mode=REQUIRED')) ? { rejectUnauthorized: false } : null;