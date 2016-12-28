var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var app = express();
app.use(cookieParser());

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

  app.use(bodyParser.json());

  var identityMiddleware = require('./middleware/identity');
  var apiHandlers = require('./api/');

  app.use('/$', identityMiddleware);
  app.use('/api', identityMiddleware, apiHandlers);

  app.use(express.static(path.join(__dirname, "..")));
  // console.log(path.join(__dirname, ".."));
  app.listen(process.env.PORT || 5000);
  console.log("> hosting on localhost:5000...");
});
