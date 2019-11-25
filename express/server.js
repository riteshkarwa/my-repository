
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// for local testing
var connection = mysql.createConnection({
  host : "remotemysql.com",
  user: "XQu1tDNQ0B",
  database: "XQu1tDNQ0B",
  password: "xNwMQh7jQ8"
  //port:"3306"
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as thread id: ' + connection.threadId);

});

// Query Database to get all likes
app.get('/api/all_likes', function(req, res) {
  var results=[];
  
  //SQL Query > Select Data
  connection.query("SELECT * FROM num_of_likes", function(err, rows, fields) {
    if (err) throw err;

    for (var r in rows){
      console.log(rows[r]);
      results.push(rows[r]);
    } 
    return res.json(rows);
  });
});

console.log(path.resolve(__dirname, '../public'));

app.use(express.static('./public'))
app.get('*', function(request, response, next) {
  //response.sendFile('index.html', {root: './public'});
  response.sendFile(path.resolve(__dirname, '../public')+'/index.html');
  next();
});


module.exports = app;
module.exports.handler = serverless(app);

