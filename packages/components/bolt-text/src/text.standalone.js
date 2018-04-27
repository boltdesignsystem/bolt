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
import schema from '../text.schema.yml';

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

  allowedValues(schemaData, propVal) {
    const allowed = schemaData.enum;
    return (allowed.indexOf(propVal) > -1) ? propVal : schemaData.default;
  }

  render({ props, state }) {

    const tag = this.props.tag ? this.props.tag : 'p';

    const weight = this.allowedValues(schema.properties.weight, this.props.weight);
    const style = this.allowedValues(schema.properties.style, this.props.fontStyle);


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
