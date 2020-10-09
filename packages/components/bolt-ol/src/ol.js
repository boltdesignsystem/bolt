import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import styles from './ol.scss';
import schema from '../ol.schema';

let cx = classNames.bind(styles);

@customElement('bolt-ol')
class BoltOrderedList extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      level: { type: Number },
      nested: { type: Boolean },
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    this.level = 1;
    this.setNested();
  }

  async setNested() {
    // Check if this is a nested list and set level accordingly.
    const closestList = this.parentNode.closest('bolt-ol, bolt-ul');
    const closestListItem = this.parentNode.closest('bolt-li');
    if (closestList && closestListItem) {
      // Wait for closest LI to be ready. Then check if grandparent is OL/UL.
      // If we don't wait for LI to be ready, parentNode is sometimes "ssr-keep".
      // We must be sure OL/UL is parent of LI. Otherwise do not mark as nested.
      await closestListItem.updateComplete;
      const parentList = this.parentNode.parentNode;
      if (
        parentList.tagName === 'BOLT-OL' ||
        parentList.tagName === 'BOLT-UL'
      ) {
        this.nested = true;
      }
    }
  }

  updateListItems() {
    if (this.slotMap.get('default')) {
      const slottedListItems = this.slotMap
        .get('default')
        .filter(item => item.tagName && item.tagName === 'BOLT-LI');

      if (slottedListItems.length) {
        const lastItem = slottedListItems[slottedListItems.length - 1];

        if (!lastItem.attributes.last) {
          lastItem.setAttribute('last', '');
        }
      }
    }
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();
    this.updateListItems();
  }

  render() {
    const classes = cx('c-bolt-ol', {
      [`c-bolt-ol--nested`]: this.nested,
    });

    return html`
      <div class="${classes}" role="list">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltOrderedList };
