import { IO, Maybe } from 'ramda-fantasy';
import { map, chain } from 'ramda';
import getConfig from './../getConfig';
import Bot from 'node-telegram-bot-api';

const createBot = maybeConfig =>
  IO.of(chain((config) => Maybe(new Bot(config.TELEGRAM_TOKEN, { polling: true })), maybeConfig));

const sendRedditPostOnRequest = maybeBot => map(bot => {
  console.log(maybeBot);
  bot.onText(/^\/post/, (msg) => {
    const sender = msg.from.id;
    bot.sendMessage(sender, 'hahaha').then(() => {});
  });
  return bot;
}, maybeBot);

const giveInstructionsToBot = IO.of(sendRedditPostOnRequest);

const getBot = chain(createBot, getConfig);

const startBotServer = chain(giveInstructionsToBot, getBot);

console.log(startBotServer.runIO());

export default startBotServer;
