const CFG = require('dotenv').config().parsed
const MYSQL = require('mysql2/promise')

const CONNECTION = MYSQL.createConnection({
  host: CFG.MYSQL_HOST,
  user: CFG.MYSQL_USER,
  password: CFG.MYSQL_PSSWD,
  database: CFG.MYSQL_DATABASE
})

module.exports = { CONNECTION }
