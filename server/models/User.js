var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  last: {
    type: ObjectId,
    ref: 'ColorScheme'
  }
});

// Generate password hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
}

// Check if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = userSchema;
