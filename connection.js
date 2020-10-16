require('dotenv').config();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    port: process.env.DB_PORT,
    database: process.env.DB_DB
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log(`CONNECTED: ${connection.threadId}`);
});

module.exports = connection;