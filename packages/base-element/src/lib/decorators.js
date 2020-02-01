import styleInjector from './style-injector';
import { getComponentRootElement, shouldUseShadowDom } from './utils';

/**
 * A Class decorator that extends the `connecting()` method to find the first matching element in the component root and assign it to `this.rootElement`.
 * Components can then check for `this.rootElement` and convert that element's attributes to props.
 * Example: `<bolt-link>` will convert attributes on an `<a>` into component props.
 *
 * @param {(string|string[])} tags - A tag name or a list of tag names.
 * @param {boolean} moveChildrenToRoot - If true, moves children of the root element to the custom element root.
 * @returns {Object} - The original Class with extended `connecting()` method.
 */
const convertInitialClass = (tags, moveChildrenToRoot, clazz) => {
  return class extends clazz {
    connectedCallback() {
      super.connectedCallback && super.connectedCallback();
      // Make sure the component ONLY ever reuses any existing HTML ONCE.
      if (
        (this._wasInitiallyRendered === false ||
          this._wasInitiallyRendered === undefined) &&
        !this._convertedInitialTags
      ) {
        // If the initial element contains a child node, break apart the original HTML so we can retain the a tag but swap out the inner content with slots.
        let rootElement = getComponentRootElement(this.childNodes, tags);

        if (rootElement) {
          this.rootElement = document.createDocumentFragment();

          if (moveChildrenToRoot) {
            // Take any child elements and move them to the root of the custom element
            while (rootElement.firstChild) {
              this.appendChild(rootElement.firstChild);
            }
          }

          this.rootElement.appendChild(rootElement);
          this._convertedInitialTags = true;
        }
      }
    }
  };
};

const legacyConvertInitialTags = (tags, moveChildrenToRoot = true, clazz) => {
  return convertInitialClass(tags, moveChildrenToRoot, clazz);
};

const standardConvertInitialTags = (
  tags,
  moveChildrenToRoot = true,
  descriptor,
) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      return convertInitialClass(tags, moveChildrenToRoot, clazz);
    },
  };
};

// output the correct decorator syntax depending on the the env being compiled
export const convertInitialTags = (
  tags,
  moveChildrenToRoot,
) => classOrDescriptor =>
  typeof classOrDescriptor === 'function'
    ? legacyConvertInitialTags(tags, moveChildrenToRoot, classOrDescriptor)
    : standardConvertInitialTags(tags, moveChildrenToRoot, classOrDescriptor);

/**
 * A Class decorator that automatically renders to the Light DOM if/when Shadow DOM is unsupported
 *
 * @returns {Class} - The extended Class with an updated createRenderRoot method + hooks to opt out of rendering to Shadow DOM even after initially rendering
 */
const conditionalShadowDomClass = clazz => {
  return class extends clazz {
    static get properties() {
      return {
        noShadow: {
          type: Boolean,
          attribute: 'no-shadow',
          reflect: true,
          hasChanged(newVal, oldVal) {
            if (newVal === oldVal) {
              return false;
            } else {
              return true;
            }
          },
        },
      };
    }

    createRenderRoot() {
      this.useShadow = shouldUseShadowDom(this);

      // @todo: look into adding fallback style loader
      // if (this.constructor && this.useShadow === false && this.constructor.styles){
      //   this.constructor.styles.map(item => {
      //     if (item.cssText){
      //       const stylesheet = new CSSStyleSheet();
      //       stylesheet.replaceSync(item.cssText);
      //       document.adoptedStyleSheets = [stylesheet];
      //     }
      //   });
      // }

      if (this.useShadow) {
        return this.attachShadow({ mode: 'open' });
      } else {
        return this;
      }
    }

    // re-initialize components configured to opt in / out of Shadow DOM too late (after createRenderRoot has fired)
    _disableShadowDom() {
      this.useShadow = false;
      this.renderRoot = this;

      const skipRerenderingIfContainsThisMarkup = `
        <!---->
          <slot></slot>
        <!---->
      `;

      const removeWhitespaceRegex = /(\r\n|\n|\r| )/gm;

      if (
        this.shadowRoot.innerHTML.replace(removeWhitespaceRegex, '') !==
        skipRerenderingIfContainsThisMarkup.replace(removeWhitespaceRegex, '')
      ) {
        console.log('re-rendering to the light DOM...');
        this.shadowRoot.innerHTML = '<slot>';
        this.requestUpdate();
      }
    }

    connectedCallback() {
      super.connectedCallback && super.connectedCallback();

      if (this.noShadow && this.useShadow) {
        this._disableShadowDom();
      }
    }

    updated(changedProps) {
      super.updated && super.updated(changedProps);

      if (this.noShadow && this.useShadow) {
        this._disableShadowDom();
      }
    }
  };
};

const legacyConditionalShadowDom = clazz => {
  return conditionalShadowDomClass(clazz);
};

const standardConditionalShadowDom = descriptor => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      return conditionalShadowDomClass(clazz);
    },
  };
};

/**
 * Class decorator factory to apply conditional Shadow DOM rendering logic
 */
export const conditionalShadowDom = () => classOrDescriptor =>
  typeof classOrDescriptor === 'function'
    ? legacyConditionalShadowDom(classOrDescriptor)
    : standardConditionalShadowDom(classOrDescriptor);

/**
 * A Class decorator that automatically renders to the Light DOM if/when Shadow DOM is unsupported
 *
 * @returns {Class} - The extended Class with an updated createRenderRoot method + hooks to opt out of rendering to Shadow DOM even after initially rendering
 */
const lazyStylesClass = clazz => {
  return class extends clazz {
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
  };
};

/**
 * A conditional Shadow DOM decorator for the old (legacy) decorator syntax
 */
const legacyLazyStyles = clazz => {
  return lazyStylesClass(clazz);
};

/**
 * A conditional Shadow DOM decorator for the new decorator syntax
 */
const standardLazyStyles = descriptor => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      return lazyStylesClass(clazz);
    },
  };
};

/**
 * Class decorator factory that defines the decorated class as a custom element.
 */
export const lazyStyles = () => classOrDescriptor =>
  typeof classOrDescriptor === 'function'
    ? legacyLazyStyles(classOrDescriptor)
    : standardLazyStyles(classOrDescriptor);

/**
 * A Class decorator that extends the LitElement `firstUpdated` and `updated` lifecycle events,
 * adding a `ready` and `rendered` custom events for other components to hook into
 *
 * @param {Class} clazz - The original Class to extend
 * @returns {Class} - The extended Class with added events when rendering + updating
 */
const renderEventsClass = clazz => {
  return class extends clazz {
    firstUpdated(changedProperties) {
      this._wasInitiallyRendered = true; // legacy internal prop used internally by many of Bolt's Web Components
      super.firstUpdated && super.firstUpdated(changedProperties);

      // Fired only once, when the component has finished rendering for the first time.
      this.dispatchEvent(
        new CustomEvent('ready', {
          detail: {
            name: this.tagName.toLowerCase(),
            shadowDom: this.noShadow ? false : true,
          },
          bubbles: true,
        }),
      );
    }

    updated(changedProps) {
      super.updated && super.updated(changedProps);

      this.dispatchEvent(
        new CustomEvent('rendered', {
          detail: {
            name: this.tagName.toLowerCase(),
            shadowDom: this.noShadow ? false : true,
          },
          bubbles: true,
        }),
      );
    }
  };
};

const legacyRenderEventDecorator = clazz => {
  return renderEventsClass(clazz);
};

const standardRenderEventDecorator = descriptor => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      return renderEventsClass(clazz);
    },
  };
};

/**
 * Class decorator factory that adds `render` and `rendered` custom events to the LitElement-based web component
 * Automatically uses the appropriate decorator syntax based on what's supported / how the code is being compiled.
 */
export const renderAndRenderedEvents = () => classOrDescriptor =>
  typeof classOrDescriptor === 'function'
    ? legacyRenderEventDecorator(classOrDescriptor)
    : standardRenderEventDecorator(classOrDescriptor);
