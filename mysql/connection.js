var express = require('express');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rahul',
  database: 'sampleDB'
});

connection.connect(function(error) {
  if(!!error) {
    console.log('Error');
  } else {
    console.log('Connected Successfully!! at port 3010.');
  }
});

// app.get('/', function(req, resp) {
//   connection.query("SELECT * FROM registration", function(error, rows, fields) {
//     if(!!error) {
//       console.log('Error in the query');
//     } else {
//       console.log('Sucess!!\n');
//       console.log(rows);
//       resp.send('Hello ' + rows[0].usernamesignup);
//     }
//   });
// })

//app.listen(3010);
module.exports.connection = connection;
