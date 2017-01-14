var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var routes = express.Router();
var authRoutes = require('./auth/routes');
var userRoutes = require('./users/routes');
var colorSchemeRoutes = require('./colorschemes/routes');

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/color-schemes', colorSchemeRoutes);

module.exports = routes;
