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
      return {
        statusCode: 400,
        body: JSON.stringify(err)
      }
    }
    console.log('Connected as thread id: ' + connection.threadId);
    return {
          statusCode: 200,
          body: JSON.stringify(err)
        }

  });
}
