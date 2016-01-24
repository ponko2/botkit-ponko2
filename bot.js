import Path            from 'path';
import Botkit          from 'botkit';
import redisStorage    from 'botkit-storage-redis';
import ScriptLoader    from '@ponko2/botkit-script-loader';
import HerokuKeepalive from '@ponko2/botkit-heroku-keepalive';

if (!process.env.BOTKIT_SLACK_TOKEN) {
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
