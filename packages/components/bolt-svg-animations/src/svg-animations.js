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
    content: props.string,
  };

  constructor(self) {
    self = super(self);
    self.schema = schema;
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  rendered() {
    // This is an evil hack because lit-html replaces `image` tag with `img`.
    // const animType = this.getAttribute('animType');
    // if (animType === 'Radar') {
    //   const theme = this.getAttribute('theme');
    //   const SVGTag = SVGs[`${animType}`];
    //   if (theme === 'dark') {
    //     this.renderRoot.getElementById('el_tbKqO34v2S').innerHTML =
    //       SVGTag.darkImage;
    //   } else {
    //     this.renderRoot.getElementById('el_tbKqO34v2S').innerHTML =
    //       SVGTag.lightImage;
    //   }
    // }
  }

  render() {
    const classes = {
      'c-bolt-svg-animations': true,
    };
    const animType = this.getAttribute('animType');
    const speed = this.getAttribute('speed');
    const theme = this.getAttribute('theme');
    const SVGTag = SVGs[`${animType}`];

    console.log(this.slot('default'));
    console.log(`${animType}`, SVGTag({ speed, theme }));

    return html`
      ${this.addStyles([styles])}
      <div class="${classMap(classes)}" is="shadow-root">
        <div class="c-bolt-svg-animations__content">
          ${this.slot('default')}
        </div>
        ${SVGTag({ speed, theme })}
      </div>
    `;
  }
}

export { SVGAnimations };
