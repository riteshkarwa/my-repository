const mysql = require('mysql');
const axios = require('axios');


if (typeof connection === 'undefined'){
  // Connect to mysql database
  var connection = mysql.createConnection({
      host : "remotemysql.com",
      user: "XQu1tDNQ0B",
      database: "XQu1tDNQ0B",
      password: "xNwMQh7jQ8"
      //port:"3306"
    });
}

exports.handler = function (event, context, callback) {

  // axios.get('/api/all_likes/', { proxy: { host: '127.0.0.1', port: 9000 } })
  // .then(function (response) {
  //   // handle success
  //   console.log(response.data);
  //   callback(null,{
  //     statusCode: 200,
  //     body: JSON.parse(response.data)
  //   });
  // }).catch(error =>{
  //   console.log(error);
  // });

    context.callbackWaitsForEmptyEventLoop =false;

    connection.connect(function(err) {
      if (err) {
        console.error('Error connecting: ' + err.stack);
      }
      console.log('Connected as thread id: ' + connection.threadId);
    });

    var results=[];
    //SQL Query > Select Data

    return new Promise((resolve, reject) => {
      const readTable = `SELECT * FROM num_of_likes`;
      connection.query(readTable, (err, results, fields) => {
        if (err) {
         reject(err);
        } else {
          resolve({statusCode: 200, body: {results}});
        }
      });
    });

    // connection.query("SELECT * FROM num_of_likes", function(err, rows, fields) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   for (var r in rows){
    //     console.log(rows[r]);
    //     results.push(rows[r]);
    //   } 
    //   callback(null, {
    //     statusCode: 200,
    //     body: JSON.parse(results),
    //   })
    // }); 
}



