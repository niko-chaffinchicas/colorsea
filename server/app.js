var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var mongoose = require('mongoose');
var apiHandlers = require('./api/');
var app = express();
app.use(cookieParser());

var dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1/colorsea-local';
console.log(dbUri);
mongoose.connect(dbUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("> database connection established");
  var _models = require('./models/');

  var identityMiddleware = require('./middleware/identity');

  app.use('/$', identityMiddleware);
  app.use('/api', identityMiddleware, apiHandlers);

  app.use(express.static(path.join(__dirname, "..")));
  // console.log(path.join(__dirname, ".."));
  app.listen(process.env.PORT || 5000);
  console.log("> hosting on localhost:5000...");
});
