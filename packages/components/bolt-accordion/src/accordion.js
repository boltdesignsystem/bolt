import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import { withContext } from 'wc-context';
import classNames from 'classnames/bind';
import accordionStyles from './accordion.scss';
import schema from '../accordion.schema';
import { Accordion } from './_accordion-handorgel';

let cx = classNames.bind(accordionStyles);

// Remove "items" from the Accordion schema since it doesn't apply to the web component.
delete schema.properties['items'];

@customElement('bolt-accordion')
class BoltAccordion extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  static get styles() {
    return [unsafeCSS(accordionStyles)];
  }

  static get providedContexts() {
    return {
      noSeparator: { value: schema.properties.no_separator.default },
      boxShadow: { value: schema.properties.box_shadow.default },
      spacing: { value: schema.properties.spacing.default },
      iconValign: { value: schema.properties.icon_valign.default },
    };
  }

  updated(changedProperties) {
    super.updated && super.updated(changedProperties);
    let hasSpacingChanged = false;

    changedProperties.forEach((oldValue, propName) => {
      this.updateProvidedContext(propName, this[propName]);

      // is spacing has changed, wait for the updates to finish before updating handorgel
      if (propName === 'spacing') {
        hasSpacingChanged = true;
      }
    });

    this.updateComplete.then(() => {
      if (this.accordion && this.accordion.options) {
        this.accordion.options = this.accordionOptions;
        this.accordion.update();
      }

      if (hasSpacingChanged) {
        this.accordion?.resize();
        hasSpacingChanged = false;
      }
    });
  }

  get accordionOptions() {
    return {
      // array of node references, alternating trigger + content: [trigger, content, trigger, content]
      items: this.accordionItems,

      // whether multiple folds can be opened at once
      multiSelectable: !this.single,
      // whether the folds are collapsible
      collapsible: true,

      // whether ARIA attributes are enabled
      ariaEnabled: true,
      // whether W3C keyboard shortcuts are enabled
      keyboardInteraction: true,
      // whether to loop trigger focus (sets focus back to first/last trigger when end/start reached)
      carouselFocus: true,

      // attribute for the trigger or content to open folds at initialization
      initialOpenAttribute: 'data-open',
      // whether to use transition at initial open
      initialOpenTransition: true,
      // delay used to show initial transition
      initialOpenTransitionDelay: 200,

      // trigger/content class if fold is open
      triggerOpenClass: 'c-bolt-accordion-item__trigger--open',
      contentOpenClass: 'c-bolt-accordion-item__content--open',

      // trigger/content class if fold has been opened (transition finished)
      triggerOpenedClass: 'c-bolt-accordion-item__trigger--opened',
      contentOpenedClass: 'c-bolt-accordion-item__content--opened',

      // trigger/content class if fold has been focused
      triggerFocusClass: 'c-bolt-accordion-item__trigger--focus',
      contentFocusClass: 'c-bolt-accordion-item__content--focus',

      // trigger/content class if fold is disabled
      triggerDisabledClass: 'c-bolt-accordion-item__trigger--disabled',
      contentDisabledClass: 'c-bolt-accordion-item__content--disabled',

      // trigger/content class if no transition should be active (applied on resize)
      triggerNoTransitionClass: 'c-bolt-accordion-item__trigger--notransition',
      contentNoTransitionClass: 'c-bolt-accordion-item__content--notransition',
    };
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.addEventListener('bolt:layout-size-changed', this.handleLayoutChanged);
  }

  handleAccordionItemReady(item) {
    const root = item.renderRoot;
    const trigger =
      root && root.querySelector('.c-bolt-accordion-item__trigger');
    const content =
      root && root.querySelector('.c-bolt-accordion-item__content');

    if (trigger && content) {
      this.accordionItems = [...this.accordionItems, trigger, content];
    }

    const index = this.accordionItemElementsCopy.indexOf(item);

    if (index !== -1) {
      this.accordionItemElementsCopy.splice(index, 1);
    }

    if (this.accordionItemElementsCopy.length === 0) {
      if (this.accordion) {
        this.accordion.update();
      } else {
        this.initAccordion();
      }
    }
  }

  initAccordion() {
    this.accordion = new Accordion(
      this.accordionElement,
      this.accordionOptions,
    );

    this.accordion.folds.forEach(fold => {
      if (
        fold.button.classList.contains(
          'c-bolt-accordion-item__trigger-label--inactive',
        )
      ) {
        fold.disable();
      }
    });

    this.accordion.on('destroyed', fold => {
      delete this.accordion;
    });

    this.accordion.on('fold:opened', fold => {
      this.dispatchLayoutChanged();

      // @todo: register these elements in Bolt data instead?
      const elementsToUpdate = this.querySelectorAll('[will-update]');
      if (elementsToUpdate.length) {
        elementsToUpdate.forEach(el => {
          el.update && el.update();
        });
      }
    });

    this.accordion.on('fold:closed', fold => {
      this.dispatchLayoutChanged();
    });
  }

  dispatchLayoutChanged() {
    this.dispatchEvent(
      new CustomEvent('bolt:layout-size-changed', {
        bubbles: true,
      }),
    );
  }

  handleLayoutChanged(e) {
    if (e.target !== this) {
      this.accordion && this.accordion.resize();
    }
  }

  setupAccordion() {
    // Accordion outer container, accordion plugin will be instantiated on this element
    this.accordionElement = this.renderRoot.querySelector('.c-bolt-accordion');

    // Root used to find child accordion items
    this.accordionRoot = this.useShadow ? this : this.accordionElement;

    // Reference to all the accordion items
    this.accordionItemElements = Array.from(this.accordionRoot.children).filter(
      item => item.tagName === 'BOLT-ACCORDION-ITEM',
    );

    // Copy of that reference that will be mutated as we process each accordion item
    this.accordionItemElementsCopy = [...this.accordionItemElements];

    // Array passed to the Accordion plugin, a series of trigger/content pairs
    this.accordionItems = [];

    Promise.all(
      this.accordionItemElements.map(item => {
        if (item._wasInitiallyRendered || this._wasMutated) return;
        return new Promise((resolve, reject) => {
          item.addEventListener('ready', e => {
            return item === e.target && resolve();
          });
          item.addEventListener('error', reject);
        });
      }),
    ).then(() => {
      this.accordionItemElements.forEach(item => {
        this.handleAccordionItemReady(item);
      });
      this._wasMutated = false;
    });
  }

  addMutationObserver() {
    const self = this;

    // todo: this.useShadow is a temporary workaround until mutation observer works better with light DOM
    if (window.MutationObserver && this.useShadow) {
      // Re-generate slots + re-render when mutations are observed
      const mutationCallback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            // @todo: handle add/remove children
            // console.log('A child node has been added or removed.');
            // self.slots = self._checkSlots();
            // self.triggerUpdate();
          } else if (mutation.type === 'attributes') {
            if (mutation.target.tagName === 'BOLT-ACCORDION-ITEM') {
              const target = mutation.target;

              this._wasMutated = true;

              const resetAccordion = () => {
                self.accordion.destroy();
                self.setupAccordion();
                target.removeEventListener('rendered', resetAccordion);
              };

              target.addEventListener('rendered', resetAccordion);
            }
          }
        }
      };

      // Create an observer instance linked to the callback function
      self.observer = new MutationObserver(mutationCallback);

      // Start observing the target node for configured mutations
      self.observer.observe(this, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
  }

  template() {
    const classes = cx('c-bolt-accordion', {
      'c-bolt-accordion--box-shadow': this.boxShadow,
    });

    return html`
      <div class="${classes}">
        ${this.slotify('default')}
      </div>
    `;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated && super.firstUpdated(changedProperties);

    if (this.accordion) {
      // If accordion already exists, update options
      this.accordion.options = this.accordionOptions;
    } else {
      this.setupAccordion();
    }
    if (!this.observer) {
      this.addMutationObserver();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();

    this.removeEventListener(
      'bolt:layout-size-changed',
      this.handleLayoutChanged,
    );

    // remove MutationObserver if supported + exists
    if (window.MutationObserver && this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    return html`
      ${this.template()}
    `;
  }
}

export { BoltAccordion };
