import { ColorType } from './colorTypes';
import { prop } from './decorators';
import { IS_DEV } from './environment';
import { Constructor, MixinClass } from './static-definitions/types';
import { scopeCss } from './utils';

export type ColoredProps = {
  color?: ColorType,
};

export function Colored<T extends Constructor<{}>>( Base: T ): MixinClass<ColoredProps, T> {
  class ColoredCmp extends Base {
    @prop( { type: String, attribute: { source: true } } ) color?: ColorType;
  }

  return ColoredCmp;
}

export type DisabledProps = {
  disabled?: boolean,
};

export function Disabled<T extends Constructor<{}>>( Base: T ): MixinClass<DisabledProps, T> {
  class DisabledCmp extends Base {
    @prop( { type: Boolean, attribute: true } ) disabled?: boolean;
  }

  return DisabledCmp;
}

export type CssProps = {
  readonly css: string,
  readonly shadyCss: void | string,
};

export function Css<T extends Constructor<{}>>( Base: T ): MixinClass<CssProps, T> {
  return class extends Base {
    readonly css: string;

    get shadyCss() {
      if ( IS_DEV && !( 'css' in this ) ) {
        throw new Error( `you have to implement 'css' property when using 'Css' Mixin!` );
      }

      return scopeCss( this as any, this.css );
    }

  };

}
