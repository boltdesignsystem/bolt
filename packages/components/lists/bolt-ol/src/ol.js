import { props, define, mapWithDepth } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './ol.scss';

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
class BoltOrderedList extends withLitHtml() {
  static is = 'bolt-ol';

  // static props = {
  //   last: props.boolean,
  //   level: {
  //     ...props.number,
  //     ...{ default: 1 },
  //   },
  // };

  render() {
    // let level = this.level;
    //
    // if (this.parentNode.tagName) {
    //   console.log(this.parentNode.level);
    //   if (this.parentNode.tagName === 'BOLT-LI' && this.parentNode.level) {
    //     level = this.parentNode.level + 1;
    //   }
    // }

    // const classes = cx('c-bolt-ol', {
    //   [`c-bolt-ol--l${level}`]: level,
    //   [`c-bolt-ol--level-${level}`]: level,
    // });

    const classes = cx('c-bolt-ol');

    // this.slots.default.map(mapWithDepth(level, addNestedLevelProps));

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
      <ol class="${classes}">
        ${this.slot('default')}
      </ol>
    `;
  }
}

export { BoltOrderedList };
