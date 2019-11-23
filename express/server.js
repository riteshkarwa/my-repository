
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use(express.static(__dirname + '/public'));
app.get('*', function(request, response) {
  //response.render('pages/index');
  response.sendFile(__dirname +'/public/index.html');
});
//app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
