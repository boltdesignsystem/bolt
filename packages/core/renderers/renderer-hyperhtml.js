// HyperHTML Renderer ported to SkateJS
import { hyper, wire, bind } from 'hyperhtml';
import {
  withComponent,
  // shadow,
  props,
  hasNativeShadowDomSupport,
} from '../utils';
import { BoltBase } from './bolt-base';

export { hyper as html, wire, bind as render } from 'hyperhtml';

export function withHyperHtml(Base = HTMLElement) {
  return class extends withComponent(BoltBase(Base)) {
    static props = {
      onClick: props.string,
      onClickTarget: props.string,
    };

    constructor(...args) {
      super(...args);
    }

    renderStyles(styles) {
      if (styles) {
        return wire()`
          <style>${styles}</style>
        `;
      }
    }

    slot(name) {
      if (this.useShadow && hasNativeShadowDomSupport) {
        if (name === 'default') {
          return wire()`
            <slot />
          `;
        } else {
          return wire()`
            <slot name="${name}" />
          `;
        }
      } else {
        if (name === 'default') {
          return wire()`
             ${this.slots.default}
          `;
        } else if (this.slots[name]) {
          return wire()`
             ${this.slots[name]}
          `;
        } else {
          // @todo: update to perhaps still log this when a "debug" mode flag is set.
          // console.log(`The ${name} slot doesn't appear to exist...`);
        }
      }
    }

    renderer(root, render) {
      this.html = this.html || bind(root);
      render();
    }
  };
}
