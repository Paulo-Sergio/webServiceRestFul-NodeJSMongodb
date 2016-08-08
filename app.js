var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db_string = 'mongodb://localhost/screencast_resful';
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;

var User; //modeel

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));
db.once('open', function(){
  var userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    created_at: Date
  });

  User = mongoose.model('User', userSchema);
});

app.listen(5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extends: true
}));

app.get('/', function(req, res){
  new User({
    fullname: 'Teste teste',
    email: 'teste@hotmail.com',
    password: 123456,
    email: new Date()
  }).save(function(error, user){
    if(error){
      res.json({error: 'Não foi possivel salvar usuario'});
    }else{
      res.json(user);
    }
  });
  //res.end('Servidor ON!');
});
app.get('/users', function(req, res){
  res.json([
    {name: 'paulo'},
    {name: 'iza'},
    {name: 'mimi'}
  ]);
});
app.get('/users/:id', function(req, res){

});
app.post('/users', function(req, res){
  res.end('post users');
});
app.put('/users', function(req, res){
  res.end('put users');
});
app.delete('/users/:id', function(req, res){
  res.end('delete users');
});
