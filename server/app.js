var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());

var dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1/colorsea-local';
console.log(dbUri);

mongoose.Promise = Promise;
var options = { promiseLibrary: Promise };
mongoose.connect(dbUri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("> database connection established");
  // load models
  var _models = require('./models/');

  var identityMiddleware = require('./middleware/identity');
  var auth = require('./middleware/auth');
  var apiHandlers = require('./api/');

  app.use(morgan('dev'));
  var sessionSecret = process.env.SESSION_SECRET || 'ijustlovecolorseasomuch';
  // Configure Passport
  require('./config/passport')(passport);
  app.use(session({ secret: sessionSecret, resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use('/$', identityMiddleware);
  app.use('/api', identityMiddleware, apiHandlers);

  // function logBody(req, res, next) {
  //   console.log(req.body);
  //   next();
  // }

  app.get('/signup', function(req, res) {
    res.send(req.flash('signupFlash') || "I'm the signup page");
  });
  app.get('/login', function(req, res) {
    res.send(req.flash('loginFlash') || "I'm the login page");
  });
  app.get('/profile', auth.isSignedIn, function(req, res) {
    res.send("I'm the profile page");
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  }));
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
  }));
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  })

  app.use(express.static(path.join(__dirname, "..")));
  // console.log(path.join(__dirname, ".."));
  app.listen(process.env.PORT || 5000);
  console.log("> hosting on localhost:5000...");
});
