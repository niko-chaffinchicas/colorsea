var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var routes = express.Router();
var userRoutes = require('./users/routes');
var colorSchemeRoutes = require('./colorschemes/routes');

routes.use('/users', userRoutes);
routes.use('/colorschemes', colorSchemeRoutes);

module.exports = routes;
