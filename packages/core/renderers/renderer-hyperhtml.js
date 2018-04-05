/** @jsx h */
// HyperHTML Renderer ported to SkateJS

import { shadow, props } from 'skatejs';
import { hasNativeShadowDomSupport } from '../utils/environment';

import {
  declarativeClickHandler,
  findParentTag
} from '../';

const { hyperHTML, hyper, wire, bind, Component } = require('hyperhtml/cjs');


export function withHyperHTML(Base = HTMLElement) {
  return class extends Base {

    static props = {
      onClick: props.string,
      onClickTarget: props.string
    }

    constructor(...args) {
      super(...args);

      if (findParentTag(this, 'FORM') || this.getAttribute('no-shadow') !== null) {
        this.useShadow = false;
      } else {
        this.useShadow = hasNativeShadowDomSupport;
      }
    }

    connectedCallback() {
      this._checkSlots();
      this.connecting && this.connecting();
    }

    disconnectedCallback() {
      this.disconnecting && this.disconnecting();
    }

    addStyles(stylesheet) {
      let styles = Array.from(stylesheet);
      styles = styles.join(' ');

      if (this.useShadow) {
        return hyper.wire() `
          <style>${ styles } </style>
        `;
      }
    }


    // Inspired by https://codepen.io/jovdb/pen/ddRZKo
    _checkSlots() {
      const children = this.childNodes;
      this.slots = {
        default: []
      };
      if (children.length > 0) {
        [...children].map(child => {
          const slotName = child.getAttribute ? child.getAttribute('slot') : null;
          if (!slotName) {
            this.slots.default.push(child);
          } else {
            this.slots[slotName] = child;
          }
        });
      }
    }


    get renderRoot() {
      if (hasNativeShadowDomSupport && this.useShadow === true) {
        return super.renderRoot || shadow(this);
      } else {
        return this;
      }
    }


    renderer(renderRoot, renderCallback) {
      this._renderRoot = renderRoot;
      this.html = this.html || bind(this._renderRoot);
      renderCallback();
    }


    updated(...args) {
      super.updated && super.updated(...args);
      this.rendering && this.rendering();
      this.renderer(this.renderRoot, () => this.render && this.render(this));
      this.rendered && this.rendered();
    }

  }
};
