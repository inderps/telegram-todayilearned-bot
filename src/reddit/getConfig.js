import { IO, Maybe } from 'ramda-fantasy';
import localConfig from './../../reddit-config';

const hasAllConfigVars = config => (config.USER_AGENT && config.REDDIT_CLIENT_ID
  && config.REDDIT_CLIENT_SECRET && config.REDDIT_REFRESH_TOKEN);

const mapConfig = config => ({
  USER_AGENT: config.USER_AGENT,
  REDDIT_CLIENT_ID: config.REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET: config.REDDIT_CLIENT_SECRET,
  REDDIT_REFRESH_TOKEN: config.REDDIT_REFRESH_TOKEN,
  TELEGRAM_TOKEN: config.TELEGRAM_TOKEN,
});

const getConfig = IO(() => {
  const envConfig = process.env;
  if (hasAllConfigVars(envConfig)) {
    return Maybe(mapConfig(envConfig));
  }
  if (hasAllConfigVars(localConfig)) {
    return Maybe(mapConfig(localConfig));
  }
  return Maybe.Nothing();
});

export default getConfig;
