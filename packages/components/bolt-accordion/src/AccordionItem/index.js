import { props, css } from '@bolt/core/utils';
import { withLitContext } from '@bolt/core/renderers/renderer-lit-html';
import { html, customElement } from '@bolt/element';
import styles from './accordion-item.scss';
import { AccordionItemTrigger } from './AccordionItemTrigger';
import { AccordionItemContent } from './AccordionItemContent';

@customElement('bolt-accordion-item')
class AccordionItem extends withLitContext {
  static props = {
    open: props.boolean,
    contentSpacing: props.string,
    triggerSpacing: props.string,
    inactive: props.boolean,
    uuid: props.string,
  };

  static get observedContexts() {
    return ['noSeparator', 'boxShadow', 'spacing', 'iconValign'];
  }

  contextChangedCallback(name, oldValue, value) {
    this.triggerUpdate();
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

  render() {
    this.addClassesToSlottedChildren(['default', 'trigger']);

    return html`
      ${this.addStyles([styles])} ${this.template()}
    `;
  }
}

export { AccordionItem };
