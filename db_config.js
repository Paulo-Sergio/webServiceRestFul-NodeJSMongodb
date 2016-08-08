var db_string = 'mongodb://localhost/screencast_resful';
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;

var User; //model

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));
db.once('open', function(){
  var userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    created_at: Date
  });

  exports.User = mongoose.model('User', userSchema); //expondo model para app.js
});
