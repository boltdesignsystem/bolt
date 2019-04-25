import {
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

@define
class BoltAccordion extends withLitHtml() {
  static is = 'bolt-accordion';

  static props = {
    autoOpen: props.boolean,
    collapse: props.boolean,
    center: props.boolean,
    toggleText: props.string,
    primaryUuid: props.string,
    secondaryUuid: props.string,
  };

  constructor(self) {
    self = super(self);

    this.useShadow = hasNativeShadowDomSupport;

    this.state = {
      open: this.props.autoOpen ? this.props.autoOpen : false,
      collapse: this.props.collapse ? this.props.collapse : false,
    };

    this.uuid = '12345';
    return self;
  }

  template() {
    const classes = css(
      'c-bolt-accordion',
      this.props.collapse ? 'c-bolt-accordion--collapse@small' : '',
    );

    return html`
      <div class="${classes}" id="${this.uuid}">
        ${this.slots.default ? this.slot('default') : ''}
      </div>
    `;
  }

  rendered() {
    super.rendered && super.rendered();
    const accordionElement = this.renderRoot.querySelector('.c-bolt-accordion');
    const accordionRoot = this.useShadow ? this : accordionElement;
    const accordionItemElements = Array.from(accordionRoot.children).filter(
      item => item.tagName === 'BOLT-ACCORDION-ITEM',
    );

    let accordionItemElementsCopy = [...accordionItemElements];

    this.accordionItems = [];

    const initAccordion = element => {
      this.accordion = new Accordion(element, {
        // array of node references, alternating header + content: [header, content, header, content]
        items: this.accordionItems,

        // whether multiple folds can be opened at once
        multiSelectable: true,
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
        headerOpenClass: 'c-bolt-accordion__header--open',
        contentOpenClass: 'c-bolt-accordion__content--open',

        // header/content class if fold has been opened (transition finished)
        headerOpenedClass: 'c-bolt-accordion__header--opened',
        contentOpenedClass: 'c-bolt-accordion__content--opened',

        // header/content class if fold has been focused
        headerFocusClass: 'c-bolt-accordion__header--focus',
        contentFocusClass: 'c-bolt-accordion__content--focus',

        // header/content class if fold is disabled
        headerDisabledClass: 'c-bolt-accordion__header--disabled',
        contentDisabledClass: 'c-bolt-accordion__content--disabled',

        // header/content class if no transition should be active (applied on resize)
        headerNoTransitionClass: 'c-bolt-accordion__header--notransition',
        contentNoTransitionClass: 'c-bolt-accordion__content--notransition',
      });
    };

    const hasLastItemRendered = item => {
      const index = accordionItemElementsCopy.indexOf(item);

      if (index !== -1) {
        accordionItemElementsCopy.splice(index, 1);
      }

      if (accordionItemElementsCopy.length === 0) {
        return true;
      }
    };

    const handleAccordionItemReady = item => {
      const root = item.renderRoot;

      if (root) {
        let header = root.querySelector('.c-bolt-accordion__header');
        let content = root.querySelector('.c-bolt-accordion__content');

        if (header && content) {
          this.accordionItems = [...this.accordionItems, header, content];
        }
      }

      if (hasLastItemRendered(item)) {
        initAccordion(accordionElement);
      }
    };

    accordionItemElements.forEach(item => {
      const onItemReady = () => {
        handleAccordionItemReady(item);
        item.removeEventListener('rendered', onItemReady);
      };

      if (item._wasInitiallyRendered) {
        handleAccordionItemReady(item);
      } else {
        item.addEventListener('rendered', onItemReady);
      }
    });
  }

  render() {
    this.accordionTemplate = document.createDocumentFragment();
    render(this.template(), this.accordionTemplate);

    return html`
      ${this.addStyles([styles, heightUtils])} ${this.accordionTemplate}
    `;
  }
}

export { BoltAccordion };
