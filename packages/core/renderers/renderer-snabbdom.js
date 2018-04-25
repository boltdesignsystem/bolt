// HyperHTML Renderer ported to SkateJS
import {
  withComponent,
  shadow,
  props,
} from 'skatejs';
// import { hyper, bind } from 'hyperhtml/cjs';
import { hasNativeShadowDomSupport } from '../utils/environment';
import { findParentTag } from '../utils/find-parent-tag';

const html = require('snabby');
var toVNode = require('snabbdom/tovnode').default;

export function BoltSnabbdom(Base = HTMLElement) {
  return class extends withComponent(Base) {

    static props = {
      onClick: props.string,
      onClickTarget: props.string,
    }

    constructor(...args) {
      super(...args);

      this.html = html;

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
    }

    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback();
    }

    addStyles(stylesheet) {
      let styles = Array.from(stylesheet);
      styles = styles.join(' ');

      if (this.useShadow) {
        return this.html`
          <style>${ styles} </style>
        `;
      }
    }

    slot(name) {
      if (this.useShadow && hasNativeShadowDomSupport) {
        if (name === 'default') {
          return this.html`
            <slot />
          `;
        } else {
          return this.html`
            <slot name="${name}" />
          `;
        }
      } else {
        if (this.slots[name]) {
          return this.html`
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
        default: [],
      };

      const elem = this;

      // Loop through nodelist
      this.childNodes.forEach(function (child, index, nodelist) {
        const slotName = child.getAttribute ? child.getAttribute('slot') : null;

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
      function wrapAll (target, wrapper = document.createElement('div')) {
        [...target.childNodes].forEach(child => wrapper.appendChild(child))
        target.appendChild(wrapper)
        return wrapper
      };

      this._snabbdom = this.html.update(
        wrapAll(root),
        // root,
        render(),
      );
    }
  }
};
