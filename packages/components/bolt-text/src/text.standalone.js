import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  BoltComponent,
  declarativeClickHandler,
  sanitizeBoltClasses,
} from '@bolt/core';

import styles from './text.scss';

@define
class BoltText extends BoltComponent() {
  static is = 'bolt-text';

  static props = {
    tag: props.string,
    weight: props.string,
    fontStyle: props.string,
  }

  constructor(self) {
    self = super(self);
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render({ props, state }) {

    const tag = this.props.tag ? this.props.tag : 'p';


    // Font weight
    const possibleWeights = ['regular','semibold','bold'];
    const weight = (possibleWeights.indexOf(this.props.weight) > -1) ? this.props.weight : 'regular';

    // Font style
    const possibleStyles = ['normal','italic'];
    const style = (possibleStyles.indexOf(this.props.fontStyle) > -1) ? this.props.fontStyle : 'normal';


    // Important classes
    const classes = css(
      'c-bolt-text',
      `c-bolt-text--${weight}`,
      `c-bolt-text--${style}`,
    );

    return this.html`
      ${ this.addStyles([styles]) }
      <div class=${classes}>
        ${this.slot('default')}
      </div>
    `;
  }
}
