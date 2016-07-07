'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _package = require('./../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/', function (req, res) {
  res.json({ version: _package2.default.version });
});

app.listen(process.env.PORT, function () {
  console.log('Web server started at http://%s:%s');
});