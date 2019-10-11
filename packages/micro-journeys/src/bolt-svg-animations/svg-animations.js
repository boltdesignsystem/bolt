import { define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitContext, html, convertSchemaToProps } from '@bolt/core';
import classNames from 'classnames/bind';
import * as SVGs from './svg';
import styles from './svg-animations.scss';
import schema from './svg-animations.schema';

let cx = classNames.bind(styles);

@define
class SVGAnimations extends withLitContext() {
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

  contextChangedCallback(name, oldValue, value) {
    this.triggerUpdate();
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
