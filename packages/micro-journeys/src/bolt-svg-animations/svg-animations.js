import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { classMap } from 'lit-html/directives/class-map.js';
import { withLitHtml, html, convertSchemaToProps } from '@bolt/core';
import * as SVGs from './svg';
import styles from './svg-animations.scss';
import schema from './svg-animations.schema';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

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

  static get observedContexts() {
    return ['theme'];
  }

  render() {
    const props = this.validateProps(this.props);
    const theme = this.context.theme || this.theme || '';
    const classes = cx('c-bolt-svg-animations', {
      [`t-bolt-${theme}`]: theme,
    });

    const SVGTag = SVGs[`${props.animType}`];

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        ${SVGTag({
          speed: props.speed,
          theme,
          direction: props.direction,
        })}
      </div>
    `;
  }
}

export { SVGAnimations };
