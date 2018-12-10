import { define, props } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './_ordered-list-item.scss';

let cx = classNames.bind(styles);

@define
class BoltOrderedListItem extends withLitHtml() {
  static is = 'bolt-ordered-list-item';

  static props = {
    last: props.boolean,
  };

  render() {
    const { last } = this.props;

    const itemClasses = cx('c-bolt-ordered-list-item');
    const classes = cx('c-bolt-ordered-list-item__content', {
      [`c-bolt-ordered-list-item--last-item`]: last,
    });

    if (this.slots.default.length > 1) {
      this.slots.default.forEach((item, index) => {
        if (item.tagName) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('c-bolt-ordered-list-item__content');

          if (index === this.slots.default.length - 2) {
            wrapper.classList.add('c-bolt-ordered-list-item-last-item');
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

export { BoltOrderedListItem };
