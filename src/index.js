import './config.js';
import app from './app.js';
import { PORT } from './config.js';

console.log('🚀 Iniciando servidor...');

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});