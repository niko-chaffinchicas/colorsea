var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var controllers = {};

controllers.login = function(req, res) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return res.status(500).json({ success: false, message: "Incorrect login." });
    } else {
      req.login(user, function(err) {
        if (err) {
          return res.status(500).json(err);
        } else {
          req.session.save(); // This saves the modifications
          res.header('Access-Control-Allow-Credentials', 'true');
          res.header("Access-Control-Allow-Origin", "*");
          return res.json(user);
        }
      });
    }
  })(req, res);
}

controllers.current = function(req, res) {
  if (req.user) {
    User.findOne({_id: req.user._id}).populate('last')
    .then(function(user) {
      return res.json(user);
    })
    .catch(function(err) {
      return res.json({});
    })
  } else {
    return res.json({});
  }
}

controllers.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
}

module.exports = controllers;
