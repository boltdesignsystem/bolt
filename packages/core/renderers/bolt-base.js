import Ajv from 'ajv';
import { props } from 'skatejs';
import { withLifecycle } from 'skatejs/dist/esnext/with-lifecycle.js';
import { withUpdate } from 'skatejs/dist/esnext/with-update.js';
import { withRenderer } from 'skatejs/dist/esnext/with-renderer.js';
import camelcase from 'camelcase';
import {
  shouldUseShadowDom,
  hasNativeShadowDomSupport,
} from '@bolt/element/src/lib/utils';
import { renameKey } from '../utils';

export function shadow(elem) {
  // eslint-disable-next-line no-return-assign
  return (
    elem._shadowRoot ||
    (elem._shadowRoot =
      elem.shadowRoot ||
      elem.attachShadow({
        mode: 'open',
        delegatesFocus: elem.delegateFocus || false,
      }))
  );
}

export const withComponent = (Base = HTMLElement) =>
  withLifecycle(withUpdate(withRenderer(Base)));

export class BoltBase extends withComponent(HTMLElement) {
  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    // Check if any `<ssr-keep>` elements have registered themselves here. If so, kick off the one-time hydration prep task.
    if (this.ssrKeep && !this.ssrPrepped) {
      this.ssrHydrationPrep();
    }
  }

  /**
   * Update component state and schedule a re-render.
   * @param {object} state A dict of state properties to be shallowly merged
   * 	into the current state
   */
  setState(state) {
    this.state = Object.assign({}, this.state, state);
    // super.shouldUpdate && super.shouldUpdate();
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
    this.useShadow = shouldUseShadowDom(this);
  }

  get renderRoot() {
    // ensure every component instance renders to the light DOM when needed (ex. if nested inside of a form, render to the light DOM)
    // this ensures that things work as expected, even when a component gets removed / re-added to the page
    this.setupShadow();

    // double-check if any `<ssr-keep>` elements have registered anything after connectedCallback fired.
    // this extra check addresses a bug encountered where components like accordions connect BEFORE <ssr-keep> fires
    if (this.ssrKeep && !this.ssrPrepped) {
      this.ssrHydrationPrep();
    }

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

  validateProps(propData) {
    var validatedData = propData;
    const ajv = new Ajv({ useDefaults: 'shared', coerceTypes: true });

    // remove default strings in prop data so schema validation can fill in the default
    for (let property in validatedData) {
      if (validatedData[property] === '') {
        delete validatedData[property];
      }
    }

    // Skip this if formatted schema data is already stored
    if (this.schema && !this.formattedSchema) {
      this.formattedSchema = {};
      Object.assign(this.formattedSchema, this.schema);
      Object.keys(this.formattedSchema.properties).map(key => {
        this.formattedSchema.properties = renameKey(
          key,
          camelcase(key),
          this.formattedSchema.properties,
        );
      });
    }

    if (this.formattedSchema) {
      let isValid = ajv.validate(this.formattedSchema, validatedData);

      // bark at any schema validation errors
      if (!isValid) {
        console.log(ajv.errors);
      }
    }

    return validatedData;
  }

  /**
   * Get modified version of schema, removing any properties not wanted on Web Component
   * @param {object} schema A valid JSON schema
   * @param {(string|string[])} propsToRemove A prop or list of props to be removed from the schema
   * @returns {object} returns the modified JSON schema
   */
  getModifiedSchema(schema, propsToRemove = 'content') {
    let modifiedSchema = schema;

    if (typeof propsToRemove === 'string') {
      propsToRemove = [propsToRemove];
    }

    try {
      propsToRemove.forEach(item => {
        if (modifiedSchema.properties && modifiedSchema.properties[item]) {
          // Delete property key from schema
          delete modifiedSchema.properties[item];
        }

        if (modifiedSchema.required) {
          const index = modifiedSchema.required.indexOf(item);
          if (index !== -1) {
            // Remove from list of required fields
            modifiedSchema.required.splice(index, 1);
            if (!modifiedSchema.required.length) {
              // If no required props remain, just delete the whole key
              delete modifiedSchema.required;
            }
          }
        }
      });
    } catch (e) {
      console.warn(e.message, e.name);
    }

    return modifiedSchema;
  }

  /**
   * Replace server-side rendered HTML with only the markup needed to hydrate web component, as marked by `<ssr-keep>` elements.
   */
  ssrHydrationPrep() {
    this.nodesToKeep = [];

    this.ssrKeep.forEach(item => {
      while (item.firstChild) {
        this.nodesToKeep.push(item.firstChild); // track the nodes that will be preserved
        this.appendChild(item.firstChild);
      }
    });

    // Remove all children not in the "keep" array
    Array.from(this.children)
      .filter(item => !this.nodesToKeep.includes(item))
      .forEach(node => {
        node.parentElement.removeChild(node);
      });

    this.ssrPrepped = true;
  }

  addStyles(stylesheet) {
    let styles = Array.from(stylesheet);
    styles = styles.join(' ');

    if (this.useShadow && this.renderStyles) {
      return this.renderStyles(styles);
    }
  }

  /**
   * Automatically adds classes for the first and last slotted item (in the default slot) to help with tricky ::slotted selectors
   * @param {string[]} slotNames an array of slot names as strings
   */
  addClassesToSlottedChildren(slotNames = ['default']) {
    if (this.slots) {
      const applyClasses = slotName => {
        if (!(slotName in this.slots)) return;

        const currentSlot = [];

        this.slots[slotName].forEach(item => {
          if (item.tagName) {
            item.classList.remove('is-first-child');
            item.classList.remove('is-last-child'); // clean up existing classes
            currentSlot.push(item);
          }
        });

        if (currentSlot[0]) {
          currentSlot[0].classList.add('is-first-child');

          if (currentSlot.length === 1) {
            currentSlot[0].classList.add('is-last-child');
          }
        }

        if (currentSlot[currentSlot.length - 1]) {
          currentSlot[currentSlot.length - 1].classList.add('is-last-child');
        }
      };

      slotNames.forEach(name => applyClasses(name));
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
}
