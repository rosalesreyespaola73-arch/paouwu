import { Router } from 'express'
import { getClientes, getclientesxid, postInsertarCliente, putCliente, patchCliente, deleteCliente } from '../controladores/clientesCtrl.js'
import { verificarToken } from '../middlewares/auth.js'
import { login } from '../controladores/authCtrl.js'

const router = Router()

// RUTA DE LOGIN (NO requiere token)
router.post('/login', login)

// RUTAS PROTEGIDAS (requieren token)
router.get('/clientes', verificarToken, getClientes)
router.get('/clientes/:id', verificarToken, getclientesxid)
router.post('/clientes', verificarToken, postInsertarCliente)
router.put('/clientes/:id', verificarToken, putCliente)
router.patch('/clientes/:id', verificarToken, patchCliente)
router.delete('/clientes/:id', verificarToken, deleteCliente)

export default router