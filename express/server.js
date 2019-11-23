
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



module.exports = app;
module.exports.handler = serverless(app);
