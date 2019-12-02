const mysql = require('mysql');


exports.handler = function (event, context, callback) {

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
    }
    console.log('Connected as thread id: ' + connection.threadId);
    });
    var results=[];
    //SQL Query > Select Data
    connection.query("SELECT * FROM num_of_likes", function(err, rows, fields) {
      if (err) {
        console.log(err);
      }
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



