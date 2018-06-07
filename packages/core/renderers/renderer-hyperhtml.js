// HyperHTML Renderer ported to SkateJS
import {
  withComponent,
  withRenderer,
  withUpdate,
  shadow,
  props,
} from 'skatejs';
import { hyper, bind } from 'hyperhtml/cjs';
import { hasNativeShadowDomSupport } from '../utils/environment';
import { findParentTag } from '../utils/find-parent-tag';
import { BoltBase } from './bolt-base'

export function BoltComponent(Base = HTMLElement) {
  return class extends withComponent(withRenderer(BoltBase(Base))) {

    static props = {
      onClick: props.string,
      onClickTarget: props.string,
    }

    constructor(...args) {
      super(...args);
      super.setupShadow();

      this.hyper = hyper;
    }

    renderStyles(styles){
      if (styles){
        return hyper.wire()`
          <style>${ styles }</style>
        `;
      }
    }

    slot(name) {
      if (this.useShadow && hasNativeShadowDomSupport) {
        if (name === 'default') {
          return hyper.wire(this)`
            <slot />
          `;
        } else {
          return hyper.wire(this)`
            <slot name="${name}" />
          `;
        }
      } else {
        if (name === 'default') {
          return hyper.wire(this)`
             ${this.slots.default}
          `;
        } else if (this.slots[name]){
          return hyper.wire(this)`
             ${this.slots[name]}
          `;
        } else {
          console.log(`The ${name} slot doesn't appear to exist...`);
        }
      }
    }

    renderer(root, render) {
      this.html = this.html || bind(root);
      render();
    }
  }
};
