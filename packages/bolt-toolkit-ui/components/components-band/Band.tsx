import {
  // ColorType,
  css,
  // cssClassForColorType,
  cssModifierForSize,
  prop,
  shadyCssStyles,
  Size
} from '@bolt/ui-core';
import { Component, h } from 'skatejs';
import styles from './_components.band.scss';

export type BandProps = Props & Events;
export type Events = {};
export type EventProps = {};

export type Attrs = {
  'size'?: keyof Size
};

export type Props = {
  size?: keyof Size
};



@shadyCssStyles()
export default class Band extends Component<BandProps> {

  @prop( {
    type: String,
    attribute: {
      source: true
    }
  } ) size: Size;

  get css() { return styles; }

  renderCallback() {
    const { size } = this;
    const sizeClass = 'c-bolt-band--' + cssModifierForSize( size );
    const className = css(
      'c-bolt-band',
      sizeClass
    );

    return [
      <style>{styles}</style>,
      <div className={className}>

        <slot />

      </div>
    ];
  }
}
