const config = require('dotenv').config().parsed;
const commands = require('./src/macros.js')
const parser = require('./src/parser.js');
const write = require('./src/write.js');
const clear = require('./src/clearTemp.js');
const Logger = require('./src/logger.js');

const {
  Client,
  Intents
} = require('discord.js');

// Delete previous .png files
clear('temp');

// Discord API Bot
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

Logger.log('\nStarting bot');
bot.on('ready', () => {
  Logger.log(`Logged in as \x1b[32m${bot.user.username}\x1b[0m\n`);
  Logger.log('Bot history:');
})

bot.on('message', msg => {
  // Check commands
  commands.check(msg);
  // Check for Latex code blocks
  let latex = parser(msg);
  if (latex !== undefined) {
    write(latex, msg, commands);
  }
})

bot.login(config.TOKEN);