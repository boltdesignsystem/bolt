import { ComponentProps } from 'skatejs';
export declare type IntrinsicCustomElement<P> = P & Partial<HTMLElement>;
export declare type IntrinsicBoreElement<A, E> = {
    attrs?: A;
} & {
    events?: E;
};
/**
 * @deprecated use Constructor instead
 */
export interface Constructable<T> {
    readonly props: ComponentProps<any, any>;
    readonly observedAttributes: string[];
    readonly is: string;
    new (...args: any[]): T;
}
export declare type Constructor<T> = new (...args: any[]) => T;
export declare type MixinClass<Mixer, Base> = Constructor<Mixer> & Base;
