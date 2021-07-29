const mysql = require('mysql2')
const HOST = process.env.HOST
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE

var connection = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

module.exports = connection;