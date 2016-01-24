import punycode from 'punycode';

module.exports = controller => {
  controller.on('slash_command', (bot, message) => {
    if (message.command !== '/tiqav') {
      return;
    }

    const query = message.text;

    bot.replyPublic(message, {
      attachments: [{
        title: query,
        title_link: `http://tiqav.com/search/${encodeURIComponent(query)}`,
        image_url: `http://${punycode.encode(query)}.tiqav.com/`
      }]
    });
  });
};
