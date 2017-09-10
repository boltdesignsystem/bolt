import { ComponentProps } from 'skatejs';
// @TODO this should maybe be a part of Skate
export type IntrinsicCustomElement<P> = P & Partial<HTMLElement>;
// @TODO this should maybe be a part of Bore
export type IntrinsicBoreElement<A, E> = { attrs?: A } & { events?: E };

/**
 * @deprecated use Constructor instead
 */
export interface Constructable<T> {
  readonly props: ComponentProps<any, any>;
  readonly observedAttributes: string[];
  readonly is: string;
  new ( ...args: any[] ): T,
}

export type Constructor<T> = new ( ...args: any[] ) => T;
export type MixinClass<Mixer, Base> = Constructor<Mixer> & Base;
