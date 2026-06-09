const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mbg_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('Database MySQL Berhasil Terhubung!');
        connection.release();
    })
    .catch(err => {
        console.error('Gagal menghubungkan ke Database MySQL:', err.message);
    });

module.exports = pool;