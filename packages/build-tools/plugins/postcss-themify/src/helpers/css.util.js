var CleanCSS = require('clean-css');
var cleanCSS = new CleanCSS({
  level: {
    2: {
      all: false, // sets all values to `false`
      removeDuplicateRules: true, // turns on removing duplicate rules
    },
  },
});
function minifyCSS(css) {
  return cleanCSS.minify(css).styles;
}
exports.minifyCSS = minifyCSS;
