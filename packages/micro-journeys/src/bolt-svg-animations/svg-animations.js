import {
  props,
  define,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import { classMap } from 'lit-html/directives/class-map.js';
import { withLitContext, html, convertSchemaToProps } from '@bolt/core';
import * as SVGs from './svg';
import styles from './svg-animations.scss';
import schema from './svg-animations.schema';
import { BoltInteractivePathwaysContext } from '../interactive-pathways';

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
    this.theme = this.context.theme;
    const classes = {
      'c-bolt-svg-animations': true,
      [`t-bolt-${this.theme}`]: this.theme,
    };
    const SVGTag = SVGs[`${props.animType}`];

    return html`
      ${this.addStyles([styles])}
      <div class="${classMap(classes)}">
        ${SVGTag({
          speed: props.speed,
          theme: this.theme,
          direction: props.direction,
        })}
      </div>
    `;
  }
}

export { SVGAnimations };
