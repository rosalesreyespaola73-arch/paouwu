import mysql from 'mysql2/promise';

// CONEXIÓN DIRECTA A AIVEN
const db = await mysql.createConnection({
  host: 'mysql-27a079a1-miappick-2026.a.aivencloud.com',
  port: 26394,
  user: 'avnadmin',
  password: 'AVNS_wFJ5WbDNHlY-C-u1Sis',
  database: 'defaultdb',
  ssl: { rejectUnauthorized: false }
});

// LISTAR PRODUCTOS
export const getProductos = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM productos'
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// BUSCAR PRODUCTO POR ID
export const getProductoxid = async (req, res) => {
  try {

    const [rows] = await db.execute(
      'SELECT * FROM productos WHERE prod_id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// INSERTAR PRODUCTO
export const postProducto = async (req, res) => {

  const {
    prod_codigo,
    prod_nombre,
    prod_stock,
    prod_precio,
    prod_activo
  } = req.body;

  try {

    const prod_imagen = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const [existe] = await db.execute(
      'SELECT * FROM productos WHERE prod_codigo = ?',
      [prod_codigo]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: 'El código ya existe'
      });
    }

    const [result] = await db.execute(
      `INSERT INTO productos
      (
        prod_codigo,
        prod_nombre,
        prod_stock,
        prod_precio,
        prod_activo,
        prod_imagen
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        prod_codigo,
        prod_nombre,
        prod_stock,
        prod_precio,
        prod_activo,
        prod_imagen
      ]
    );

    res.status(201).json({
      prod_id: result.insertId,
      message: 'Producto creado'
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// ACTUALIZAR PRODUCTO
export const putProducto = async (req, res) => {

  const {
    prod_codigo,
    prod_nombre,
    prod_stock,
    prod_precio,
    prod_activo
  } = req.body;

  try {

    let prod_imagen = null;

    if (req.file) {

      prod_imagen = `/uploads/${req.file.filename}`;

    } else {

      const [producto] = await db.execute(
        'SELECT prod_imagen FROM productos WHERE prod_id = ?',
        [req.params.id]
      );

      if (producto.length > 0) {
        prod_imagen = producto[0].prod_imagen;
      }

    }

    await db.execute(
      `UPDATE productos SET
        prod_codigo = ?,
        prod_nombre = ?,
        prod_stock = ?,
        prod_precio = ?,
        prod_activo = ?,
        prod_imagen = ?
      WHERE prod_id = ?`,
      [
        prod_codigo,
        prod_nombre,
        prod_stock,
        prod_precio,
        prod_activo,
        prod_imagen,
        req.params.id
      ]
    );

    res.json({
      message: 'Producto actualizado'
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// ELIMINAR PRODUCTO
export const deleteProducto = async (req, res) => {

  try {

    await db.execute(
      'DELETE FROM productos WHERE prod_id = ?',
      [req.params.id]
    );

    res.json({
      message: 'Producto eliminado'
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};