import { IO, Maybe } from 'ramda-fantasy';
import { map, chain } from 'ramda';
import getConfig from './../getConfig';
import Bot from 'node-telegram-bot-api';
import { fetchRandomPost } from './../reddit/api';

const createBot = maybeConfig =>
  IO.of(chain((config) => Maybe(new Bot(config.TELEGRAM_TOKEN, { polling: true })), maybeConfig));

const sendRedditPostOnRequest = maybeBot => map(bot => {
  bot.onText(/^\/post/, (msg) => {
    const sender = msg.from.id;
    map(map(postFuture => {
      postFuture.fork(() => {}, post => {
        bot.sendMessage(sender, post).then(() => {});
      });
    }), fetchRandomPost).runIO();
  });
  return bot;
}, maybeBot);

const getBot = chain(createBot, getConfig);

const startBotServer = map(sendRedditPostOnRequest, getBot);

export default startBotServer;
