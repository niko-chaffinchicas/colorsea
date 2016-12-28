var mongoose = require('mongoose');
var User = mongoose.model('User');

function identityMiddleware(req, res, next) {
  if (!req.cookies.colorsea_identity) {
    var user = new User();
    user.save();
    var identity = {
      _id: user._id,
    };
    res.cookie('colorsea_identity', JSON.stringify(identity), { maxAge: 900000 });
    res.user = user;
  }
  next();
}

module.exports = identityMiddleware;
