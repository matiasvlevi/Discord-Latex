const fs = require('fs');

class Logger {
  constructor() {
    this.history = '';
  }
  command(username, command, args = '') {
    // Log message
    let message = `\x1b[32m<${username}>\x1b[0m: $${command}`;
    let argmsg = (args.length > 0) ? ` [${args.join(',')}]` : '';
    console.log(message, args);

    // Add to history & save
    this.history += `<${username}>: $${command} ${argmsg}\n`;
    this.write();
  }
  log(message) {
    // Log message
    console.log(message);


    // Remove color codes for saved message
    let matches = [...message.matchAll(/\x1b\[.*?m/gm)]
    let logmsg = message;
    for (let i = 0; i < matches.length; i++) {
      logmsg = logmsg.replace(matches[i][0], '');
    }

    // Add to history & save
    this.history += logmsg + '\n';
    this.write();
  }
  write() {
    // Create log directory
    if (!fs.existsSync('./logs')) {
      fs.mkdirSync('./logs');
    }

    // Save history
    let name = new Date().toLocaleDateString().replace('/', '_').replace('/', '_');
    let filename = `LATEXBOT-${name}.log`;
    let path = './logs';
    fs.writeFile(`${path}/${filename}`, this.history, () => {})
  }
}

module.exports = new Logger();