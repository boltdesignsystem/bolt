import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
// import styles from './ul.scss';
import schema from '../ul.schema';

let cx = classNames.bind(styles);

@customElement('bolt-ul')
class BoltUnorderedList extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      level: { type: Number },
      nested: { type: Boolean },
    };
  }

  // static get styles() {
  //   return [unsafeCSS(styles)];
  // }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    this.level = 1;
    this.setLevel();
  }

  async setLevel() {
    // Check if this is a nested list and set level accordingly.
    const closestList = this.parentNode.closest('bolt-ul, bolt-ol');
    const closestListItem = this.parentNode.closest('bolt-li');
    if (closestList && closestListItem) {
      // Wait for closest LI to be ready. Then check if grandparent is UL.
      // If we don't wait for LI to be ready, parentNode is sometimes "ssr-keep".
      // We must be sure UL is parent of LI. Otherwise do not increment the level.
      await closestListItem.updateComplete;
      const parentList = this.parentNode.parentNode;
      if (
        parentList.tagName === 'BOLT-UL' ||
        parentList.tagName === 'BOLT-OL'
      ) {
        this.nested = true;
        if (parentList.tagName === 'BOLT-UL' && parentList.level) {
          this.level = parentList.level + 1;
        }
      }
    }
  }

  updated(changedProperties) {
    super.update && super.update(changedProperties);

    if (changedProperties.get('level')) {
      this.updateListItems();
    }
  }

  updateListItems() {
    if (this.slotMap.get('default')) {
      const slottedListItems = this.slotMap
        .get('default')
        .filter(item => item.tagName && item.tagName === 'BOLT-LI');

      if (slottedListItems.length) {
        slottedListItems.forEach(async item => {
          // This can run before `bolt-li` is has initially rendered. So, wait for updateComplete.
          await item.updateComplete;
          item.level = this.level;
        });

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
    const classes = cx('c-bolt-ul', {
      [`c-bolt-ul--l${this.level}`]: this.level,
      [`c-bolt-ul--level-${this.level}`]: this.level,
      [`c-bolt-ul--nested`]: this.nested,
    });

    return html`
      <div class="${classes}" role="list">
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltUnorderedList };
