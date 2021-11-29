const fs = require('fs');
const parseSVG = require('./parseSVG');
const sendEmbed = require('./sendEmbed');
const { svg2png } = require('svg-png-converter');
const texsvg = require('texsvg');


module.exports = function convert(msg, name, tex, ref) {
  let path = `./temp/${name}`;
  // Create temp directory
  if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
  }
  texsvg(tex)
    .then((svg) => {
      let svgFile = parseSVG(svg, ref);
      svg2png({
          input: svgFile,
          encoding: 'buffer',
          format: 'png',
          multiplier: ref.size,
          quality: 1
        })
        .then(buffer => fs.writeFile(path, buffer, x => {
          sendEmbed(msg, name);
        }))
    })
}