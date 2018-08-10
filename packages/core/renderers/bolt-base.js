// HyperHTML Renderer ported to SkateJS
import { withComponent, shadow, props } from 'skatejs';
import { hasNativeShadowDomSupport } from '../utils/environment';
import { findParentTag } from '../utils/find-parent-tag';

export function BoltBase(Base = HTMLElement) {
  return class extends Base {
    connectedCallback() {
      // Automatically adjust which inner element inside the custom element gets used as the base when evaluating slotted children. Necessary when including deeply nested slots in the initial HTML being rendered, which might include a few wrapping containers that get removed when the JavaScript kicks in. <-- this is how we get slotted buttons to work!
      const isShadowRootSelector = this.querySelector('[is="shadow-root"]');
      if (isShadowRootSelector) {
        this.slots = this._checkSlots(isShadowRootSelector.childNodes);
      } else {
        this.slots = this._checkSlots();
      }

      // Automatically force a component to render if no props exist BUT props are defined.
      if (
        Object.keys(this.props).length !== 0 &&
        Object.keys(this._props).length === 0
      ) {
        this.updated();
      }
    }

    setupShadow() {
      if (
        findParentTag(this, 'FORM') ||
        this.getAttribute('no-shadow') !== null
      ) {
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
    _checkSlots(selector = this.childNodes) {
      const slots = { default: [] };

      // Loop through nodelist
      selector.forEach(function(child, index, nodelist) {
        const slotName = child.getAttribute ? child.getAttribute('slot') : null;

        if (!slotName) {
          slots.default.push(child);
        } else if (slots[slotName]) {
          slots[slotName].push(child);
        } else {
          slots[slotName] = [];
          slots[slotName].push(child);
        }
      });

      return slots;
    }

    disconnectedCallback() {
      this.disconnecting && this.disconnecting();
      this.disconnected && this.disconnected();
    }
  };
}
