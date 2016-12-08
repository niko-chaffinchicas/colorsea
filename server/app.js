var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, "..")));
console.log(path.join(__dirname, ".."));
app.listen(process.env.PORT || 5000);
console.log("hosting on localhost:5000...")
