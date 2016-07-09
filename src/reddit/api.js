import { IO, Maybe, Future } from 'ramda-fantasy';
import { map, curry, chain } from 'ramda';
import getConfig from './getConfig';
import snoowrap from 'snoowrap';

const createConnection = maybeConfig =>
  IO.of(chain((config) => Maybe(new snoowrap(config)), maybeConfig));

const prepareTopPostsApi = maybeConnection =>
  IO.of(map(connection => curry((name, time) => Future((reject, resolve) => {
    connection.get_subreddit(name).get_top({ time })
    .then(resolve)
    .then(reject);
  })),
  maybeConnection));

const getRedditConnection = chain(createConnection, getConfig);

const allPosts = chain(prepareTopPostsApi, getRedditConnection);

const tilPosts = map(map(posts => posts('todayilearned')), allPosts);

const tilForToday = map(map(posts => posts('day')), tilPosts);

// const showCurrenPost = map(map(posts => {
//   posts.fork(err => {
//     console.log(err);
//   }, data => {
//     console.log(data[0]);
//   });
// }), tilForToday);
// showCurrenPost.runIO();

export { getRedditConnection, tilForToday };
