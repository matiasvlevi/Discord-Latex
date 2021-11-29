const fs = require('fs');

class Logger {
  constructor() {
    this.history = '';
  }
  static removeColors(message) {
    let matches = [...message.matchAll(/\x1b\[.*?m/gm)]
    let logmsg = message;
    for (let i = 0; i < matches.length; i++) {
      logmsg = logmsg.replace(matches[i][0], '');
    }
    return logmsg;
  }
  static makeDate() {
    return new Date().getHours() +
      ':' + Logger.doubleDigitOnly(new Date().getMinutes());
  }
  static doubleDigitOnly(num) {
    let str = num.toString();
    let newStr = '0';
    if (str.length < 2) {
      return newStr + str[0];
    } else {
      return str;
    }
  }
  command(username, command, args = '') {
    // Log message
    let date = Logger.makeDate();
    let message = `\x1b[36m[${date}] \x1b[32m<${username}>\x1b[0m: $${command}`;
    let argmsg = (args.length > 0) ? ` [${args.join(',')}]` : '';
    console.log(message, args);

    let logmsg = Logger.removeColors(message + argmsg);

    // Add to history & save
    this.history += `${logmsg}\n`;
    this.write();
  }
  log(message) {
    // Log message
    console.log(message);

    // Remove color codes for saved message
    let logmsg = Logger.removeColors(message);

    // Add to history & save
    this.history += `${logmsg}\n`;
    this.write();
  }
  write() {
    // Create log directory
    if (!fs.existsSync('./logs')) {
      fs.mkdirSync('./logs');
    }

    // Save history
    let name = new Date().toLocaleDateString().replace('/', '_').replace('/', '_') +
      new Date().getTime().toString().slice(0, 6);
    let filename = `LATEXBOT-${name}.log`;
    let path = './logs';
    fs.writeFile(`${path}/${filename}`, this.history, () => {})
  }
}

module.exports = new Logger();