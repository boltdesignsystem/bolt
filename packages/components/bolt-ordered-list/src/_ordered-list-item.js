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

    const classes = cx('c-bolt-ordered-list-item', {
      [`c-bolt-ordered-list-item--last-item`]: last,
    });

    return html`
      ${this.addStyles([styles])}
      <li class="${classes}">${this.slot('default')}</li>
    `;
  }
}

export { BoltOrderedListItem };
