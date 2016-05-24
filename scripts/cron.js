/* eslint no-unused-vars: 0 */

const CronJob  = require('cron').CronJob;
const Calendar = require('@ponko2/calendar');

// channelのIDは下記のURLより調べることが可能
// https://api.slack.com/methods/channels.list/test

/**
 * 朝に実行するJob
 *
 * @callback onTickCallback
 *
 * @param {object} bot - Bitkitのオブジェクト
 *
 * @returns {void}
 */
function morningJob(bot) {
  // const calendar = new Calendar();
  //
  // // 平日のみ実行
  // if (calendar.isWeekday()) {
  //   bot.say({
  //     channel: 'XXXXXXXXX',
  //     text: '今日も一日がんばるぞい！'
  //   });
  // }
}

/**
 * 正午に実行するJob
 *
 * @callback onTickCallback
 *
 * @param {object} bot - Bitkitのオブジェクト
 *
 * @returns {void}
 */
function middayJob(bot) {
  // bot.say({
  //   channel: 'XXXXXXXXX',
  //   text: 'ひるほー'
  // });
}

/**
 * 午前零時に実行するJob
 *
 * @callback onTickCallback
 *
 * @param {object} bot - Bitkitのオブジェクト
 *
 * @returns {void}
 */
function midnightJob(bot) {
  // bot.say({
  //   channel: 'XXXXXXXXX',
  //   text: 'よるほー'
  // });
}

module.exports = (controller, bot) => {
  /**
   * Job設定
   *
   * @param {(string|Date)}  cronTime - The time to fire off your job. This can be in the form of cron syntax or a JS Date object.
   * @param {onTickCallback} onTick   - The function to fire at the specified time.
   *
   * @returns {void}
   */
  function cronJob(cronTime, onTick) {
    return new CronJob(cronTime, () => onTick(bot), null, true, 'Asia/Tokyo');
  }

  // cronJob('03 00 00 * * *', midnightJob);
  // cronJob('03 00 09 * * *', morningJob);
  // cronJob('03 00 12 * * *', middayJob);
};
