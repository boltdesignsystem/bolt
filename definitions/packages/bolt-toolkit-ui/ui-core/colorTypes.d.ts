export declare const ColorTypes: {
    brand: string;
    info: string;
    warning: string;
    success: string;
    error: string;
};
export declare type ColorType = keyof typeof ColorTypes;
export declare function cssClassForColorType(prefix: string, color: ColorType, singleDash?: boolean): string | null;
