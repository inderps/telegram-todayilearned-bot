import { IO, Maybe } from 'ramda-fantasy';
import localConfig from './../../reddit-config';

const hasAllConfigVars = config => (config.USER_AGENT && config.CLIENT_ID
  && config.CLIENT_SECRET && config.REFRESH_TOKEN);

const mapConfig = config => ({
  user_agent: config.USER_AGENT,
  client_id: config.CLIENT_ID,
  client_secret: config.CLIENT_SECRET,
  refresh_token: config.REFRESH_TOKEN,
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
