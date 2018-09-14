import {
  props,
  define,
  sanitizeBoltClasses,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import { wire, withHyperHtml } from '@bolt/core/renderers';

import classNames from 'classnames/bind';

import styles from './table.scss';

let cx = classNames.bind(styles);

console.log(cx);

@define
class BoltTable extends withHyperHtml() {
  static is = 'bolt-table';

  static props = {
    format: props.string,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    this.useShadow = hasNativeShadowDomSupport;
    const root = this;

    // If the initial <bolt-button> element contains a button or link, break apart the original HTML so we can retain any button or a tags but swap out the inner content with slots.
    this.childNodes.forEach((childElement, i) => {
      if (childElement.tagName === 'TABLE') {
        root.rootElement = document.createDocumentFragment();

        // Take any existing buttons and links and move them to the root of the custom element
        while (childElement.firstChild) {
          root.appendChild(childElement.firstChild);
        }

        if (childElement.className) {
          childElement.className = sanitizeBoltClasses(childElement);
        }

        root.rootElement.appendChild(childElement);
      }
    });
    return self;
  }

  render() {
    const classes = cx({
      'c-bolt-table': true,
      [`c-bolt-table--${this.props.format}`]: this.props.format,
    });

    let tableElement;
    const self = this;

    // const slotMarkup = name => {
    //   if (name in this.slots) {
    //     switch (name) {
    //       case 'before':
    //       case 'after':
    //         return wire(this)`
    //           <span class="c-bolt-button__icon">${this.slot(name)}</span>`;
    //       default:
    //         return wire(this)`
    //           <span class="c-bolt-button__item">${this.slot('default')}</span>`;
    //     }
    //   }
    // };

    // const innerSlots = [
    //   slotMarkup('before'),
    //   slotMarkup('default'),
    //   slotMarkup('after'),
    // ];

    // function renderInnerSlots(elementToAppendTo) {
    //   // hyperhtml workaround till lit-html in place
    //   for (var i = 0; i < innerSlots.length; i++) {
    //     const slotValue = innerSlots[i];
    //     if (slotValue !== undefined) {
    //       elementToAppendTo.appendChild(slotValue);
    //     }
    //   }
    //   return elementToAppendTo;
    // }

    if (this.rootElement) {
      tableElement = this.rootElement.firstChild.cloneNode(true);
      // render(inner, tableElement); // lit-html syntax
      tableElement.className += ' ' + classes;
    } else {
      tableElement = wire()`<table class="${classes}"></table>`;
    }

    // tableElement = renderInnerSlots(tableElement);

    console.log(tableElement);

    // ${this.addStyles([styles, visuallyhiddenUtils])}
    return this.html`
      ${tableElement}
    `;
  }
}

export { BoltTable };
