var mongoose = require('mongoose');
var ColorScheme = mongoose.model('ColorScheme');

var controllers = {};

controllers.index = function(req, res) {
  ColorScheme.find({}).then(function(userList) {
    // console.log(userList);
    return res.send(JSON.stringify(userList));
  });
}


// controllers.create = function(req, res) {
//   if (req.body) {
//     var user = new ColorScheme(req.body);
//     user.save()
//     .then(function(user) {
//       // console.log("user created:", user);
//       return res.send(user.toJSON());
//     })
//     .catch(function(err) {
//       return res.status(500).send(err.message);
//     });
//   }
// };

controllers.show = function(req, res) {
  if (req.params.id) {
    ColorScheme.findOne({ _id: req.params.id })
    .then(function(colorscheme) {
      // console.log(colorscheme.toJSON());
      return res.send(colorscheme.toJSON());
    })
    .catch(function(err) {
      return res.status(500).send(err.message);
    });
  }
};

controllers.update = function(req, res) {
  // console.log(req.params.id);
  if (req.params.id) {
    // console.log(req.body);
    ColorScheme.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { colors: req.body.colors }, $inc: { __v: 1 } },
      { new: true }
    )
    .then(function(colorscheme) {
      // console.log("colorscheme changed:", colorscheme);
      return res.send(colorscheme.toJSON());
    })
    .catch(function(err) {
      console.log(err);
      return res.status(500).send(err.message);
    });
  }
};

module.exports = controllers;
