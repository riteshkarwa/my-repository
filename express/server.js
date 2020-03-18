const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer')
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
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

var client = new faunadb.Client({ secret: process.env.FAUNADB_KEY });

// Data parsing
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

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


// Here we are configuring our SMTP Server details.
// STMP is mail server which is responsible for sending and recieving email.


var smtpTransport = nodemailer.createTransport("SMTP",{
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

app.post('/send', function(req, res){
  console.log("in mail controller");
  var mailOptions={
    from : req.body.name + " " + req.body.email + " ",
    to : "ssrfelter@gmail.com",
    subject : req.body.subject,
    text : req.body.text
  }
  console.log(mailOptions);
});

smtpTransport.sendMail(mailOptions, function(error, response){
  if(error){
    console.log(error);
  }else{
    console.log("Message sent: " + response.message);
  }
});

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