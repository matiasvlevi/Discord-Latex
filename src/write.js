const texsvg = require('texsvg');
const fs = require('fs');
const parseSVG = require('./parseSVG');
const { svg2png } = require('svg-png-converter');
const {
  MessageEmbed,
  MessageAttachment
} = require('discord.js');



function callback(msg, name) {

  const attachment = new MessageAttachment(`./temp/${name}`, name);
  const embed = new MessageEmbed()
    .attachFiles(attachment)
    .setImage(`attachment://${name}`)
  msg.channel.send(embed);

}

module.exports = function write(latexLines, msg) {
  let paths = [];
  if (latexLines.length > 3) {
    let name = `latexDoc.png`;
    let path = `./temp/${name}`;
    texsvg(latexLines.join('\n'))
      .then(
        (svg) => {
          let svgFile = parseSVG(svg);

          // fs.writeFileSync(`./temp/${name.split('.')[0] + '.svg'}`, svgFile);
          // console.log(svgFile);

          svg2png({
              input: svgFile,
              encoding: 'buffer',
              format: 'png',
              multiplier: 1.2,
              quality: 1
            })
            .then(buffer => fs.writeFile(path, buffer, x => {
              callback(msg, name);
              console.log('Success');
            }))
        }
      )
  } else {
    for (let i = 0; i < latexLines.length; i++) {
      let name = `latexLine${i}.png`;
      let path = `./temp/${name}`;

      texsvg(latexLines[i])
        .then(
          (svg) => {


            let svgFile = parseSVG(svg);

            // fs.writeFileSync(`./temp/${name.split('.')[0] + '.svg'}`, svgFile);
            // console.log(svgFile);

            svg2png({
                input: svgFile,
                encoding: 'buffer',
                format: 'png',
                multiplier: 1.2,
                quality: 1
              })
              .then(buffer => fs.writeFile(path, buffer, x => {
                callback(msg, name);
                console.log('Success');
              }))

          }
        );
      paths.push(name);
    }
  }

  return paths;
}