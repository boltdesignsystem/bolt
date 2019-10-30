import { LitElement } from 'lit-element';
import { Slotify } from './Slotify';
import styleInjector from './utils/styleInjector';

const useShadow =
  ('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) || window.ShadyDOM;

export class BoltElement extends Slotify(LitElement) {
  createRenderRoot() {
    this._wasInitiallyRendered = false;
    if (useShadow && !this.constructor.noShadow && this.attachShadow) {
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

  firstUpdated(changedProperties) {
    this._wasInitiallyRendered = true;
    super.firstUpdated && super.firstUpdated(changedProperties);
  }
}

export default BoltElement;
