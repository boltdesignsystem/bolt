const { loadCSS } = require('fg-loadcss/src/loadCSS.js');
import { supportsCSSVars } from '@bolt/core/utils';

/**
 * 1. Global environmental variables added in Bolt's Webpack config via the
 * Webpack Define plugin. Needed so we know the filename of the Themify
 * fallback filename + public path of the built code.
 */
const themeCSSFallback = bolt.themingFallbackCSS; /* [1] */

// make sure our global themeCSSFallback variable is defined before trying to async load the fallback CSS
if (!supportsCSSVars && themeCSSFallback) {
  loadCSS(themeCSSFallback);
}
