import { withComponent, shadow, props } from 'skatejs';
import { hasNativeShadowDomSupport } from '../utils/environment';
import { findParentTag } from '../utils/find-parent-tag';
import Ajv from 'ajv';

export function BoltBase(Base = HTMLElement) {
  return class extends Base {
    constructor(...args) {
      super(...args);
      this._wasInitiallyRendered = false;
    }

    connectedCallback() {
      // NOTE: it's SUPER important that setupSlots is run during the component's connectedCallback lifecycle event
      // Without this, browsers like IE 11 won't re-render as expected when props change!
      if (!this.slots) {
        this.setupSlots();
      }
    }

    setupSlots() {
      // Automatically adjust which inner element inside the custom element gets used as the base when evaluating slotted children. Necessary when including deeply nested slots in the initial HTML being rendered, which might include a few wrapping containers that get removed when the JavaScript kicks in. <-- this is how we get slotted buttons to work!
      const isShadowRootSelector = this.querySelector('[is="shadow-root"]');
      if (isShadowRootSelector) {
        if (isShadowRootSelector.childNodes) {
          this.slots = this._checkSlots(isShadowRootSelector.childNodes);
        } else {
          this.slots = this._checkSlots();
        }
      } else {
        this.slots = this._checkSlots();
      }
    }

    setupShadow() {
      if (
        this.useShadow === false ||
        findParentTag(this, 'FORM') ||
        this.getAttribute('no-shadow') !== null
      ) {
        this.useShadow = false;
      } else {
        this.useShadow = hasNativeShadowDomSupport;
      }
    }

    get renderRoot() {
      // ensure every component instance renders to the light DOM when needed (ex. if nested inside of a form, render to the light DOM)
      // this ensures that things work as expected, even when a component gets removed / re-added to the page
      this.setupShadow();

      // @todo: add debug flag the build to allow conditionally enabling / disabling this extra slot setup check here.
      if (!this.slots) {
        this.setupSlots(); // hotfix to ensure heavily nested elements containing text-nodes like <replace-with-children> re-render consistently in browsers that don't natively support custom elements Fixes wwwd8-2678
      }

      if (hasNativeShadowDomSupport && this.useShadow === true) {
        return super.renderRoot || shadow(this);
      } else {
        return this;
      }
    }

    validateProps(schema, propData) {
      var validatedData = propData;
      const ajv = new Ajv({ useDefaults: 'shared' });

      // remove default strings in prop data so schema validation can fill in the default
      for (let property in validatedData) {
        if (validatedData[property] === '') {
          delete validatedData[property];
        }
      }

      let isValid = ajv.validate(schema, validatedData);

      // bark at any schema validation errors
      if (!isValid) {
        console.log(ajv.errors);
      }

      return validatedData;
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

    rendered() {
      if (!this._wasInitiallyRendered) {
        this._wasInitiallyRendered = true;

        // Fired only once, when the component has finished rendering for the first time.
        this.dispatchEvent(
          new CustomEvent('ready', {
            detail: {
              name: this.tagName.toLowerCase(),
              shadowDom: this.useShadow ? true : false,
            },
            bubbles: true,
          }),
        );
      }

      // Fired every time an element has rendered
      this.dispatchEvent(
        new CustomEvent('rendered', {
          detail: {
            name: this.tagName.toLowerCase(),
            shadowDom: this.useShadow ? true : false,
          },
          bubbles: true,
        }),
      );
    }
  };
}
