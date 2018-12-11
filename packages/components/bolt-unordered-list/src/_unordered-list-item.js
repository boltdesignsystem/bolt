import { define, props } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './_unordered-list-item.scss';

let cx = classNames.bind(styles);

@define
class BoltUnorderedListItem extends withLitHtml() {
  static is = 'bolt-unordered-list-item';

  static props = {
    last: props.boolean,
  };

  render() {
    const { last } = this.props;

    const itemClasses = cx('c-bolt-unordered-list-item');
    const classes = cx('c-bolt-unordered-list-item__content', {
      [`c-bolt-unordered-list-item--last-item`]: last,
    });

    if (this.slots.default.length > 1) {
      this.slots.default.forEach((item, index) => {
        if (item.tagName) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('c-bolt-unordered-list-item__content');

          if (index === this.slots.default.length - 2) {
            wrapper.classList.add('c-bolt-unordered-list-item-last-item');
          }

          item = item.parentNode.insertBefore(wrapper, item);
        }
      });
    }

    return html`
      ${this.addStyles([styles])}
      <li class="${itemClasses}"><div class="${classes}">${this.slot(
      'default',
    )}</div></li>
    `;
  }
}

export { BoltUnorderedListItem };
