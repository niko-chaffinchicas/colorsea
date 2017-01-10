var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var routes = express.Router();
var userRoutes = require('./users/routes');
var colorSchemeRoutes = require('./colorschemes/routes');

routes.use('/auth', function(req, res) {
  return res.json({ success: req.isAuthenticated() });
});
routes.use('/users', userRoutes);
routes.use('/colorschemes', colorSchemeRoutes);

module.exports = routes;
