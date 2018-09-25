var supportsCSSVars = window.CSS && CSS.supports('color', 'var(--primary)');

const { loadCSS } = require('fg-loadcss/src/loadCSS.js');

/**
 * 1. Global environmental variables added in Bolt's Webpack config via the
 * Webpack Define plugin. Needed so we know the filename of the Themify
 * fallback filename + public path of the built code.
 */
const themeCSSFallback = bolt.themingFallbackCSS; /* [1] */

if (!supportsCSSVars) {
  loadCSS(themeCSSFallback);
}
