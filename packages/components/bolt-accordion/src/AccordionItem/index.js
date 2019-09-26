import { withContext, define, props, css } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';
import styles from './accordion-item.scss';
import { AccordionItemTrigger } from './AccordionItemTrigger';
import { AccordionItemContent } from './AccordionItemContent';
import { AccordionContext } from '../accordion';

@define
class AccordionItem extends withContext(withLitHtml()) {
  static is = 'bolt-accordion-item';

  static props = {
    open: props.boolean,
    inactive: props.boolean,
    uuid: props.string,
  };

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [
      [AccordionContext, 'noSeparator'],
      [AccordionContext, 'boxShadow'],
      [AccordionContext, 'spacing'],
      [AccordionContext, 'iconValign'],
    ];
  }

  // @todo: move to BoltBase and/or move into a standalone addon function components can opt into
  ssrHydrationPrep() {
    if (this._ssrHydrationPrep) return;
    const parentElem = this;
    const initialNodesToKeep = Array.from(
      this.querySelectorAll('[ssr-hydrate]'),
    );
    const nodesToClean = [];

    initialNodesToKeep.forEach(item => {
      const hydrationType = item.getAttribute('ssr-hydrate');

      switch (hydrationType) {
        case 'keep-children':
          while (item.firstChild) {
            parentElem.appendChild(item.firstChild);
          }
          break;
        case 'keep':
        default:
          parentElem.appendChild(item);
          nodesToClean.push(item); // track the [ssr-hydrate] nodes to clean up later
      }
    });

    // grab an array of the pre-rendered DOM nodes to potentially remove
    const nodesToRemove = Array.from(
      parentElem.querySelectorAll(
        '[class*="c-bolt-accordion"]:not([ssr-hydrate]):first-child',
      ),
    );

    // remove pre-rendered DOM nodes not containing children with [ssr-hydrate] attributes
    nodesToRemove.forEach(node => {
      if (!node.closest(['[ssr-hydrate]'])) {
        node.parentElement.removeChild(node);
      }
    });

    // cleanup any [ssr-hydrate] nodes afterward
    nodesToClean.forEach(node => {
      node.removeAttribute('ssr-hydrate');
    });

    this._ssrHydrationPrep = true;
  }

  constructor(self) {
    self = super(self);

    return self;
  }

  get isFirstItem() {
    return this.accordionItems && this === this.accordionItems[0];
  }

  get isLastItem() {
    return (
      this.accordionItems &&
      this === this.accordionItems[this.accordionItems.length - 1]
    );
  }

  connecting() {
    super.connecting && super.connecting();

    const originalInput = this.querySelector('.c-bolt-accordion-item__state');
    const originalLinks = this.querySelectorAll(
      '.c-bolt-accordion-item__trigger-link',
    );

    originalInput && originalInput.remove();
    originalLinks.length && originalLinks.forEach(el => el.remove());

    // @todo: Can we get this from Accordion via context instead?
    this.accordionItems =
      this.parentNode &&
      this.parentNode.getElementsByTagName('BOLT-ACCORDION-ITEM');

    this.addEventListener('activateLink', this.close);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.context = this.contexts.get(AccordionContext);
  }

  close() {
    const elem = this;
    setTimeout(function() {
      elem.accordion.folds[0].close();
    }, 300);
  }

  template() {
    const { noSeparator, boxShadow, iconValign } = this.context;

    const accordionClasses = css(
      'c-bolt-accordion-item',
      !noSeparator ? 'c-bolt-accordion-item--separator' : '',
      boxShadow ? 'c-bolt-accordion-item--box-shadow' : '',
      iconValign && iconValign !== 'center'
        ? `c-bolt-accordion-item--icon-valign-${iconValign}`
        : '',
      this.isFirstItem ? 'c-bolt-accordion-item--first-item' : '',
      this.isLastItem ? 'c-bolt-accordion-item--last-item' : '',
    );

    const slotMarkup = name => {
      switch (name) {
        case 'trigger':
          return name in this.slots
            ? AccordionItemTrigger(this.slot(name), this.props, this.context)
            : html`
                <slot name="${name}" />
              `;

        default:
          return name in this.slots
            ? AccordionItemContent(
                this.slot('default'),
                this.props,
                this.context,
              )
            : html`
                <slot />
              `;
      }
    };

    const innerSlots = [slotMarkup('trigger'), slotMarkup('default')];

    return html`
      <div class="${accordionClasses}">${innerSlots}</div>
    `;
  }

  rendered() {
    super.rendered && super.rendered();

    this.contentElem = this.renderRoot.querySelector(
      '.c-bolt-accordion-item__content',
    );
  }

  render() {
    this.addClassesToSlottedChildren(['default', 'trigger']);

    return html`
      ${this.addStyles([styles, heightUtils])} ${this.template()}
    `;
  }
}

export { AccordionItem };
