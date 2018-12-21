import { props, define, mapWithDepth } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './ul.scss';

let cx = classNames.bind(styles);

// list-specific helper function to set nested children's `level` prop automatically
function addNestedLevelProps(childNode, level) {
  let currentLevel = level;

  if (childNode.tagName) {
    childNode.level = currentLevel;
  }

  return currentLevel;
}

@define
class BoltUnorderedList extends withLitHtml() {
  static is = 'bolt-ul';

  static props = {
    last: props.boolean,
    level: {
      ...props.number,
      ...{ default: 1 },
    },
  };

  render() {
    let level = this.level;

    if (this.parentNode.tagName) {
      console.log(this.parentNode.level);
      if (this.parentNode.tagName === 'BOLT-LI' && this.parentNode.level) {
        level = this.parentNode.level + 1;
      }
    }

    const classes = cx('c-bolt-ul', {
      [`c-bolt-ul--l${level}`]: level,
      [`c-bolt-ul--level-${level}`]: level,
    });

    this.slots.default.map(mapWithDepth(level, addNestedLevelProps));

    return html`
      ${this.addStyles([styles])}
      <ul class="${classes}">
        ${this.slot('default')}
      </ul>
    `;
  }
}

export { BoltUnorderedList };
