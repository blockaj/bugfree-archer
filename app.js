/*


name: Bugfree Archer
description: A pretty sophisticated server using
version: 0.0.0
author: Aaron Block


*/


var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/user'),
    Message = require('./models/message'),
    nunjucks = require('nunjucks'),
    routes = require('./router'),
    ioHandler = require('./controllers/ioHandler'),
    USERNAME,
    USER_REG = false;
    
//Connect to a specific db
mongoose.connect('mongodb://localhost/SpecialChat');

//Express setup
app.use(express.static('public'));

var cookieParser = require('cookie-parser');
app.use(cookieParser('dont tell nobody my secret'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var session = require('express-session');
app.use(session({secret: 'dont tell nobody my secret',
                resave: true,
                saveUninitialized: true
                }));

app.use(passport.initialize());
app.use(passport.session());

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

//Passport setup
passport.serializeUser(function(user, done){
  return done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
      done(err, user);
  });
});
passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({username: username}, function(err, user){
        if (err) { return done(err); }
        if (!user) { return done(null, false, {message: 'Incorrect username'}); }
        user.comparePassword(password, function(err, isMatch){
            if(err) return done(err);
            if(isMatch) {
                return done(null, user);
            } else {
            }
        });
      });
    }
));

routes(app, USER_REG);



if (process.argv[2] == 'reset'){
  console.log(mongoose.conneciton);

  var adminUser = new User({username: 'admin', password: 'password'});
  adminUser.save(function (err) {
    console.log(adminUser);
    console.log("New user 'admin' created.");
  });
  if (adminUser){
    console.log(adminUser);
    process.exit();
  }
}



console.log('Server ON. http://127.0.0.1:3000');
