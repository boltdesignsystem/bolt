import { html, customElement, BoltElement, ifDefined } from '@bolt/element';
import {
  defineContext,
  withContext,
  props,
  define,
  hasNativeShadowDomSupport,
} from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';

import themes from '@bolt/global/styles/06-themes/_themes.all.scss';
import styles from './list.scss';
import schema from '../list.schema';

let cx = classNames.bind(styles);

// define which specific props to provide to children that subscribe
export const ListContext = defineContext({
  tag: 'ul',
  display: 'inline',
  spacing: 'none',
  inset: false,
  nowrap: false,
  align: 'start',
  separator: 'none',
});

@customElement('bolt-list')
class BoltList extends withContext(BoltElement) {
  static schema = schema;

  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get provides() {
    return [ListContext];
  }

  static get properties() {
    return {
      ...this.props,
    };
  }

  render() {
    this.contexts.get(ListContext).tag =
      this.tag || schema.properties.tag.default;
    this.contexts.get(ListContext).display =
      this.display || schema.properties.display.default;
    this.contexts.get(ListContext).spacing =
      this.spacing || schema.properties.spacing.default;
    this.contexts.get(ListContext).inset =
      this.inset || schema.properties.inset.default;
    this.contexts.get(ListContext).nowrap =
      this.nowrap || schema.properties.nowrap.default;
    this.contexts.get(ListContext).align =
      this.align || schema.properties.align.default;
    this.contexts.get(ListContext).valign =
      this.valign || schema.properties.valign.default;
    this.contexts.get(ListContext).separator =
      this.separator || schema.properties.separator.default;

    const classes = cx('c-bolt-list', {
      [`c-bolt-list--display-${this.display}`]: this.display,
      [`c-bolt-list--spacing-${this.spacing}`]: this.spacing !== 'none',
      [`c-bolt-list--separator-${this.separator}`]: this.separator !== 'none',
      [`c-bolt-list--align-${this.align}`]: this.align,
      [`c-bolt-list--valign-${this.valign}`]: this.valign,
      [`c-bolt-list--inset`]: this.inset,
      [`c-bolt-list--nowrap`]: this.nowrap,
    });

    if (this.slotMap?.get('default')) {
      const updatedDefaultSlot = this.slotMap
        ?.get('default')
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
