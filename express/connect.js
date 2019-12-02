const mysql = require('mysql');
let  conn = null;

var connection = mysql.createConnection({
    host : "remotemysql.com",
    user: "XQu1tDNQ0B",
    database: "XQu1tDNQ0B",
    password: "xNwMQh7jQ8"
    //port:"3306"
  });



conn = connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
  }
  console.log('Connected as thread id: ' + connection.threadId);
});

exports.handler = function (event, context, callback) {
  
  if (conn){
    var results=[];
    //SQL Query > Select Data
    conn.query("SELECT * FROM num_of_likes", function(err, rows, fields) {
      if (err) throw err;

      for (var r in rows){
        console.log(rows[r]);
        results.push(rows[r]);
      } 
      return{
        statusCode: 200,
        body: JSON.stringify(results)
      }
    });

  }
}

