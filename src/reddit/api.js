import { map, curry } from 'ramda';
import getConfig from './getConfig';
import snoowrap from 'snoowrap';

const createConnection = config => new snoowrap(config);

const getRedditConnection = map(map(createConnection), getConfig);

const createSubreddit = curry((name, connection) => connection.get_subreddit(name));

const getSubreddit = name => map(map(createSubreddit(name)), getRedditConnection);

export { getRedditConnection, getSubreddit };
