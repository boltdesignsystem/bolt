import { Component, ComponentProps, define, emit, h, prop as skProp, PropOptions } from 'skatejs';
import { ColorType } from './colorTypes';
import { IS_DEV } from './environment';
import { Constructable } from './static-definitions/types';
import { scopeCss } from './utils';

export function renderCss(): MethodDecorator {
  return function <T extends () => void>(
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ) {
    return {
      value( this: { css?: string, shadyCss?: string | void } & object ) {
        // we preffer shadyCss which is present if Css Mixin is used, otherwise fallback to css property
        // tslint:disable-next-line:no-invalid-this
        const css = 'shadyCss' in this ? this.shadyCss : this.css;

        // tslint:disable-next-line:no-invalid-this
        return [ h( 'style', css ) ].concat( descriptor.value.call( this, this ) );
      }
    };
  };
}

export function customElement( name: string ): ClassDecorator {
  return function <T extends Constructable<Component<any>>>( Target: T ): T {
    Object.defineProperty( Target, 'is', {
      configurable: true,
      get() { return name; }
    } );

    return define( Target );
  };
}

export type PropCtorFn = () => any[] | object | number | boolean | string;
export type PropConfig = PropOptions<any, any> & { type?: PropCtorFn };
export type PropType = 'string' | 'number' | 'object' | 'array' | 'boolean';
const identityFn = <T>( _: T ) => _;

export function prop( config: PropConfig = {} ): PropertyDecorator {
  return function( targetProto: { [ key: string ]: any } & Component<any>, propertyKey: string | symbol ) {
    const { type, ...skPropConfig } = config;
    const configType = parseType( type );
    const skatePropTypeFn = skProp[ configType ] || identityFn;
    const Ctor = targetProto.constructor as typeof Component;
    const existingProps = ( Ctor.props || {} ) as ComponentProps<any, any>;
    const newProps = {
      ...existingProps,
      ...{ [ propertyKey ]: skatePropTypeFn( skPropConfig ) }
    };
    Object.defineProperty(
      Ctor,
      'props',
      {
        configurable: true,
        get() { return newProps; }
      }
    );

    // this is needed for Babel ... :-/
    return {
      enumerable: true,
      configurable: true,
      // value: targetProto[ propertyKey ], // value causes error with private properties (title, disabled) and in IE
    };
  };
}

export function event( alias?: string ): PropertyDecorator {
  return function( targetProto: { [ key: string ]: any } & Component<any>, propertyKey: string | symbol ) {

    let propertyValue: EventEmitter<any> = targetProto[ propertyKey ];
    const eventName = alias || propertyKey;

    return {
      enumerable: true,
      get() {
        return propertyValue;
      },
      set( value: any ) {
        if ( value instanceof EventEmitter ) {
          // tslint:disable-next-line:no-invalid-this
          value._configByDecorator( this, eventName as string );
          propertyValue = value;
        } else {
          throw new Error( `${propertyKey} must be an instance of EventEmiiter` );
        }
      }
    };
  };
}

export class EventEmitter<T> {

  private origin: Component<any>;
  private eventName: string;

  constructor(
    private eventConfig: object = {}
  ) { }

  emit( data: T ): boolean {
    return emit(
      this.origin,
      this.eventName,
      {
        ...this.eventConfig,
        ...{ detail: data }
      }
    );
  }

  _configByDecorator( origin: Component<any>, eventName: string ) {
    this.origin = origin;
    this.eventName = eventName;
  }
}

function parseType( type: PropCtorFn ): PropType {
  if ( typeof type !== 'function' ) {
    return;
  }
  const inst = type();
  if ( inst instanceof Array ) {
    return 'array';
  }
  if ( typeof inst === 'object' ) {
    return 'object';
  }

  return ( typeof inst ) as 'boolean' | 'number' | 'string';
}

export function colored(): ClassDecorator {
  return function <T extends typeof Component>( Target: T ): T {

    const newProps = {
      ...( Target as any ).props,
      ...{ color: skProp.string<any, ColorType>( { attribute: { source: true } } ) }
    };
    Object.defineProperty( Target, 'props', {
      configurable: true,
      get() { return newProps; }
    } );

    return Target;
  };
}

export function disabled(): ClassDecorator {
  return function <T extends typeof Component>( Target: T ): T {

    const newProps = {
      ...Target.props,
      ...{ disabled: skProp.boolean( { attribute: true } ) }
    };
    Object.defineProperty( Target, 'props', {
      configurable: true,
      get() { return newProps; }
    } );

    return Target;
  };
}

export function shadyCssStyles() {
  return function <T extends Constructable<Component<any>>>( Target: T ) {
    const proto = Target.prototype;
    const originalRenderCallback = proto.renderCallback;

    Object.defineProperties( proto, {
      shadyCss: {
        get( this: { css: string } ) {
          // tslint:disable-next-line:no-invalid-this
          if ( IS_DEV && !( 'css' in this ) ) {
            throw new Error( `you have to implement 'css' property when using '@shadyCssStyles' Class Decorator!` );
          }

          // tslint:disable-next-line:no-invalid-this
          return scopeCss( this as any, this.css );
        }
      },
      renderCallback: {
        value( this: { shadyCss: string }, ...args: any[] ) {
          // tslint:disable-next-line:no-invalid-this
          return [ h( 'style', this.shadyCss ) ].concat( originalRenderCallback.apply( this, args ) );
        }
      }
    } );

    return Target;
  };
}
