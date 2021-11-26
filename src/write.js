const texsvg = require('texsvg');
const fs = require('fs');

const { svg2png } = require('svg-png-converter')
module.exports = function write(latexLines) {
  let paths = [];
  for (let i = 0; i < latexLines.length; i++) {
    let name = `latexLine${i}.png`;
    let path = `./temp/${name}`;

    texsvg(latexLines[i])
      .then(
        (svg) => {


          let definition = '<svg style="vertical-align:-.464ex" xmlns="http://www.w3.org/2000/svg" width="10.448ex" height="1.971ex" viewBox="0 -666 4618 871" xmlns:xlink="http://www.w3.org/1999/xlink">';
          let svgFile = svg;
          // svgFile = svgFile
          //   .split(definition)[1]
          //   .split(`</svg>`)[0]
          // let s = 10;
          // let scaledSVG = `${definition}<g transform="scale(${s} ${s})">${svgFile}</g></svg>`

          // console.log(scaledSVG);

          svgFile = svgFile.replace('<svg ', '<svg transform="scale(1) translate(0, 0)" ');

          let matches = [...svgFile.matchAll(/width=".*?ex"/gm)];


          for (let i = 0; i < matches.length; i++) {
            let match = matches[i][0];
            let values = [...match.match(/".*?"/gm)][0];
            let vs = values.split('"')[1].split('ex')[0];
            let v = parseFloat(vs, 10);

            svgFile = svgFile.replace(`${vs}ex`, `${v*2}ex`);
          }

          let matches2 = [...svgFile.matchAll(/height=".*?ex"/gm)];


          for (let i = 0; i < matches.length; i++) {
            let match = matches2[i][0];
            let values = [...match.match(/".*?"/gm)][0];
            let vs = values.split('"')[1].split('ex')[0];
            let v = parseFloat(vs, 10);

            svgFile = svgFile.replace(`${vs}ex`, `${v*2}ex`);
          }

          fs.writeFileSync(`./temp/${name.split('.')[0] + '.svg'}`, svgFile);
          console.log(svgFile)
          svg2png({
              input: svgFile,
              encoding: 'buffer',
              format: 'png',
              multiplier: 0.4
            })
            .then(buffer => fs.writeFile(path, buffer, x => {
              console.log('Success')
            }))
        }
      );
    paths.push(name);
  }
  return paths;
}