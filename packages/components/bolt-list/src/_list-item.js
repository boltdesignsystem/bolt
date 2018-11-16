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
    return [[ListContext, ['tag', 'spacing', 'inset', 'separator', 'display']]];
  }

  connectedCallback() {
    super.connectedCallback();
    this.context = this.contexts.get(ListContext);
  }

  render() {
    const { tag, spacing, inset, separator, display } = this.context;
    const { last } = this.props;

    const classes = cx('c-bolt-list-item', {
      [`c-bolt-list-item--display-${display}`]: display,
      [`c-bolt-list-item--spacing-${spacing}`]: spacing,
      [`c-bolt-list-item--inset`]: inset,
      [`c-bolt-list-item--separator-${separator}`]: separator && !last,
    });

    return html`
      ${this.addStyles([styles])}
      ${
        tag === 'ul' || tag === 'ol'
          ? html`
              <li class="${classes}">${this.slot('default')}</li>
            `
          : html`
              <span class="${classes}"> ${this.slot('default')} </span>
            `
      }
    `;
  }
}

export { BoltListItem };
