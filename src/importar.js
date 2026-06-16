import mysql from 'mysql2/promise';
import fs from 'fs';

const importar = async () => {
    console.log('📡 Conectando directamente a Aiven...');
    
    // Forzamos los datos reales de tu servidor en la nube
    const connectionConfig = {
        host: 'mysql-27a079a1-miappick-2026.a.aivencloud.com',
        user: 'avnadmin',
        password: '',
        database: 'defaultdb',
        port: 26394,
        ssl: {
            rejectUnauthorized: false
        },
        multipleStatements: true
    };

    console.log(`🔗 Destino forzado: ${connectionConfig.host}:${connectionConfig.port} / BD: ${connectionConfig.database}`);
    
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