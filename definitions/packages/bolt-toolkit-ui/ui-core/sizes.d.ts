export declare const Sizes: {
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    super: string;
};
export declare type Size = typeof Sizes;
export declare function cssClassForSize(size: Size): string;
export declare function cssModifierForSize(size: Size): string;
