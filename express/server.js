
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.enable('trust proxy');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.static(__dirname + '/public'))
app.use('/.netlify/functions/server', router);  // path must route to lambda

app.use('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

module.exports = app;
module.exports.handler = serverless(app);
