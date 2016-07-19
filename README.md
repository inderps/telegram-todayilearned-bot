# telegram-todayilearned-bot

[![Build Status](https://travis-ci.org/inderps/telegram-todayilearned-bot.svg?branch=master)](https://travis-ci.org/vit-/telegram-uz-bot)

A nodejs based telegram bot which shows r/TIL random post. It is written with functional paradigm using ramdajs

### Setup on Local Machine
* You need to have Reddit API OAuth credentials to work on this app. For more information on how to get valid credentials, see [here](https://github.com/not-an-aardvark/reddit-oauth-helper).
* After getting the credentials, Put those credential details in [reddit-config.js](https://github.com/inderps/telegram-todayilearned-bot/blob/master/reddit-config.js) file
* Run `npm install`
* Run `npm run dev`
* Go to `localhost:3000` to see the app

### Test
* Run `npm run test`

### Interaction With Bot
* Say `/post` to get a random TIL post for today

### Want to contribute?

PRs are most welcome
