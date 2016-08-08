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
  extended: true
}));

app.get('/', function(req, res){
  res.end('Servidor ON!');
});

/*******************************************
********RETORNAR TODOS USERS****************
********************************************/
app.get('/users', function(req, res){
  User.find({}, function(error, users){
    if(error){
      res.json({error: 'Não foi possivel retornar os usuarios'});
    }else{
      res.json(users);
    }
  });
});

/*******************************************
********RETORNAR USER FOR ID****************
********************************************/
app.get('/users/:id', function(req, res){
  var id = req.param('id'); //pegando id que vem do parametro

  User.findById(id, function(error, user){
    if(error){
      res.json({error: 'Não foi possivel retornar o usuario'});
    }else{
      res.json(user);
    }
  });
});

/*******************************************
*************CREATE NEW USER****************
********************************************/
app.post('/users', function(req, res){
  var fullname = req.param('fullname');
  var email = req.param('email');
  var password = req.param('password');

  new User({
    'fullname': fullname,
    'email': email,
    'password': password,
    'created_at': new Date()
  }).save(function(error, user){
    if(error){
      res.json({error: 'Não foi possivel salvar o usuario!'})
    }else{
      res.json(user);
    }
  });
});

/*******************************************
*************UPDATE USER********************
********************************************/
app.put('/users', function(req, res){
  var id = req.param('id');
  var fullname = req.param('fullname');
  var email = req.param('email');
  var password = req.param('password');

  User.findById(id, function(error, user){
    if(fullname){
      user.fullname = fullname;
    }
    if(email){
      user.email = email;
    }
    if(password){
      user.password = password;
    }

    user.save(function(error, user){
      if(error){
        res.json({error: 'Não foi possivel atualizar usuario'});
      }else{
        res.json(user);
      }
    });
  });
});

/*******************************************
*************DELETE USER FOR ID*************
********************************************/
app.delete('/users/:id', function(req, res){
  var id = req.param('id');

  User.findById(id, function(error, user){
    if(error){
      res.json({error: 'Não foi possivel excluir usuario'});
    }else{
      user.remove(function(error){
        if(!error){
          res.json({response: 'Usuario excluido com sucesso'});
        }
      });
    }
  });
});
