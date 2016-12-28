var mongoose = require('mongoose');
var User = mongoose.model('User');

var controllers = {};

controllers.index = function(req, res) {
  User.find({}).then(function(userList) {
    // console.log(userList);
    return res.send(JSON.stringify(userList));
  });
}


controllers.create = function(req, res) {
  if (req.body) {
    var user = new User(req.body);
    user.save()
    .then(function(user) {
      // console.log("user created:", user);
      return res.send(user.toJSON());
    })
    .catch(function(err) {
      return res.status(500).send(err.message);
    });
  }
};

controllers.show = function(req, res) {
  if (req.params.id) {
    User.findOne({ _id: req.params.id })
    .then(function(user) {
      return res.send(user.toJSON());
    })
    .catch(function(err) {
      return res.status(500).send(err.message);
    });
  }
};

module.exports = controllers;
