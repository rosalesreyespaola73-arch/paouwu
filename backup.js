import mysql from 'mysql2/promise';
import fs from 'fs';

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'mysql-27a079a1-miappick-2026.a.aivencloud.com',
      port: 26394,
      user: 'avnadmin',
      password: 'AVNS_wFJ5WbDNHlY-C-u1Sis',
      database: 'defaultdb',
      ssl: { rejectUnauthorized: false }
    });
    
    const [tables] = await conn.query('SHOW TABLES');
    console.log('✅ Conexión OK. Tablas:', tables.length);
    
    const [rows] = await conn.query('SELECT * FROM clientes');
    fs.writeFileSync('backup_bd.json', JSON.stringify(rows, null, 2));
    
    console.log('✅ Backup guardado: backup_bd.json');
    console.log('Total registros:', rows.length);
    
    await conn.end();
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();