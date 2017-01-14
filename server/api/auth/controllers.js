var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var controllers = {};

// Log the user in and then return the user as a JSON
function loginUser(req, res, user) {
  req.login(user, function(err) {
    if (err) {
      return res.status(500).json(err);
    } else {
      req.session.save(); // Save modifications
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header("Access-Control-Allow-Origin", "*");
      return res.json(user);
    }
  });
}

controllers.signup = function(req, res) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      return res.status(500).json({ success: false, message: err.toString() });
    } else {
      // Log the user in after signup
      return loginUser(req, res, user);
    }
  })(req, res);
}

controllers.login = function(req, res) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return res.status(500).json({ success: false, message: "Incorrect login." });
    } else {
      // Log the user in after signup
      return loginUser(req, res, user);
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
