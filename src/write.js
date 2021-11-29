const convert = require('./convert');

module.exports = function write(latexLines, msg, ref) {
  if (latexLines.length > 3) {
    // Process entire latex as document (4+ lines).
    let name = `latexDoc.png`;
    convert(msg, name, latexLines.join('\n \\\\ \n'), ref);
  } else {
    // Process each Latex line individually.
    for (let i = 0; i < latexLines.length; i++) {
      let name = `latexLine${i}.png`;
      convert(msg, name, latexLines[i], ref);
    }
  }
}