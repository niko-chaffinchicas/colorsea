function randomHex(num) {
  var output = [];
  for (var i = 0; i < num; i++) {
    var rgb = [];
    for (var j = 0; j < 3; j++) {
      var v = Math.floor((Math.random() * 255));
      rgb.push(v);
    }
    rgb = rgb.reduce(function(a, b) {
      _b = b.toString('16');
      if (_b.length == 1) {
        _b = "0" + _b;
      }
      return a + _b;
    }, "");
    output.push({ hex: rgb });
  }
  return output;
}

module.exports = randomHex;
