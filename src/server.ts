import mysql from 'mysql'
import { ifError } from 'assert';


var connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password    :   '',
    database    :   'movie_database'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err,rows,fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

connection.end()