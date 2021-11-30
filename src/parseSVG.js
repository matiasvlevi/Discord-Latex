function scaleSVG(svgFile, regex, n) {
  let matches = [...svgFile.matchAll(regex)];
  for (let i = 0; i < matches.length; i++) {
    let match = matches[i][0];
    let values = [...match.match(/".*?"/gm)][0];
    let vs = values.split('"')[1].split('ex')[0];
    let v = parseFloat(vs, 10);

    svgFile = svgFile.replace(`${vs}ex`, `${v*n}ex`);
  }
}


module.exports = function parseSVG(svg, ref) {
  let svgFile = svg;

  svgFile = svgFile.replace('<svg ', '<svg fill="#fff" transform="scale(1) translate(0, 0)" ');
  let col = '#fff';
  if (ref.darkTheme === 'true') {
    col = '#000';
  } else {
    col = '#fff';
  }
  while (svgFile.includes('currentColor')) {
    svgFile = svgFile.replace('currentColor', col);
  }

  svgFile = scaleSVG(svgFile, /width=".*?ex"/gm, 2);
  svgFile = scaleSVG(svgFile, /height=".*?ex"/gm, 2);

  return svgFile;
}