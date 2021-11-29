const {
  MessageEmbed,
  MessageAttachment
} = require('discord.js');

module.exports = function sendEmbed(msg, name) {
  const attachment = new MessageAttachment(`./temp/${name}`, name);
  const embed = new MessageEmbed()
    .attachFiles(attachment)
    .setImage(`attachment://${name}`)
  msg.channel.send(embed);
}