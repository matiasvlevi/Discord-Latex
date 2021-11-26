const config = require('dotenv').config().parsed;

const parser = require('./src/parser.js');
const write = require('./src/write.js');
const {
  Client,
  Intents
} = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.on('ready', () => {
  console.log('Hello');

})

bot.on('message', msg => {
  console.log(msg.content);
  let latex = parser(msg.content);
  if (latex !== undefined) {
    write(latex, msg);
  }
})




bot.login(config.TOKEN);