var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({
  email: String,
  last: {
    type: ObjectId,
    ref: 'ColorScheme'
  }
});

module.exports = userSchema;
