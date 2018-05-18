import {
  loadCSSVariablesFallback, // @todo: replace with loadCSS?
  // replaceColors, // Unused -- uncomment if using runtime replacement
  // Theme, // Unused -- uncomment if using runtime replacement
} from '@bolt/themify/dist/utils';


/**
 * 1. Global environmental variables added in Bolt's Webpack config via the
 * Webpack Define plugin. Needed so we know the filename of the Themify
 * fallback filename + public path of the built code.
 *
 * 2. Currently unused JSON config for JIT theming customization:
 *   https://github.com/datorama/themify#runtime-replacement
 */
const themeCSSFallback = bolt.themingFallbackCSS; /* [1] */
const themeJSONFallback = bolt.themingFallbackJSON; /* [1, 2] */


export class BoltCSSVars {
  constructor() {
    /**
     * Load the CSS fallback file if the browser doesn't support CSS Variables.
     * loadCSSVariablesFallback uses feature detection so we don't need to do
     * anything else here.
     *
     *
     * Required only if you set the themify `screwIE11` option to false.
     *
     * callback - load event for the CSS file
     */
    loadCSSVariablesFallback(themeCSSFallback, function(){
      // console.log('CSS Vars Fallback Loaded!');
    });
  }

  /**
   * Replace the theme colors at runtime
   * @param partialTheme a partial theme configuration.
   */

  /**
   * Runtime color replacement -- currently unused so ommitting for now
   */
  // setColors(partialTheme: Theme) {
  //   replaceColors(themeJSONFallback, partialTheme, palette);
  // }
}

const cssVarsInstance = new BoltCSSVars();


