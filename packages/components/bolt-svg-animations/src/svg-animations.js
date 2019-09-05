import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { classMap } from 'lit-html/directives/class-map.js';
import {
  withLitHtml,
  html,
  convertSchemaToProps,
} from '@bolt/core';
import * as SVGs from './svg';
import schema from '../svg-animations.schema';
import styles from './svg-animations.scss';

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
    const { direction, animType, speed, theme } = this.validateProps(this.props);
    const classes = {
      'c-bolt-svg-animations': true,
    };
    // const animType = this.getAttribute('anim-type');
    // const speed = this.getAttribute('speed');
    // const theme = this.getAttribute('theme');
    // const direction = this.getAttribute('direction');
    const SVGTag = SVGs[`${animType}`];

    console.log('Hey Super Smart Developer! You probably want this info ->', {
      animType,
      SVGTag
    });


    return html`
      ${this.addStyles([styles])}
      <div class="${classMap(classes)}">
        ${SVGTag({ speed, theme, direction })}
      </div>
    `;
  }
}

export { SVGAnimations };
