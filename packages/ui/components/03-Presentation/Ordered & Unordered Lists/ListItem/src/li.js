import { define, props, mapWithDepth } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './li.scss';

let cx = classNames.bind(styles);

@define
class BoltListItem extends withLitHtml() {
  static is = 'bolt-li';

  static props = {
    last: {
      ...props.boolean,
      ...{ default: false },
    },
    level: {
      ...props.number,
      ...{ default: 0 },
    },
    type: {
      ...props.string,
      ...{ default: 'ul' },
    },
  };

  connected() {
    this.type =
      this.parentNode.tagName === 'BOLT-OL' || this.parentNode.tagName === 'OL'
        ? 'ol'
        : 'ul';
    this.level =
      this.parentNode.level && this.type === 'ul'
        ? this.parentNode.level
        : this.props.level;
  }

  render() {
    const classes = cx('c-bolt-li', {
      [`c-bolt-li--l${this.level}`]: this.level,
      [`c-bolt-li--${this.type}-item`]: this.type,
      [`c-bolt-li--last-item`]: this.last,
      [`c-bolt-li--level-${this.level % 3 !== 0 ? this.level % 3 : 3}`]: this
        .level, // allow up to 3 levels of nested styles before repeating
    });

    // helper function called by the mapWithDepth util to increment the depth of nested children
    function addNestedLevelProps(childNode, depth) {
      childNode.level = depth + 1;
    }

    this.slots.default = this.slots.default.map(
      mapWithDepth(this.level, addNestedLevelProps),
    );

    return html`
      ${this.addStyles([styles])}
      <li class="${classes}">${this.slot('default')}</li>
    `;
  }
}

export { BoltListItem };
