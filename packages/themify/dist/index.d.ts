export interface ThemifyOptions {
    /**
     * Whether we would like to generate the CSS variables.
     * This should be true, unless you want to inject them yourself.
     */
    createVars: boolean;
    /**
     * Whether we would like to modify CSS rules to include additional selectors.
     * This should be true, unless you want to handle this yourself.
     */
    modifyCSSRules: boolean;
    /**
     * Palette configuration
     */
    palette: any;
    /**
     * A class prefix to append to the generated themes classes
     */
    classPrefix: string;
    /**
     * Whether to generate a fallback for legacy browsers (ahm..ahm..) that do not supports CSS Variables
     */
    screwIE11: boolean;
    /**
     * Legacy browser fallback
     */
    fallback: {
        /**
         * An absolute path to the fallback CSS.
         */
        cssPath: string | null;
        /**
         * An absolute path to the fallback JSON.
         * This file contains variable that will be replace in runtime, for legacy browsers
         */
        dynamicPath: string | null;
    };
}
