var mongoose = require('mongoose');
var User = mongoose.model('User');
var ColorScheme = mongoose.model('ColorScheme');
var randomHex = require('../utilities/randomHex');

function identityMiddleware(req, res, next) {
  if (!req.cookies.colorsea_identity) {
    console.log("New user");
    var user = new User();
    user.save().then(function(user) {
      var identity = {
        _id: user._id,
      };
      res.user = user;
      var scheme = new ColorScheme();
      scheme.colors = randomHex(4);
      scheme._creator = user._id;
      return scheme.save();
    })
    .then(function(scheme) {
      user.last = scheme._id;
      return user.save();
    })
    .then(function(user) {
      res.cookie('colorsea_identity', { _id: user._id, last: user.last }, { maxAge: 900000 });
      return User.populate(req.user, { path: 'last' })
      // console.log(user.toJSON());
    })
    .then(function(err, user) {
      res.user = user;
      return next();
    });
  } else {
    console.log("User exists");
    var _id = req.cookies.colorsea_identity._id;
    User.findOne({_id: _id}).populate('last').then(function(user) {
      // console.log(JSON.stringify(user.toJSON(), null, 2));
      res.user = user;
      return next();
    });
  }
}

module.exports = identityMiddleware;
