import mysql from 'mysql2/promise';
import fs from 'fs';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, DB_SSL } from './config.js';

const importar = async () => {
    console.log('📡 Conectando a la base de datos...');
    
    // Usamos la configuración centralizada de config.js
    const connectionConfig = {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        port: DB_PORT,
        ssl: DB_SSL,
        multipleStatements: true
    };

    // Leer el archivo SQL
    const sql = fs.readFileSync('C:/Users/PAOLA/Downloads/base2026.sql', 'utf8');
    console.log('📄 Archivo SQL leído, tamaño:', sql.length, 'bytes');
    
    // Conectar a la base de datos remota
    const connection = await mysql.createConnection(connectionConfig);
    console.log('✅ ¡Conectado exitosamente a Aiven!');
    
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
    
    console.log('🎉 ¡Importación completada con éxito!');
    
    // Verificar tablas creadas
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 Tablas actuales en Aiven:', tables);
    
    await connection.end();
};

importar().catch(console.error);