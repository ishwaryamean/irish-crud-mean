var mysql = require('mysql')

var connection = mysql.createConnection({
    database: 'books',
    user: 'root',
    password: '',
    host: 'localhost'
})

connection.connect((err, data) => {
    if (err) {
        throw err
    } else {
        console.log('Connected to database')
    }
})
module.exports = connection