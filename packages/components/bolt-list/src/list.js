import { html, customElement } from '@bolt/element';
import {
  defineContext,
  withContext,
  props,
  define,
  hasNativeShadowDomSupport,
} from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';

import themes from '@bolt/global/styles/06-themes/_themes.wc.scss';
import styles from './list.scss';
import schema from '../list.schema.yml';

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
class BoltList extends withContext(withLitHtml) {
  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get provides() {
    return [ListContext];
  }

  static props = {
    tag: props.string, // ul | ol | div | span
    display: props.string, // inline | block | flex | inline@xxsmall | inline@xsmall | inline@small | inline@medium
    spacing: props.string, // none | xsmall | small | medium | large | xlarge
    separator: props.string, // none | solid | dashed
    inset: props.boolean, // true | false
    nowrap: props.boolean, // true | false
    align: props.string, // start | center | end
    valign: props.string, // start | center | end
  };

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    this.schema = schema;
    return self;
  }

  render() {
    const {
      tag,
      display,
      spacing,
      separator,
      inset,
      nowrap,
      align,
      valign,
    } = this.validateProps(this.props);
    this.contexts.get(ListContext).tag = tag || this.props.tag;
    this.contexts.get(ListContext).display = display || this.props.display;
    this.contexts.get(ListContext).spacing = spacing || this.props.spacing;
    this.contexts.get(ListContext).inset = inset || this.props.inset;
    this.contexts.get(ListContext).nowrap = nowrap || this.props.nowrap;
    this.contexts.get(ListContext).align = align || this.props.align;
    this.contexts.get(ListContext).separator =
      separator || this.props.separator;

    const classes = cx('c-bolt-list', {
      [`c-bolt-list--display-${display}`]: display,
      [`c-bolt-list--spacing-${spacing}`]: spacing !== 'none',
      [`c-bolt-list--separator-${separator}`]: separator !== 'none',
      [`c-bolt-list--align-${align}`]: align,
      [`c-bolt-list--valign-${valign}`]: valign,
      [`c-bolt-list--inset`]: inset,
      [`c-bolt-list--nowrap`]: nowrap,
    });

    if (this.slots.default) {
      const updatedDefaultSlot = this.slots.default.filter(
        (item) => item.tagName,
      );
      const updatedSlotsLength = updatedDefaultSlot.length;
      const lastSlotItem = updatedDefaultSlot[updatedDefaultSlot.length - 1];

      if (updatedSlotsLength > 0 && !lastSlotItem.attributes.last) {
        lastSlotItem.setAttribute('last', '');
      }
    }

    let renderedList;

    switch (tag) {
      case 'ol':
        renderedList = html`
          <ol class="${classes}">
            ${this.slot('default')}
          </ol>
        `;
        break;
      case 'div':
        renderedList = html`
          <div class="${classes}">${this.slot('default')}</div>
        `;
        break;
      case 'span':
        renderedList = html`
          <span class="${classes}"> ${this.slot('default')} </span>
        `;
        break;
      default:
        renderedList = html`
          <ul class="${classes}">
            ${this.slot('default')}
          </ul>
        `;
    }

    return html` ${this.addStyles([styles, themes])} ${renderedList} `;
  }
}

export { BoltList };
