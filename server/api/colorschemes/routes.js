var express = require('express');

var routes = express.Router();
var controllers = require('./controllers');

routes.get('/', controllers.index);
routes.get('/:id', controllers.show);

module.exports = routes;
