// HyperHTML Renderer ported to SkateJS
import {
  withComponent,
  shadow,
  props,
} from 'skatejs';
import { hyper, bind } from 'hyperhtml/cjs';
import { hasNativeShadowDomSupport } from '../utils/environment';


import findParentTag from '../utils/find-parent-tag';



export function BoltComponent(Base = HTMLElement) {
  return class extends withComponent(Base) {

    static props = {
      onClick: props.string,
      onClickTarget: props.string
    }

    constructor(...args) {
      super(...args);

      this.hyper = hyper;

      if (findParentTag(this, 'FORM') || this.getAttribute('no-shadow') !== null) {
        this.useShadow = false;
      } else {
        this.useShadow = hasNativeShadowDomSupport;
      }
    }

    connectedCallback() {
      // if (this.dataset.ssrContent) {
      //   this.innerHTML = JSON.parse(this.dataset.ssrContent);
      // }

      this._checkSlots();
      super.connectedCallback && super.connectedCallback();
      this.connected && this.connected();
    }
 
    disconnectedCallback() {
      this.disconnecting && this.disconnecting();
    }
 
    addStyles(stylesheet) {
      let styles = Array.from(stylesheet);
      styles = styles.join(' ');

      if (this.useShadow) {
        return hyper.wire() `
          <style>${ styles} </style>
        `;
      }
    }

    slot(name) {
      if (this.useShadow && hasNativeShadowDomSupport) {
        if (name === 'default') {
          return hyper.wire() `
            <slot />
          `;
        } else {
          return hyper.wire() `
            <slot name="${name}" />
          `;
        }
      } else {
        if (this.slots[name]) {
          return hyper.wire() `
            ${this.slots.default}
          `;
        }
        else {
          console.log(`The ${name} slot doesn't appear to exist...`);
        }
      }
    }


    // Inspired by https://codepen.io/jovdb/pen/ddRZKo
    _checkSlots() {
      this.slots = {
        default: []
      };

      const elem = this;

      // Loop through nodelist
      this.childNodes.forEach(function (child, index, nodelist) {
        const slotName = child.getAttribute ? child.getAttribute("slot") : null;

        if (!slotName) {
          elem.slots.default.push(child);
        } else {
          elem.slots[slotName] = child;
        }
      });
    }

    get renderRoot() {
      if (hasNativeShadowDomSupport && this.useShadow === true) {
        return super.renderRoot || shadow(this);
      } else {
        return this;
      }
    }


    renderer(root, render) {
      this.html = this.html || bind(root);
      render();
    }
  }
};
