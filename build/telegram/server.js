'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramdaFantasy = require('ramda-fantasy');

var _ramda = require('ramda');

var _getConfig = require('./../getConfig');

var _getConfig2 = _interopRequireDefault(_getConfig);

var _nodeTelegramBotApi = require('node-telegram-bot-api');

var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

var _api = require('./../reddit/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createBot = function createBot(maybeConfig) {
  return _ramdaFantasy.IO.of((0, _ramda.chain)(function (config) {
    return (0, _ramdaFantasy.Maybe)(new _nodeTelegramBotApi2.default(config.TELEGRAM_TOKEN, { polling: true }));
  }, maybeConfig));
};

var sendRedditPostOnRequest = function sendRedditPostOnRequest(maybeBot) {
  return (0, _ramda.map)(function (bot) {
    bot.onText(/^\/post/, function (msg) {
      var sender = msg.from.id;
      (0, _ramda.map)((0, _ramda.map)(function (postFuture) {
        postFuture.fork(function () {}, function (post) {
          bot.sendMessage(sender, post).then(function () {});
        });
      }), _api.fetchRandomPost).runIO();
    });
    return bot;
  }, maybeBot);
};

var getBot = (0, _ramda.chain)(createBot, _getConfig2.default);

var startBotServer = (0, _ramda.map)(sendRedditPostOnRequest, getBot);

exports.default = startBotServer;