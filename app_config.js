var express = require('express');
var app = module.exports = express(); //expondo essa variavel app para app.js
var bodyParser = require('body-parser');

//sera executado antes de cada resposta a ser enviada
var allowCors = function(req, res, next){
  res.header('Access-Control-Allow-Origin', '127.0.0.1:5000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');

  next(); //continuar com processamento
}

app.listen(5000);

app.use(allowCors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
