// HyperHTML Renderer ported to SkateJS
import {
  withComponent,
  shadow,
  props,
} from 'skatejs';
import { hyper, bind } from 'hyperhtml/cjs';
import { hasNativeShadowDomSupport } from '../utils/environment';
import { findParentTag } from '../utils/find-parent-tag';

import { BoltComponent } from '@bolt/core/helper-components/bolt-component';


export class HyperComponent extends BoltComponent {
  constructor(...args) {
    super(...args);

    this.hyper = hyper;

    super.setupShadow();
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
        return hyper.wire()`
          <slot />
        `;
      } else {
        return hyper.wire()`
          <slot name="${name}" />
        `;
      }
    } else {
      if (this.slots[name]) {
        return hyper.wire()`
          ${this.slots.default}
        `;
      }
      else {
        console.log(`The ${name} slot doesn't appear to exist...`);
      }
    }
  }

  renderer(root, render) {
    this.html = this.html || bind(root);
    render();
  }
};
