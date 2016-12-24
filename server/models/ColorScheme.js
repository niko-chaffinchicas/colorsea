var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var colorSchemeSchema = mongoose.Schema({
  colors: [{ hex: String }],
  _creator: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = colorSchemeSchema;
