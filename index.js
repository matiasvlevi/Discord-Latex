const config = require('dotenv').config().parsed;




const parser = require('./src/parser.js');
const write = require('./src/write.js');
const {
  Client,
  Intents,
  MessageEmbed,
  MessageAttachment
} = require('discord.js');

const fs = require('fs')
const express = require('express');
const server = express();


server.use(express.static(__dirname + '/temp'))

server.listen(config.PORT)

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.on('ready', () => {
  console.log('Hello');

})

bot.on('message', msg => {
  console.log(msg.content);
  let latex = parser(msg.content);
  let paths;
  if (latex !== undefined) {
    paths = write(latex);
    for (let i = 0; i < paths.length; i++) {

      // const file = new Discord.MessageAttachment(`./temp/${paths[i]}`, paths[i]);
      // const exampleEmbed = new Discord.MessageEmbed()
      //   .setTitle('Some title')
      //   .setImage(`attachment://temp/${paths[i]}`);

      // msg.channel.send({ files: [file] });
      const file = new MessageAttachment(`./temp/${paths[i]}`, paths[i]);
      const embed = new MessageEmbed()
        .setTitle('This is a test Embed.')
        .setImage(`http://127.0.0.1:3000/${paths[i]}`)

      msg.channel.send(embed);

    }
  }

  // const exampleEmbed = new Discord.MessageEmbed()
  //   .setColor('#0099ff')
  //   .setTitle('Some title')
  //   .setURL('https://discord.js.org/')
  //   .setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
  //   .setDescription('Some description here')
  //   .setThumbnail('https://i.imgur.com/AfFp7pu.png')
  //   .addFields({ name: 'Regular field title', value: 'Some value here' }, { name: '\u200B', value: '\u200B' }, { name: 'Inline field title', value: 'Some value here', inline: true }, { name: 'Inline field title', value: 'Some value here', inline: true }, )
  //   .addField('Inline field title', 'Some value here', true)
  //   .setImage('https://i.imgur.com/AfFp7pu.png')
  //   .setTimestamp()
  //   .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

  // channel.send({ embeds: [exampleEmbed] });




})




bot.login(config.TOKEN);