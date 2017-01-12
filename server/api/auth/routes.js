var express = require('express');
var passport = require('passport');

var routes = express.Router();
var controllers = require('./controllers');

routes.get('/', function(req, res) {
  return res.json({ success: req.isAuthenticated() });
});

routes.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/api/auth/signup',
  failureFlash: true,
}));

routes.post('/login', controllers.login);

routes.get('/current', controllers.current);
routes.get('/logout', controllers.logout);

module.exports = routes;
