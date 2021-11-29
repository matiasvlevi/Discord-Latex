const Logger = require('./logger.js');

module.exports = function latexParser(msg) {
  let messageContent = msg.content;
  let m = messageContent.match('```latex');
  if (m === null) return;

  let lines = messageContent.split('\n');
  lines.splice(0, 1);
  lines.splice(lines.length - 1, 1);

  Logger.command(msg.author.username, `\x1b[36mLatex  -->  ${lines.join(', ')}\x1b[0m `);
  return lines;
}