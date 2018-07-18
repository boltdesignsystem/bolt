var CleanCSS = require('clean-css');
var cleanCSS = new CleanCSS({});
function minifyCSS(css) {
  return cleanCSS.minify(css).styles;
}
exports.minifyCSS = minifyCSS;
