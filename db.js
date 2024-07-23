const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '103679',
    database: 'vistos',
    porta:'3306'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

module.exports = db;
