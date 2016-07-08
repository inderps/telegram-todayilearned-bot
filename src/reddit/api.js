import { IO } from 'ramda-fantasy';
import { chain } from 'ramda';
import getConfig from './getConfig';
import snoowrap from 'snoowrap';

const createConnection = eitherConfig => IO(() =>
eitherConfig.map(config => (new snoowrap(config))));

export const getRedditConnection = chain(createConnection, getConfig);
