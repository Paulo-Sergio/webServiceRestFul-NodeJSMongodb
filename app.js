var app = require('./app_config.js');
var userController = require('./controller/userController.js');

var validator = require('validator');


app.get('/', function(req, res){
  res.end('Servidor ON!');
});

/*******************************************
********RETORNAR TODOS USERS****************
********************************************/
app.get('/users', function(req, res){
  userController.list(function(resp){
    //só quando o banco retornar a resposta é que a function de callback sera executado
    res.json(resp);
  });
});

/*******************************************
********RETORNAR USER FOR ID****************
********************************************/
app.get('/users/:id', function(req, res){
  var id = validator.trim(validator.escape(req.param('id'))); //pegando id que vem do parametro

  userController.user(id, function(resp){
    res.json(resp);
  });
});

/*******************************************
*************CREATE NEW USER****************
********************************************/
app.post('/users', function(req, res){
  var fullname = validator.trim(validator.escape(req.param('fullname')));
  var email = validator.trim(validator.escape(req.param('email')));
  var password = validator.trim(validator.escape(req.param('password')));

  userController.save(fullname, email, password, function(resp){
    res.json(resp);
  });
});

/*******************************************
*************UPDATE USER********************
********************************************/
app.put('/users', function(req, res){
  var id = validator.trim(validator.escape(req.param('id')));
  var fullname = validator.trim(validator.escape(req.param('fullname')));
  var email = validator.trim(validator.escape(req.param('email')));
  var password = validator.trim(validator.escape(req.param('password')));

  userController.update(id, fullname, email, password, function(resp){
    res.json(resp);
  })
});

/*******************************************
*************DELETE USER FOR ID*************
********************************************/
app.delete('/users/:id', function(req, res){
  var id = validator.trim(validator.escape(req.param('id')));

  userController.delete(id, function(resp){
    res.json(resp);
  });
});
