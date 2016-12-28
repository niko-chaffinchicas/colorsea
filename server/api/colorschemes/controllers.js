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
  console.log(req.params.id);
  if (req.params.id) {
    ColorScheme.findOne({ _id: req.params.id })
    .then(function(colorscheme) {
      console.log(colorscheme.toJSON());
      return res.send(colorscheme.toJSON());
    })
    .catch(function(err) {
      return res.status(500).send(err.message);
    });
  }
};

controllers.update = function(req, res) {
  console.log(req.params.id);
  if (req.params.id) {
    // ColorScheme.findOne({ _id: req.params.id })
    // .then(function(colorscheme) {
    //   for (var prop in req.body) {
    //     if (prop !== "_id" && prop !== "_creator") {
    //       colorscheme[prop] = req.body[prop];
    //     }
    //   }
    //   colorscheme.markModified('colors');
    //   return colorscheme.save();
    // })
    console.log(req.body);
    ColorScheme.findOneAndUpdate({ _id: req.params.id }, { $set: { colors: req.body.colors } }, { new: true })
    .then(function(colorscheme) {
      console.log("colorscheme changed:", colorscheme);
      return res.send(colorscheme.toJSON());
    })
    .catch(function(err) {
      console.log("CATCHING ERROR");
      console.log(err);
      return res.status(500).send(err.message);
    });
  }
};

module.exports = controllers;
