'use strict';

const Path            = require('path');
const Botkit          = require('botkit');
const redisStorage    = require('botkit-storage-redis');
const ScriptLoader    = require('@ponko2/botkit-script-loader');
const HerokuKeepalive = require('@ponko2/botkit-heroku-keepalive');

if (!process.env.BOTKIT_SLACK_TOKEN) {
  // eslint-disable-next-line no-console
  console.error('Error: Specify token in environment');
  process.exit(1);
}

const controller = Botkit.slackbot({
  debug: false,
  storage: redisStorage({
    url: process.env.REDISCLOUD_URL || 'redis://localhost:6379'
  })
});

let herokuKeepalive;

controller.setupWebserver(process.env.PORT || 8080, (err, webserver) => {
  herokuKeepalive = new HerokuKeepalive(controller);
  controller.createWebhookEndpoints(webserver);
});

controller.spawn({
  token: process.env.BOTKIT_SLACK_TOKEN
}).startRTM((err, bot) => {
  if (err) {
    throw new Error(err);
  }

  const loader   = new ScriptLoader(controller, bot);
  const scripts  = Path.resolve(__dirname, 'scripts');
  const commands = Path.resolve(__dirname, 'commands');

  loader.load(scripts);
  loader.load(commands);
  herokuKeepalive.start();
});
