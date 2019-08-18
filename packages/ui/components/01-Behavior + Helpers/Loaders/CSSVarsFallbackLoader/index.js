import { supportsCSSVars } from '@bolt/core/utils';
import { loadCSS } from 'fg-loadcss/src/loadCSS.js'; // helper function to conditionally load CSS files asynchronously
global.loadCSS = loadCSS;

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
