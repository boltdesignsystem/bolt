import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import classNames from 'classnames/bind';
import { withContext } from 'wc-context';
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
      align: { align: schema.properties.align.default },
      display: { value: schema.properties.display.default },
      inset: { inset: schema.properties.inset.default },
      separator: { separator: schema.properties.separator.default },
      spacing: { value: schema.properties.spacing.default },
      tag: { tag: schema.properties.tag.default },
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    const align = this.align || schema.properties.align.default;
    const display = this.display || schema.properties.display.default;
    const inset = this.inset || schema.properties.inset.default;
    const nowrap = this.nowrap || schema.properties.nowrap.default;
    const separator = this.separator || schema.properties.separator.default;
    const spacing = this.spacing || schema.properties.spacing.default;
    const tag = this.tag || schema.properties.tag.default;
    const valign = this.valign || schema.properties.valign.default;

    this.updateProvidedContext('align', align);
    this.updateProvidedContext('display', display);
    this.updateProvidedContext('inset', inset);
    this.updateProvidedContext('separator', separator);
    this.updateProvidedContext('spacing', spacing);
    this.updateProvidedContext('tag', tag);

    const classes = cx('c-bolt-list', {
      [`c-bolt-list--align-${align}`]: align,
      [`c-bolt-list--display-${display}`]: display,
      [`c-bolt-list--inset`]: inset,
      [`c-bolt-list--nowrap`]: nowrap,
      [`c-bolt-list--separator-${separator}`]: separator !== 'none',
      [`c-bolt-list--spacing-${spacing}`]: spacing !== 'none',
      [`c-bolt-list--valign-${valign}`]: valign,
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
