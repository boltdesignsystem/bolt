import React from 'react';
import { render } from 'react-dom';
import { withRenderer, shadow, props } from 'skatejs';
import { hasNativeShadowDomSupport } from '../utils/environment';

import {
  declarativeClickHandler,
  findParentTag
} from '../';

const withReact = (Base = HTMLElement) =>
  class extends Base {
    get props() {
      // We override props so that we can satisfy most use
      // cases for children by using a slot.
      return {
        ...super.props,
        ...{ children: <slot /> }
      };
    }

    // static props = {
    //   onClick: props.string,
    //   onClickTarget: props.string
    // }

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


    addStyles(stylesheet) {
      let styles = Array.from(stylesheet);
      styles = styles.join(' ');

      if (this.useShadow) {
        return hyper.wire() `
          <style>${ styles} </style>
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


    renderer(root, call) {
      render(call(), root);
    }
  };

export default withReact;

export const wrap = Component =>
  class extends withReact() {
    render() {
      return <Component {...this.props} />;
    }
  };