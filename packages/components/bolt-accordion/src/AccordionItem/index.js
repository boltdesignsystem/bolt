import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import { withContext } from 'wc-context';
import classNames from 'classnames/bind';
import accordionItemStyles from './accordion-item.scss';
import accordionItemSchema from '../../accordion-item.schema';
import { AccordionItemTrigger } from './AccordionItemTrigger';
import { AccordionItemContent } from './AccordionItemContent';

let cx = classNames.bind(accordionItemStyles);

@customElement('bolt-accordion-item')
class AccordionItem extends withContext(BoltElement) {
  static schema = accordionItemSchema;

  static get styles() {
    return [unsafeCSS(accordionItemStyles)];
  }

  static get properties() {
    return {
      ...this.props,

      // context-specific props for bolt-accordion-item that aren't listed out in the schema
      spacing: {
        type: String,
      },
      noSeparator: {
        type: Boolean,
        attribute: 'no-separator',
      },
      boxShadow: {
        type: Boolean,
        attribute: 'box-shadow',
      },
      iconValign: {
        type: String,
        attribute: 'icon-valign',
      },
    };
  }

  static get observedContexts() {
    return ['noSeparator', 'boxShadow', 'spacing', 'iconValign'];
  }

  contextChangedCallback(name, oldValue, value) {
    this[name] = value;
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

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
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

  close() {
    const elem = this;
    setTimeout(function() {
      elem.accordion.folds[0].close();
    }, 300);
  }

  template() {
    const accordionClasses = cx('c-bolt-accordion-item', {
      'c-bolt-accordion-item--separator': !this.noSeparator,
      'c-bolt-accordion-item--box-shadow': this.boxShadow,
      [`c-bolt-accordion-item--icon-valign-${this.iconValign}`]:
        this.iconValign && this.iconValign !== 'center',
      'c-bolt-accordion-item--first-item': this.isFirstItem,
      'c-bolt-accordion-item--last-item': this.isLastItem,
    });

    const slotMarkup = name => {
      switch (name) {
        case 'trigger':
          return this.slotMap.get(name)
            ? AccordionItemTrigger(this.slotify(name), this)
            : html`
                <slot name="${name}" />
              `;

        default:
          return this.slotMap.get(name)
            ? AccordionItemContent(this.slotify('default'), this)
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
      ${this.template()}
    `;
  }
}

export { AccordionItem };
