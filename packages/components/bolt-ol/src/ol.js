import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import { mapWithDepth } from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import styles from './ol.scss';
import schema from '../ol.schema';

let cx = classNames.bind(styles);

// list-specific helper function to set nested children's `level` prop automatically
function addNestedLevelProps(childNode, level) {
  let currentLevel = level;

  if (childNode.tagName) {
    childNode.level = currentLevel;
  }

  return currentLevel;
}

@customElement('bolt-ol')
class BoltOrderedList extends BoltElement {
  static schema = schema;

  // static props = {
  //   level: {
  //     ...props.number,
  //     ...{ default: 0 },
  //   },
  // };
  static get properties() {
    return {
      level: { type: Number },
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    let level = this.level;
    let nested = false;

    if (this.parentNode.tagName) {
      if (
        this.parentNode.tagName === 'BOLT-LI' &&
        this.parentNode.parentNode.tagName === 'BOLT-OL'
      ) {
        level = this.parentNode.level - 1;
      } else {
        level = this.parentNode.level;
      }

      if (this.parentNode.tagName === 'BOLT-LI') {
        nested = true;
      }
    }

    const classes = cx('c-bolt-ol', {
      [`c-bolt-ol--nested`]: nested,
    });

    this.slotMap.get('default').map(mapWithDepth(level, addNestedLevelProps));

    if (this.slotMap.get('default')) {
      const updatedDefaultSlot = this.slotMap
        .get('default')
        .filter(item => item.tagName);
      const updatedSlotsLength = updatedDefaultSlot.length;
      const lastSlotItem = updatedDefaultSlot[updatedSlotsLength - 1];

      if (updatedSlotsLength > 0 && !lastSlotItem.attributes.last) {
        lastSlotItem.setAttribute('last', '');
      }
    }

    return html`
      <div class="${classes}" role="list">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltOrderedList };
