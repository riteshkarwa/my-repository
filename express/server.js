
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

module.exports = app;
module.exports.handler = serverless(app);
