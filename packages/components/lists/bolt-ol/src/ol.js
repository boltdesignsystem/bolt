import { define } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './ol.scss';

let cx = classNames.bind(styles);

@define
class BoltOrderedList extends withLitHtml() {
  static is = 'bolt-ol';

  render() {
    const classes = cx('c-bolt-ol');

    if (this.slots.default) {
      const updatedDefaultSlot = [];

      this.slots.default.forEach(item => {
        if (item.tagName) {
          updatedDefaultSlot.push(item);
        }
      });

      if (
        updatedDefaultSlot[updatedDefaultSlot.length - 1].attributes.length ===
        0
      ) {
        updatedDefaultSlot[updatedDefaultSlot.length - 1].setAttribute(
          'last',
          '',
        );
      }
    }

    return html`
      ${this.addStyles([styles])}
      <ul class="${classes}">
        ${this.slot('default')}
      </ul>
    `;
  }
}

export { BoltOrderedList };
