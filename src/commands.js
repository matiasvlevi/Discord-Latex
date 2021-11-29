const Logger = require('./logger.js');
const { MessageEmbed } = require('discord.js');
class Command {
  constructor(name, func, helpmsg, example) {
    this.name = name;
    this.func = func;
    this.helpmsg = helpmsg;
    this.example = example;
    this.background = undefined;
  }
}

class Commands {
  constructor(prefix = '$') {
    this.commands = [];
    this.prefix = prefix;
    this.darkTheme = false;
    this.size = 1;
  }
  add(name, func, helpmsg = '', example = '') {
    this.commands.push(new Command(name, func, helpmsg, example));
  }
  promptParse(input) {
    if (input[0] !== this.prefix) return;
    let args = input.split(this.prefix)[1].split(' ');
    let command = args.splice(0, 1)[0];
    return {
      command,
      args
    }
  }
  help(msg) {
    let fields = [];
    for (let i = 0; i < this.commands.length; i++) {
      let command = this.commands[i];
      fields.push({
        name: `\n${command.name}`,
        value: `${command.helpmsg}\n\`\`\`${command.example}\`\`\`\n`
      });
    }
    const embed = new MessageEmbed()
      .setTitle('-             Help menu             -\n')
      .addFields(...fields)
    msg.channel.send(embed);

  }
  check(msg) {
    // Parse user input
    let prompt = this.promptParse(msg.content);
    if (prompt === undefined) return;

    // Commands
    for (let i = 0; i < this.commands.length; i++) {
      if (prompt.command === `${this.commands[i].name}`) {
        Logger.command(msg.author.username, this.commands[i].name, prompt.args);
        this.commands[i].func(msg, prompt.args, this);
      }
    }

    //Help menu
    if (prompt.command === `help`) {
      Logger.command(msg.author.username, 'help');
      this.help(msg);
    }
  }
}

module.exports = new Commands();