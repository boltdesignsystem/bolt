import { withContext, define, props } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './_list-item.scss';
import { ListContext } from './list';

let cx = classNames.bind(styles);

@define
class BoltListItem extends withContext(withLitHtml()) {
  static is = 'bolt-list-item';

  static props = {
    last: props.boolean,
  };

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [
      [ListContext, 'spacing'],
      [ListContext, 'tag'],
      [ListContext, 'inset'],
      [ListContext, 'separator'],
      [ListContext, 'display'],
      [ListContext, 'align'],
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.context = this.contexts.get(ListContext);
  }

  render() {
    const { tag, spacing, inset, separator, display, align } = this.context;
    const { last } = this.props;

    const classes = cx('c-bolt-list-item', {
      [`c-bolt-list-item--display-${display}`]: display,
      [`c-bolt-list-item--spacing-${spacing}`]: spacing !== 'none',
      [`c-bolt-list-item--separator-${separator}`]: separator !== 'none',
      [`c-bolt-list-item--align-${align}`]: align,
      [`c-bolt-list-item--last-item`]: last,
      [`c-bolt-list-item--inset`]: inset,
    });

    return html`
      ${this.addStyles([styles])}
      ${tag === 'ul' || tag === 'ol'
        ? html`
            <li class="${classes}">${this.slot('default')}</li>
          `
        : html`
            <span class="${classes}">${this.slot('default')} </span>
          `}
    `;
  }
}

export { BoltListItem };
