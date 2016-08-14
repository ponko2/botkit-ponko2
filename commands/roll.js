'use strict';

const Dice = require('node-dice-js');

module.exports = (controller) => {
  controller.on('slash_command', (bot, message) => {
    if (message.command !== '/roll') {
      return;
    }

    const dice = new Dice();

    const result = dice.execute(message.text).text
      .replace(/The result of /, '')
      .replace(/ is /, ' = ');

    bot.replyPublic(message, `<@${message.user}> ${result}`);
  });
};
