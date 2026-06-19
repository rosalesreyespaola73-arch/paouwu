import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import clientesRouter from './routers/clientes.routers.js';
import productosRouter from './routers/productos.routers.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsPath = path.resolve(__dirname, './uploads');

app.use('/uploads', express.static(uploadsPath));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Backend funcionando'
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: 'API activa',
        endpoints: {
            login: '/api/login',
            clientes: '/api/clientes',
            productos: '/api/productos'
        }
    });
});

app.use('/api', clientesRouter);
app.use('/api', productosRouter);

app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

export default app;