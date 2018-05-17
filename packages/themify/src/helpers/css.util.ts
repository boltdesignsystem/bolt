const _cleanCSS = require('clean-css');
const cleanCSS = new _cleanCSS({});

export function minifyCSS(css): string {
  return cleanCSS.minify(css).styles;
}
