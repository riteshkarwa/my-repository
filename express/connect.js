// const mysql = require('mysql');

// if (typeof connection === 'undefined'){

//   //Connect to mysql database
//   var connection = mysql.createConnection({
//       host : "sql3.freemysqlhosting.net",
//       user: "sql3315408",
//       database: "sql3315408",
//       password: "zxLX9aF7ID",
//       //port:"3306"
//     });

//   connection.connect(function(err) {
//       if (err) {
//         console.error('Error connecting: ' + err.stack);
//       }
//       console.log('Connected as thread id: ' + connection.threadId);
//   });
// }

// exports.handler = function (event, context, callback) {
    
//     context.callbackWaitsForEmptyEventLoop =false;

//     var results=[];
//     //SQL Query > Select Data

//     // return new Promise((resolve, reject) => {
//     //   const readTable = `SELECT * FROM num_of_likes`;
//     //   connection.query(readTable, (err, results, fields) => {
//     //     if (err) {
//     //      reject(err);
//     //     } else {
//     //       resolve({statusCode: 200, body: {results}});
//     //     }
//     //   });
//     // });

//     connection.query("SELECT * FROM num_of_likes", function(err, rows, fields) {
//       if (err) {
//         console.log(err);
//       }
//       for (var r in rows){
//         console.log(rows[r]);
//         results.push(rows[r]);
//       } 
//       callback(null, {
//         statusCode: 200,
//         body: JSON.stringify(results)
//       })
//     }); 
    
// }


const mysql = require('mysql');
 
exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop =false;
  const connection = mysql.createConnection({
      host : "sql3.freemysqlhosting.net",
      connectTimeout: 600000,
      user: "ssruser",
      database: "ssrdatabase",
      password: "19august",
      port:"3306"
  });
 
  connection.connect();
  
  connection.query('SELECT * FROM num_of_likes', (error, results) => {
    if (error) {
      console.log('fail:');
      console.log(error);
      callback(error, null);
    } else {
      console.log('success:');
      console.log(results);
    }
  });
};



