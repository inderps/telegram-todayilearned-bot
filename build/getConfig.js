'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramdaFantasy = require('ramda-fantasy');

var _redditConfig = require('./../reddit-config');

var _redditConfig2 = _interopRequireDefault(_redditConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasAllConfigVars = function hasAllConfigVars(config) {
  return config.USER_AGENT && config.REDDIT_CLIENT_ID && config.REDDIT_CLIENT_SECRET && config.REDDIT_REFRESH_TOKEN && config.TELEGRAM_TOKEN;
};

var mapConfig = function mapConfig(config) {
  return {
    USER_AGENT: config.USER_AGENT,
    REDDIT_CLIENT_ID: config.REDDIT_CLIENT_ID,
    REDDIT_CLIENT_SECRET: config.REDDIT_CLIENT_SECRET,
    REDDIT_REFRESH_TOKEN: config.REDDIT_REFRESH_TOKEN,
    TELEGRAM_TOKEN: config.TELEGRAM_TOKEN
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