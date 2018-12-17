import { props, define } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

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

// ported from https://github.com/rexxars/react-refractor/blob/master/src/mapChildren.js
/**
 * Utility function to help recursively process over nested DOM nodes, slotted content, or an AST tree
 * @param {number} depth - the level of depth of the AST tree being transformed
 * @returns {any} - returns the react-renderable bit of DOM
 */
export function mapWithDepth(depth, cb) {
  return function mapChildrenWithDepth(child) {
    // eslint-disable-next-line no-use-before-define
    return mapChild(child, depth, cb);
  };
}

// /**
//  * Utility function to help render a specific AST tree child into the VDOM
//  * @param {any} child - the AST tree child being converted
//  * @param {number} i - the index of the AST child?
//  * @param {number} depth - depth of the current AST tree child?
//  * @returns {any} - returns the child element of the AST tree being react-renderable
//  */
export function mapChild(child, level, cb) {
  // if (child.tagName) {
  let currentLevel = level;
  // const className =
  //   child.properties && Array.isArray(child.properties.className)
  //     ? child.properties.className.join(' ')
  //     : child.properties.className;

  if (cb) {
    cb(child, level);
  }

  // if (child.slots) {
  //   child.slots.default.map(mapWithDepth(currentLevel, cb));
  // } else if (child.children) {
  //   child.children.map(mapWithDepth(currentLevel, cb));
  // }
  // child.slots.defaultchildren && child.children.map(mapWithDepth(depth + 1));

  // return child;

  // return React.createElement(
  //   child.tagName,
  //   Object.assign({ key: `fract-${depth}-${i}` }, child.properties, {
  //     className,
  //   }),
  //   child.children && child.children.map(mapWithDepth(depth + 1)),
  // );
  // }

  return child;
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
