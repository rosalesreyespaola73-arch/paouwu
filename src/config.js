import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargar .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('🔍 Configuración cargada:');

export const DB_HOST = process.env.MYSQL_HOST || 'localhost';
export const DB_DATABASE = process.env.MYSQL_DATABASE || 'railway';
export const DB_USER = process.env.MYSQL_USER || 'root';
export const DB_PASSWORD = process.env.MYSQL_PASSWORD || '';
export const DB_PORT = process.env.MYSQL_PORT || 3306;
export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET || 'clave_maestra_2026';