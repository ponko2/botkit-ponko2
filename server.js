'use strict';

const Path            = require('path');
const Botkit          = require('botkit');
const redisStorage    = require('botkit-storage-redis');
const ScriptLoader    = require('@ponko2/botkit-script-loader');
const HerokuKeepalive = require('@ponko2/botkit-heroku-keepalive');

if (!process.env.BOTKIT_SLACK_TOKEN) {
  // eslint-disable-next-line no-console
  console.error('Error: Specify token in environment');
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

const controller = Botkit.slackbot({
  debug: false,
  storage: redisStorage({url: process.env.REDISCLOUD_URL || 'redis://localhost:6379'})
});

let herokuKeepalive;

const saveBotIdentify = function (identify) {
  const {name, id: user_id, team_id} = identify;

  controller.findTeamById(team_id, (err, team) => {
    if (err) {
      throw new Error(err);
    }

    const bot = Object.assign({user_id, name}, team.bot || {});

    // eslint-disable-next-line no-shadow
    controller.saveTeam(Object.assign(team, {bot}), (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  });
};

controller.on('rtm_open', (bot) => {
  const loader   = new ScriptLoader(controller, bot);
  const scripts  = Path.resolve(__dirname, 'scripts');
  const commands = Path.resolve(__dirname, 'commands');

  loader.load(scripts);
  loader.load(commands);
  saveBotIdentify(bot.identifyBot());
  herokuKeepalive.start();
});

controller
  .setupWebserver(process.env.PORT || 8080, (err, webserver) => {
    herokuKeepalive = new HerokuKeepalive(controller);
    controller.createWebhookEndpoints(webserver);
  })
  .spawn({token: process.env.BOTKIT_SLACK_TOKEN})
  .startRTM((err) => {
    if (err) {
      throw new Error(err);
    }
  });
