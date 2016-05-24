'use strict';

module.exports = controller => {
  controller.hears([
    '[ぬヌ][ーぅゥ]*[るル][ーぅゥっッ]*[ぽポ][ーぉォっッ]*',
    'ﾇ[ーｩｰ]*ﾙ[ーｩｯｰ]*ﾎﾟ[ーｫｩｯｰ]*'
  ], [
    'direct_message',
    'direct_mention',
    'mention',
    'ambient'
  ], (bot, message) => {
    bot.reply(message, `\`\`\`
   Λ＿Λ     ＼＼
（  ・∀・）  | | ｶﾞｯ
 と     ）  | |
  Ｙ /ノ     人
   / ）    < >   _Λ  ∩
＿/し'   ／／  Ｖ｀Д´）/
（＿フ彡             / ←>> <@${message.user}>
\`\`\``);

    bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: 'hammer'
    }, err => {
      if (err) {
        bot.botkit.log('Failed to add emoji reaction :(', err);
      }
    });
  });

  controller.hears('海馬', [
    'direct_message',
    'direct_mention',
    'mention',
    'ambient'
  ], (bot, message) => {
    bot.reply(message, 'ヽ(*ﾟдﾟ)ノｶｲﾊﾞｰ');
  });

  controller.hears([
    'トゥットゥルー',
    'とぅっとぅるー'
  ], [
    'direct_message',
    'direct_mention',
    'mention',
    'ambient'
  ], (bot, message) => {
    bot.reply(message, 'トゥットゥルー');
  });

  controller.hears([
    '眠[いイｲくクｸ]',
    '[ねネﾈ][むムﾑ][いイｲくクｸ]'
  ], [
    'direct_message',
    'direct_mention',
    'mention',
    'ambient'
  ], (bot, message) => {
    bot.reply(message, `<@${message.user}> もう寝なさい`);
  });

  controller.hears([
    '寝[るルﾙ][おオｵぉォｫわワﾜ]?$',
    '眠[るルﾙ][おオｵぉォｫわワﾜ]?$',
    '[ねネﾈ][るルﾙ][おオｵぉォｫわワﾜ]?$'
  ], [
    'direct_message',
    'direct_mention',
    'mention',
    'ambient'
  ], (bot, message) => {
    bot.reply(message, `<@${message.user}> おやすみ`);
  });
};
