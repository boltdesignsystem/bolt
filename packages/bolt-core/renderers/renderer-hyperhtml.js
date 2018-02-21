/** @jsx h */
// HyperHTML Renderer ported to SkateJS

import { shadow, props } from 'skatejs';
import { hasNativeShadowDomSupport } from '../utils/environment';

import {
  declarativeClickHandler,
  findParentTag
} from '../';

const { hyperHTML, hyper, wire, bind, Component } = require('hyperhtml/cjs');


export function withHyperHTML(Base = class extends HTMLElement { }) {
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

      this._replaceElementWithChildren();
    }

    connectedCallback() {
      this._checkSlots();

      // Handles external click event hooks
      this.addEventListener('click', this.clickHandler);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('click', this.clickHandler);
    }


    // Attach external events declaratively
    clickHandler(event) {
      declarativeClickHandler(this);
    }


    _replaceElementWithChildren(){
      const placeholderElement = this.querySelectorAll('replace-with-children')[0];
      if (placeholderElement) {
        placeholderElement.replaceWith(...placeholderElement.childNodes);
      }
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
          const slotName = child.getAttribute ? child.getAttribute("slot") : null;
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
