import { ColorType } from './colorTypes';
import { Constructor, MixinClass } from './static-definitions/types';
export declare type ColoredProps = {
    color?: ColorType;
};
export declare function Colored<T extends Constructor<{}>>(Base: T): MixinClass<ColoredProps, T>;
export declare type DisabledProps = {
    disabled?: boolean;
};
export declare function Disabled<T extends Constructor<{}>>(Base: T): MixinClass<DisabledProps, T>;
export declare type CssProps = {
    readonly css: string;
    readonly shadyCss: void | string;
};
export declare function Css<T extends Constructor<{}>>(Base: T): MixinClass<CssProps, T>;
