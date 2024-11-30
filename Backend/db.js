
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3309',
    user: 'root',
    password: 'pass', 
    database: 'electricFinder' 
});

module.exports = connection;