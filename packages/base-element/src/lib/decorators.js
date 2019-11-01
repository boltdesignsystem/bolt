import styleInjector from './style-injector';
import { shouldUseShadowDom } from './utils';

export function renderAndRenderedEvents() {
  return target => {
    return class extends target {
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
}

export function lazyStyles() {
  return target => {
    return class extends target {
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
}

export function conditionalShadowDom() {
  return target => {
    return class extends target {
      static get properties() {
        return {
          noShadow: {
            type: Boolean,
            attribute: 'no-shadow',
            reflect: true,
            hasChanged(newVal, oldVal) {
              if (newVal === oldVal){
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

        if (this.useShadow) {
          return this.attachShadow({ mode: 'open' });
        } else {
          return this;
        }
      }

      // re-initialize components configured to opt in / out of Shadow DOM too late (after createRenderRoot has fired)
      // solution loosely based on https://stackoverflow.com/a/57583697
      _disableShadowDom() {
        const template = document.createElement('template');
        template.appendChild(this.cloneNode(true));
        if (!template.firstChild.hasAttribute('no-shadow')){
          template.firstChild.setAttribute('no-shadow');
        }
        this.insertAdjacentElement('beforebegin', template.firstChild.cloneNode(true));
        this.parentNode.removeChild(this);
      }

      connectedCallback() {
        super.connectedCallback && super.connectedCallback();

        if (
          (this.hasAttribute('no-shadow') || this.noShadow === true) &&
          this.useShadow === true
        ) {
          this._disableShadowDom();
        }
      }

      updated(changedProps) {
        super.updated && super.updated(changedProps);

        if (
          (this.hasAttribute('no-shadow') || this.useShadow === false) &&
          this.shadowRoot
        ) {
          this._disableShadowDom();
        }
      }
    };
  };
}
