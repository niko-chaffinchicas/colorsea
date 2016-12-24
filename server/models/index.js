var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

var models = {};
var files = fs.readdirSync(__dirname);
files.forEach(function(file) {
  var name = file.replace('.js', '');
  if (name !== "index") {
    var schema = require(path.join(__dirname, name));
    console.log("> registered \"" + name + "\" model");
    models[name] = mongoose.model(name, schema);
    // console.log(mongoose);
  }
});

module.exports = models;
