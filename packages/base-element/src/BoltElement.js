/* eslint-disable no-unused-expressions */
import { LitElement } from 'lit-element';
import { Slotify } from './Slotify.js';
import styleInjector from './lib/style-injector.js';

const useShadow =
  'attachShadow' in Element.prototype && 'getRootNode' in Element.prototype;

class BoltElement extends Slotify(LitElement) {
  createRenderRoot() {
    if (useShadow === true && !this.constructor.noShadow && this.attachShadow) {
      this.noShadow = false;
      return this.attachShadow({ mode: 'open' });
    }
    this.noShadow = true;
    return this;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.lazyStyles = this.constructor.lazyStyles;

    if (this.lazyStyles && this.noShadow) {
      styleInjector(...this.lazyStyles).add();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();

    if (this.lazyStyles && this.noShadow) {
      styleInjector(...this.lazyStyles).remove();
    }
  }
}

export { BoltElement };
