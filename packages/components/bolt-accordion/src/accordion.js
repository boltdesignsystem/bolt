import {
  defineContext,
  withContext,
  define,
  props,
  css,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import {
  render,
  withLitHtml,
  html,
} from '@bolt/core/renderers/renderer-lit-html';

import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';
import styles from './accordion.scss';

import { Accordion } from './_accordion-handorgel';

// define which specific props to provide to children that subscribe
export const AccordionContext = defineContext({
  noSeparator: false,
  shadow: false,
  spacing: 'medium',
  iconValign: 'top',
  useShadow: hasNativeShadowDomSupport,
});

@define
class BoltAccordion extends withContext(withLitHtml()) {
  static is = 'bolt-accordion';

  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get provides() {
    return [AccordionContext];
  }

  static props = {
    multiple: props.boolean,
    noSeparator: props.boolean,
    shadow: props.boolean,
    spacing: props.string,
    iconValign: props.string,
  };

  constructor(self) {
    self = super(self);

    this.useShadow = hasNativeShadowDomSupport;

    // this.state = {
    //   open: this.props.autoOpen ? this.props.autoOpen : false,
    //   collapse: this.props.collapse ? this.props.collapse : false,
    // };

    // this.uuid = '12345';
    return self;
  }

  handleAccordionItemReady(item) {
    const root = item.renderRoot;
    const header = root.querySelector('.c-bolt-accordion-item__trigger');
    const content = root.querySelector('.c-bolt-accordion-item__content');

    if (header && content) {
      this.accordionItems = [...this.accordionItems, header, content];
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
    this.accordion = new Accordion(this.accordionElement, {
      // array of node references, alternating header + content: [header, content, header, content]
      items: this.accordionItems,

      // whether multiple folds can be opened at once
      multiSelectable: this.props.multiple,
      // whether the folds are collapsible
      collapsible: true,

      // whether ARIA attributes are enabled
      ariaEnabled: true,
      // whether W3C keyboard shortcuts are enabled
      keyboardInteraction: true,
      // whether to loop header focus (sets focus back to first/last header when end/start reached)
      carouselFocus: true,

      // attribute for the header or content to open folds at initialization
      initialOpenAttribute: 'data-open',
      // whether to use transition at initial open
      initialOpenTransition: true,
      // delay used to show initial transition
      initialOpenTransitionDelay: 200,

      // header/content class if fold is open
      headerOpenClass: 'c-bolt-accordion-item__trigger--open',
      contentOpenClass: 'c-bolt-accordion-item__content--open',

      // header/content class if fold has been opened (transition finished)
      headerOpenedClass: 'c-bolt-accordion-item__trigger--opened',
      contentOpenedClass: 'c-bolt-accordion-item__content--opened',

      // header/content class if fold has been focused
      headerFocusClass: 'c-bolt-accordion-item__trigger--focus',
      contentFocusClass: 'c-bolt-accordion-item__content--focus',

      // header/content class if fold is disabled
      headerDisabledClass: 'c-bolt-accordion-item__trigger--disabled',
      contentDisabledClass: 'c-bolt-accordion-item__content--disabled',

      // header/content class if no transition should be active (applied on resize)
      headerNoTransitionClass: 'c-bolt-accordion-item__trigger--notransition',
      contentNoTransitionClass: 'c-bolt-accordion-item__content--notransition',
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

    // Array passed to the Accordion plugin, a series of header/content pairs
    this.accordionItems = [];

    this.accordionItemElements.forEach(item => {
      const onItemReady = () => {
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

    if (window.MutationObserver) {
      // Re-generate slots + re-render when mutations are observed
      const mutationCallback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type == 'childList') {
            // @todo: handle add/remove children
            // console.log('A child node has been added or removed.');
            // self.slots = self._checkSlots();
            // self.triggerUpdate();
          } else if (mutation.type == 'attributes') {
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
      this.props.shadow ? 'c-bolt-accordion--shadow' : '',
    );

    return html`
      <div class="${classes}">
        ${this.slots.default ? this.slot('default') : ''}
      </div>
    `;
  }

  rendered() {
    super.rendered && super.rendered();

    this.setupAccordion();
    this.addMutationObserver();
  }

  disconnected() {
    super.disconnected && super.disconnected();

    // remove MutationObserver if supported + exists
    if (window.MutationObserver && this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    // @todo: replace with validated props
    this.contexts.get(AccordionContext).noSeparator =
      this.props.noSeparator || false;
    this.contexts.get(AccordionContext).shadow = this.props.shadow || false;
    this.contexts.get(AccordionContext).spacing =
      this.props.spacing || 'medium';
    this.contexts.get(AccordionContext).iconValign =
      this.props.iconValign || 'top';
    this.contexts.get(AccordionContext).useShadow = this.useShadow;

    return html`
      ${this.addStyles([styles, heightUtils])} ${this.template()}
    `;
  }
}

export { BoltAccordion };
