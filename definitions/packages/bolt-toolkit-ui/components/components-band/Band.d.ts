import { Size } from '@bolt/ui-core';
import { Component } from 'skatejs';
export declare type BandProps = Props & Events;
export declare type Events = {};
export declare type EventProps = {};
export declare type Attrs = {
    'size'?: keyof Size;
};
export declare type Props = {
    size?: keyof Size;
};
export default class Band extends Component<BandProps> {
    size: Size;
    readonly css: string;
    renderCallback(): JSX.Element[];
}
