import { define } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './_ordered-list-item-index.scss';

let cx = classNames.bind(styles);

@define
class BoltOrderedListItemIndex extends withLitHtml() {
  static is = 'bolt-ordered-list-item-index';

  render() {
    const classes = cx('c-bolt-ordered-list-item-index');

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">${this.slot('default')}</div>
    `;
  }
}

export { BoltOrderedListItemIndex };
