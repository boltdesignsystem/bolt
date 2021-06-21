import { shouldUseShadowDom } from '../utils';

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
