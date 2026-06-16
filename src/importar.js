// importar.js
import mysql from 'mysql2/promise';
import fs from 'fs';
import { DATABASE_URL } from './config.js';

const importar = async () => {
    console.log('📡 Conectando a Aiven...');
    console.log('🔗 URL:', DATABASE_URL);
    
    // Leer el archivo SQL
    const sql = fs.readFileSync('C:/Users/PAOLA/Downloads/base2026.sql', 'utf8');
    console.log('📄 Archivo SQL leído, tamaño:', sql.length, 'bytes');
    
    // Conectar sin especificar base de datos
    const connection = await mysql.createConnection(DATABASE_URL);
    console.log('✅ Conectado a Aiven');
    
    // Dividir las sentencias SQL por punto y coma
    const statements = sql.split(';');
    
    for (let stmt of statements) {
        stmt = stmt.trim();
        if (stmt && !stmt.startsWith('--') && !stmt.startsWith('/*')) {
            try {
                await connection.execute(stmt);
                console.log('✅ Ejecutado:', stmt.substring(0, 50) + '...');
            } catch (err) {
                console.log('⚠️ Error en:', stmt.substring(0, 50));
                console.log('   ', err.message);
            }
        }
    }
    
    console.log('🎉 Importación completada');
    
    // Verificar tablas
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 Tablas en Aiven:', tables);
    
    await connection.end();
};

importar().catch(console.error);