var mongoose = require('mongoose');
var ColorScheme = mongoose.model('ColorScheme');

var controllers = {};

controllers.index = function(req, res) {
  ColorScheme.find({})
  .then(function(schemeList) {
    // console.log(schemeList);
    return res.json(schemeList);
  });
}


controllers.create = function(req, res) {
  if (req.body) {
    var scheme = new ColorScheme(req.body);
    scheme.save()
    .then(function(scheme) {
      // console.log("scheme created:", scheme);
      return res.json(scheme);
    })
    .catch(function(err) {
      return res.status(500).send(err.message);
    });
  }
};

controllers.show = function(req, res) {
  if (req.params.id) {
    ColorScheme.findOne({ _id: req.params.id })
    .then(function(colorscheme) {
      // console.log(colorscheme.toJSON());
      return res.json(colorscheme);
    })
    .catch(function(err) {
      return res.status(500).send(err.message);
    });
  }
};

controllers.update = function(req, res) {
  if (req.params.id) {
    // console.log(req.body);
    ColorScheme.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { colors: req.body.colors }, $inc: { __v: 1 } },
      { new: true }
    )
    .then(function(colorscheme) {
      // console.log("colorscheme changed:", colorscheme);
      return res.json(colorscheme);
    })
    .catch(function(err) {
      console.log(err);
      return res.status(500).send(err.message);
    });
  }
};

module.exports = controllers;
