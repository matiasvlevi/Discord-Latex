module.exports = function parser(messageContent) {
  let m = messageContent.match('```latex');
  if (m === null) return;

  let lines = messageContent.split('\n');
  lines.splice(0, 1);
  lines.splice(lines.length - 1, 1);
  console.log(lines)

  return lines;
}