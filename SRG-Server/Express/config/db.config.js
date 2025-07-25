const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if(err){
        console.error('Database connection is failed.' + err.stack);
        return;
    }
    console.log('Connected to the database');
})

module.exports = db;