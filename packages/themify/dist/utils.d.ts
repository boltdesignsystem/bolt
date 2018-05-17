export declare type Theme = {
    [name: string]: {
        [variable: string]: string;
    };
};
/**
 *
 * @param {string} path
 */
export declare function loadCSS(path: string, callback: any): void;
/**
 *
 * @param {string} style
 */
export declare function injectStyle(style: string): void;
/**
 *
 * .dark {
 *   --primary-100: 30, 24, 33;
 * }
 *
 * :root {
 *   --primary-100: 22, 21, 22;
 * }
 *
 * @param customTheme
 * @returns {string}
 */
export declare function _generateNewVariables(customTheme: Theme): string;
/**
 *
 * @returns {boolean}
 */
export declare function hasNativeCSSProperties(): any;
/**
 * Load the CSS fallback file on load
 */
export declare function loadCSSVariablesFallback(path: string, cb: any): void;
/**
 *
 * @param customTheme
 */
export declare function replaceColors(fallbackJSONPath: any, customTheme: any, palette: any): void;
/**
 *
 * @param customTheme
 */
export declare function _handleUnSupportedBrowsers(customTheme: any, palette: any, JSONFallback: any): string;
