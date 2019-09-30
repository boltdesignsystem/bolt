import {
  defineContext,
  withContext,
  define,
  props,
  css,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';
import styles from './accordion.scss';
import schema from '../accordion.schema.yml';

import { Accordion } from './_accordion-handorgel';

// define which specific props to provide to children that subscribe
export const AccordionContext = defineContext({
  noSeparator: schema.properties.no_separator.default,
  boxShadow: schema.properties.box_shadow.default,
  spacing: schema.properties.spacing.default,
  iconValign: schema.properties.icon_valign.default,
  useShadow: hasNativeShadowDomSupport,
});

@define
class BoltAccordion extends withContext(withLitHtml()) {
  static is = 'bolt-accordion';

  static props = {
    single: props.boolean,
    noSeparator: props.boolean,
    boxShadow: props.boolean,
    spacing: props.string,
    iconValign: props.string,
  };

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.schema = this.getModifiedSchema(schema);

    return self;
  }

  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get provides() {
    return [AccordionContext];
  }

  get accordionOptions() {
    return {
      // array of node references, alternating trigger + content: [trigger, content, trigger, content]
      items: this.accordionItems,

      // whether multiple folds can be opened at once
      multiSelectable: !this.props.single,
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

  getModifiedSchema(schema) {
    var modifiedSchema = schema;

    // Remove "items" from schema, does not apply to web component.
    for (let property in modifiedSchema.properties) {
      if (property === 'items') {
        delete modifiedSchema.properties[property];
      }
    }

    return modifiedSchema;
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

    this.accordionItemElements.forEach(item => {
      const onItemReady = e => {
        if (e.detail.name !== 'bolt-accordion-item') return;
        this.handleAccordionItemReady(item);
        item.removeEventListener('rendered', onItemReady);
      };

      if (item._wasInitiallyRendered || this._wasMutated) {
        this.handleAccordionItemReady(item);
        this._wasMutated = false;
      } else {
        item.addEventListener('rendered', onItemReady);
      }
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
    const classes = css(
      'c-bolt-accordion',
      this.props.boxShadow ? 'c-bolt-accordion--box-shadow' : '',
    );

    return html`
      <div class="${classes}">
        ${this.slots.default ? this.slot('default') : ''}
      </div>
    `;
  }

  rendered() {
    super.rendered && super.rendered();

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

  disconnected() {
    super.disconnected && super.disconnected();

    // remove MutationObserver if supported + exists
    if (window.MutationObserver && this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    const { noSeparator, boxShadow, spacing, iconValign } = this.validateProps(
      this.props,
    );

    this.contexts.get(AccordionContext).noSeparator = noSeparator;
    this.contexts.get(AccordionContext).boxShadow = boxShadow;
    this.contexts.get(AccordionContext).spacing = spacing;
    this.contexts.get(AccordionContext).iconValign = iconValign;
    this.contexts.get(AccordionContext).useShadow = this.useShadow;

    return html`
      ${this.addStyles([styles, heightUtils])} ${this.template()}
    `;
  }
}

export { BoltAccordion };
