// HyperHTML Renderer ported to SkateJS
import {
  withComponent,
  shadow,
  props,
} from 'skatejs';
import { hasNativeShadowDomSupport } from '../utils/environment';
import { findParentTag } from '../utils/find-parent-tag';

export function BoltBase(Base = HTMLElement) {
  return class extends Base {

    connectedCallback() {
      this._checkSlots();

      // Automatically force a component to render if no props exist BUT props are defined.
      if (Object.keys(this.props).length !== 0 && Object.keys(this._props).length === 0) {
        this.updated();
      }
    }

    setupShadow() {
      if (findParentTag(this, 'FORM') || this.getAttribute('no-shadow') !== null) {
        this.useShadow = false;
      } else {
        this.useShadow = hasNativeShadowDomSupport;
      }
    }

    get renderRoot() {
      if (hasNativeShadowDomSupport && this.useShadow === true) {
        return super.renderRoot || shadow(this);
      } else {
        return this;
      }
    }

    addStyles(stylesheet) {
      let styles = Array.from(stylesheet);
      styles = styles.join(' ');

      if (this.useShadow && this.renderStyles) {
        return this.renderStyles(styles);
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

    disconnectedCallback() {
      this.disconnecting && this.disconnecting();
      this.disconnected && this.disconnected();
    }
  }
}