const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Bhumin@259',
    database: 'employee_details',
    multipleStatements: true
  }).promise()

module.exports = connection