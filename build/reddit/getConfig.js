'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramdaFantasy = require('ramda-fantasy');

var _redditConfig = require('./../../reddit-config');

var _redditConfig2 = _interopRequireDefault(_redditConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasAllConfigVars = function hasAllConfigVars(config) {
  return config.USER_AGENT && config.CLIENT_ID && config.CLIENT_SECRET && config.REFRESH_TOKEN;
};

var mapConfig = function mapConfig(config) {
  return {
    user_agent: config.USER_AGENT,
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    refresh_token: config.REFRESH_TOKEN
  };
};

var getConfig = (0, _ramdaFantasy.IO)(function () {
  var envConfig = process.env;
  if (hasAllConfigVars(envConfig)) {
    return (0, _ramdaFantasy.Maybe)(mapConfig(envConfig));
  }
  if (hasAllConfigVars(_redditConfig2.default)) {
    return (0, _ramdaFantasy.Maybe)(mapConfig(_redditConfig2.default));
  }
  return _ramdaFantasy.Maybe.Nothing();
});

exports.default = getConfig;