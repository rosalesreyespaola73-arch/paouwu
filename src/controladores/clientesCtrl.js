import db from '../db.js';

export const getClientes = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM clientes');
        console.log(`📋 Enviando ${rows.length} clientes`);
        res.json(rows);
    } catch (error) {
        console.error('Error en getClientes:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getclientesxid = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM clientes WHERE cli_id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const postInsertarCliente = async (req, res) => {
    const { cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO clientes (cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad]
        );
        res.status(201).json({ cli_id: result.insertId, message: 'Cliente creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const putCliente = async (req, res) => {
    const { cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE clientes SET cli_identificacion=?, cli_nombre=?, cli_telefono=?, cli_correo=?, cli_direccion=?, cli_pais=?, cli_ciudad=? WHERE cli_id=?',
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const patchCliente = async (req, res) => {
    const { cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE clientes SET cli_identificacion=?, cli_nombre=?, cli_telefono=?, cli_correo=?, cli_direccion=?, cli_pais=?, cli_ciudad=? WHERE cli_id=?',
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM clientes WHERE cli_id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};