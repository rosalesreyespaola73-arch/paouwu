import { Router } from 'express';

import {
  getProductos,
  getProductoxid,
  postProducto,
  putProducto,
  deleteProducto
} from '../controladores/productosCtrl.js';

import { verificarToken } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = Router();

router.get('/productos', verificarToken, getProductos);

router.get('/productos/:id', verificarToken, getProductoxid);

router.post(
  '/productos',
  verificarToken,
  upload.single('prod_imagen'),
  postProducto
);

router.put(
  '/productos/:id',
  verificarToken,
  upload.single('prod_imagen'),
  putProducto
);

router.delete(
  '/productos/:id',
  verificarToken,
  deleteProducto
);

export default router;