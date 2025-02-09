const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'prithi123',
    database: 'SRG'
});

db.connect((err) => {
    if(err){
        console.error('Database connection is failed.' + err.stack);
        return;
    }
    console.log('Connected to the database');
})

module.exports = db;