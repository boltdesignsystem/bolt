import { define } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './ordered-list.scss';

let cx = classNames.bind(styles);

@define
class BoltOrderedList extends withLitHtml() {
  static is = 'bolt-ordered-list';

  render() {
    const classes = cx('c-bolt-ordered-list');

    return html`
      ${this.addStyles([styles])}
      <ul class="${classes}">
        ${this.slot('default')}
      </ul>
    `;
  }
}

export { BoltOrderedList };
