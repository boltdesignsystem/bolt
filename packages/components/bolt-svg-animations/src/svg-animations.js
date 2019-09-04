import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { classMap } from 'lit-html/directives/class-map.js';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import * as SVGs from './svg';
import schema from '../svg-animations.schema.yml';
import styles from './svg-animations.scss';

@define
class SVGAnimations extends withLitHtml() {
  static is = 'bolt-svg-animations';

  static props = {
    speed: props.integer,
    animType: props.string,
    theme: props.string,
    direction: props.string,
    content: props.string,
  };

  constructor(self) {
    self = super(self);
    self.schema = schema;
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const classes = {
      'c-bolt-svg-animations': true,
    };
    const animType = this.getAttribute('animType');
    const speed = this.getAttribute('speed');
    const theme = this.getAttribute('theme');
    const direction = this.getAttribute('direction');
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
