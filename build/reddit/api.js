'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tilForToday = exports.getRedditConnection = undefined;

var _ramdaFantasy = require('ramda-fantasy');

var _ramda = require('ramda');

var _getConfig = require('./getConfig');

var _getConfig2 = _interopRequireDefault(_getConfig);

var _snoowrap = require('snoowrap');

var _snoowrap2 = _interopRequireDefault(_snoowrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createConnection = function createConnection(maybeConfig) {
  return _ramdaFantasy.IO.of((0, _ramda.chain)(function (config) {
    return (0, _ramdaFantasy.Maybe)(new _snoowrap2.default(config));
  }, maybeConfig));
};

var prepareTopPostsApi = function prepareTopPostsApi(maybeConnection) {
  return _ramdaFantasy.IO.of((0, _ramda.map)(function (connection) {
    return (0, _ramda.curry)(function (name, time) {
      return (0, _ramdaFantasy.Future)(function (reject, resolve) {
        connection.get_subreddit(name).get_top({ time: time }).then(resolve).then(reject);
      });
    });
  }, maybeConnection));
};

var getRedditConnection = (0, _ramda.chain)(createConnection, _getConfig2.default);

var allPosts = (0, _ramda.chain)(prepareTopPostsApi, getRedditConnection);

var tilPosts = (0, _ramda.map)((0, _ramda.map)(function (posts) {
  return posts('todayilearned');
}), allPosts);

var tilForToday = (0, _ramda.map)((0, _ramda.map)(function (posts) {
  return posts('day');
}), tilPosts);

// const showCurrenPost = map(map(posts => {
//   posts.fork(err => {
//     console.log(err);
//   }, data => {
//     console.log(data[0]);
//   });
// }), tilForToday);
// showCurrenPost.runIO();

exports.getRedditConnection = getRedditConnection;
exports.tilForToday = tilForToday;