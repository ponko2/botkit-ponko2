'use strict';

const Calendar = require('@ponko2/calendar');

module.exports = (controller) => {
  const calendar = new Calendar();

  const reply = `\`\`\`
今日: ${calendar.today().format('YYYY-MM-DD dddd')}

曜日: ${calendar.dayOfWeek()}
休日: ${calendar.isHoliday()}
平日: ${calendar.isWeekday()}

前の平日: ${calendar.previousWeekday().format('YYYY-MM-DD dddd')}
次の平日: ${calendar.nextWeekday().format('YYYY-MM-DD dddd')}

前の休日: ${calendar.previousHoliday().format('YYYY-MM-DD dddd')}
次の休日: ${calendar.nextHoliday().format('YYYY-MM-DD dddd')}

月初: ${calendar.startOfTheMonth().format('YYYY-MM-DD dddd')}
月末: ${calendar.endOfTheMonth().format('YYYY-MM-DD dddd')}
\`\`\``;

  controller.hears([
    '^calendar$',
    '^カレンダー$',
    '^かれんだー$'
  ], [
    'direct_mention',
    'mention'
  ], (bot, message) => {
    bot.reply(message, reply);
  });
};
