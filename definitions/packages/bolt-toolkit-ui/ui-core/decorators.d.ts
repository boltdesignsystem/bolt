import { Component, PropOptions } from 'skatejs';
import { Constructable } from './static-definitions/types';
export declare function renderCss(): MethodDecorator;
export declare function customElement(name: string): ClassDecorator;
export declare type PropCtorFn = () => any[] | object | number | boolean | string;
export declare type PropConfig = PropOptions<any, any> & {
    type?: PropCtorFn;
};
export declare type PropType = 'string' | 'number' | 'object' | 'array' | 'boolean';
export declare function prop(config?: PropConfig): PropertyDecorator;
export declare function event(alias?: string): PropertyDecorator;
export declare class EventEmitter<T> {
    private eventConfig;
    private origin;
    private eventName;
    constructor(eventConfig?: object);
    emit(data: T): boolean;
    _configByDecorator(origin: Component<any>, eventName: string): void;
}
export declare function colored(): ClassDecorator;
export declare function disabled(): ClassDecorator;
export declare function shadyCssStyles(): <T extends Constructable<Component<any>>>(Target: T) => T;
