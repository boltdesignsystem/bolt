// HyperHTML Renderer ported to SkateJS

import { withComponent, shadow, props } from 'skatejs';
import { hasNativeShadowDomSupport } from '../utils/environment';

import {
  declarativeClickHandler,
  findParentTag
} from '../';

const { hyper, bind } = require('hyperhtml/cjs');


const _init$ = { value: false };
const defineProperty = Object.defineProperty;

const extend = (target, source) => {
  for (const key in source) target[key] = source[key];
};


export function BoltComponent(Base = HTMLElement) {
  return class extends withComponent(Base) {

    static props = {
      onClick: props.string,
      onClickTarget: props.string
    }

    constructor(...args) {
      super(...args);

      if (this.dataset.ssrContent) {
        this.innerHTML = JSON.parse(this.dataset.ssrContent);
      }

      if (findParentTag(this, 'FORM') || this.getAttribute('no-shadow') !== null) {
        this.useShadow = false;
      } else {
        this.useShadow = hasNativeShadowDomSupport;
      }
    }

    connectedCallback() {
      this._checkSlots();

      // Handles external click event hooks
      this.addEventListener('click', this.clickHandler);
    }

    disconnectedCallback() {
      // super.disconnectedCallback && super.disconnectedCallback();

      this.removeEventListener('click', this.clickHandler);
    }

    // Attach external events declaratively
    clickHandler(event) {
      declarativeClickHandler(this);
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
      let styles = Array.from(stylesheet);
      styles = styles.join(' ');

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
        if (child.nodeType === 3) {
          elem.slots.default.push(child);
        } else {
          const slotName = child.getAttribute ? child.getAttribute("slot") : null;

          if (!slotName) {
            elem.slots.default.push(child);
          } else {
            elem.slots[slotName] = child;
          }
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

      // if (root.childNodes.length) {
      //   root.replaceChild(render(), root.firstChild);
      // } else {
      //   root.appendChild(render());
      // }
    }
  }
};