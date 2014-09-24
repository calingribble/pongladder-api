var express = require('express');
var bodyParser = require('body-parser');
var accounts = require('./routes/accounts');
var characters = require('./routes/characters');
var mongoose = require('mongoose');
var validator = require('mongoose-validator');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

var app = express();

var dbName='mongodb://admin:admin@kahana.mongohq.com:10074/sarpg-dev-db';

var connectionString=dbName;

mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(allowCrossDomain);

app.use('/api', accounts);
app.use('/api', characters);

module.exports = app;
