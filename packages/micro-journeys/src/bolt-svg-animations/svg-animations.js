import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { classMap } from 'lit-html/directives/class-map.js';
import { withLitHtml, html, convertSchemaToProps } from '@bolt/core';
import * as SVGs from './svg';
import styles from './svg-animations.scss';
import schema from './svg-animations.schema';

@define
class SVGAnimations extends withLitHtml() {
  static is = 'bolt-svg-animations';

  static props = {
    ...convertSchemaToProps(schema),
  };

  constructor(self) {
    self = super(self);
    self.schema = schema;
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const { direction, animType, speed, theme } = this.validateProps(
      this.props,
    );
    const classes = {
      'c-bolt-svg-animations': true,
    };
    const SVGTag = SVGs[`${animType}`];

    return html`
      ${this.addStyles([styles])}
      <div class="${classMap(classes)}">
        ${SVGTag({ speed, theme, direction })}
      </div>
    `;
  }
}

export { SVGAnimations };
