import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import classNames from 'classnames/bind';
import styles from './list.scss';
import schema from '../list.schema';

let cx = classNames.bind(styles);

@customElement('bolt-list')
class BoltList extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  static get providedContexts() {
    return {
      align: { property: 'align' },
      display: { property: 'display' },
      inset: { property: 'inset' },
      separator: { property: 'separator' },
      spacing: { property: 'spacing' },
      tag: { property: 'tag' },
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    const classes = cx('c-bolt-list', {
      [`c-bolt-list--align-${this.align}`]: this.align,
      [`c-bolt-list--display-${this.display}`]: this.display,
      [`c-bolt-list--inset`]: this.inset,
      [`c-bolt-list--nowrap`]: this.nowrap,
      [`c-bolt-list--separator-${this.separator}`]: this.separator !== 'none',
      [`c-bolt-list--spacing-${this.spacing}`]: this.spacing !== 'none',
      [`c-bolt-list--valign-${this.valign}`]: this.valign,
    });

    if (this.slotMap.get('default')) {
      const updatedDefaultSlot = this.slotMap
        .get('default')
        .filter(item => item.tagName);
      const updatedSlotsLength = updatedDefaultSlot.length;
      const lastSlotItem = updatedDefaultSlot[updatedDefaultSlot.length - 1];

      if (updatedSlotsLength > 0 && !lastSlotItem.attributes.last) {
        lastSlotItem.setAttribute('last', '');
      }
    }

    let renderedList;

    switch (this.tag) {
      case 'ol':
        renderedList = html`
          <div class="${classes}" role="list">
            ${this.slotify('default')}
          </div>
        `;
        break;
      case 'div':
        renderedList = html`
          <div class="${classes}">${this.slotify('default')}</div>
        `;
        break;
      case 'span':
        renderedList = html`
          <span class="${classes}"> ${this.slotify('default')} </span>
        `;
        break;
      default:
        renderedList = html`
          <div class="${classes}" role="list">
            ${this.slotify('default')}
          </div>
        `;
    }

    return html`
      ${renderedList}
    `;
  }
}

export { BoltList };
