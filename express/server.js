
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const router = express.Router();
var faunadb = require('faunadb'),
  q = faunadb.query;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*Enable CORS*/
app.use(cors())
app.enable('trust proxy');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var client = new faunadb.Client({ secret: 'fnADnAs2ygACCgKqaUyLxaAMPWfR8O8KWEy3DPmB' });

// // for local testing
// var connection = mysql.createConnection({
//   host : "remotemysql.com",
//   user: "XQu1tDNQ0B",
//   database: "XQu1tDNQ0B",
//   password: "xNwMQh7jQ8"
//   //port:"3306"
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('Error connecting: ' + err.stack);
//     return;
//   }
//   console.log('Connected as thread id: ' + connection.threadId);

// });


// Query Database to get all likes
// app.get('/api/all_likes', function(req, res) {
//   // var results=[];
  
//   // //SQL Query > Select Data
//   // connection.query("SELECT * FROM num_of_likes", function(err, rows, fields) {
//   //   if (err) throw err;

//   //   for (var r in rows){
//   //     console.log(rows[r]);
//   //     results.push(rows[r]);
//   //   } 
//   //   return res.json(rows);
//   // });
// });

// axios.get('/api/all_likes/')
//   .then(function (response) {
//     // handle success
//     console.log(response.data);
//   }).catch(error =>{
//     console.log(error);
//   });


//Query Database to get all likes
app.get('/api/all_likes', function(req, res) {
  var results=[];
  client.query(q.Paginate(q.Match(q.Ref("indexes/all_num_of_likes")))).then((ret) => {
    const likesRefs = ret.data
    const getAllTodoDataQuery = likesRefs.map((ref) => {
      return q.Get(ref)
    })
    client.query(getAllTodoDataQuery).then((ret) => {
      for (var r in ret){
        results.push(ret[r]['data']);
      }
      return res.json(results)
    })
  })
})

app.use(express.static('./public'))

app.all('*', function(request, response, next) {
  //response.sendFile('index.html', {root: './public'});
  response.sendFile(path.resolve(__dirname, '../public')+'/index.html');
});

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);

/*
Secret Key
fnADnAs2ygACCgKqaUyLxaAMPWfR8O8KWEy3DPmB
*/