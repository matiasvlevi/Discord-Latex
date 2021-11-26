module.exports = function parseSVG(svg) {
  let svgFile = svg;

  svgFile = svgFile.replace('<svg ', '<svg fill="#fff" transform="scale(1) translate(0, 0)" ');

  while (svgFile.includes('currentColor')) {
    svgFile = svgFile.replace('currentColor', '#fff')
  }

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
  return svgFile;
}