const commands = require('./commands.js')
commands.add('dark', (msg, args, ref) => {
    if (args[0] === 'true' || args[0] === 'false') {
      ref.darkTheme = args[0];
    } else {
      msg.channel.send('Could not change the theme, argument not recognized.')
    }


  },
  'Set dark theme',
  '$dark true'
);

commands.add('size', (msg, args, ref) => {
    let v = parseFloat(args[0], 10);
    if (v > 4 || v < 0.1) {
      msg.channel.send('Value must be in the range of 0.1 to 4.');
      return
    };
    ref.size = v;
  },
  'Set latex image scale multiplier',
  '$size 2'
);

module.exports = commands;