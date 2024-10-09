const mysql = require('mysql2')

const DB_CONNECTION = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  database: 'gamingcenter',
})

DB_CONNECTION.connect((err) => {
  if(err){
    console.error('Error al conectar a la base de datos: ', err)
    return
  }
  console.log('Conectado a la base de datos')
})

module.exports = 
DB_CONNECTION.promise()
