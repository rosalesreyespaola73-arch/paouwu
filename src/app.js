import express from 'express'
import cors from 'cors'
import clientesRouter from './routers/clientes.routers.js'

const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));

console.log('✅ Cargando middlewares y rutas...');

app.use(express.json());

// ✅ RUTA RAÍZ DEL SERVIDOR
app.get('/', (req, res) => {
    res.json({ status: "ok", message: "¡El backend está respondiendo perfectamente!" });
});

// ✅ RUTA RAÍZ API
app.get('/api', (req, res) => {
    res.json({ 
        message: 'API activa ✅',
        version: '1.0.0',
        endpoints: {
            clientes: '/api/clientes',
            login: '/api/login'
        }
    });
});

// Rutas
app.use('/api', clientesRouter)  

// Manejador 404
app.use((req, res, next) => {
    console.log(`⚠️ 404 en: ${req.method} ${req.url}`);
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app