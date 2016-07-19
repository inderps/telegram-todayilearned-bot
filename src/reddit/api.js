import { IO, Maybe, Future } from 'ramda-fantasy';
import { map, curry, chain } from 'ramda';
import getConfig from './../getConfig';
import snoowrap from 'snoowrap';

const createConnection = maybeConfig =>
  IO.of(chain((config) => Maybe(new snoowrap({
    user_agent: config.USER_AGENT,
    client_id: config.REDDIT_CLIENT_ID,
    client_secret: config.REDDIT_CLIENT_SECRET,
    refresh_token: config.REDDIT_REFRESH_TOKEN,
  })), maybeConfig));

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

const findByIndex = (index, list) => list[index].title;

const getRandomIndex = list => Math.floor(Math.random() * list.length) + 0;

const getRandomPost = posts => Future((reject, resolve) =>
resolve(findByIndex(getRandomIndex(posts), posts)));

const fetchRandomPost = map(map(posts => posts.chain(getRandomPost)), tilForToday);

export { getRedditConnection, fetchRandomPost };
