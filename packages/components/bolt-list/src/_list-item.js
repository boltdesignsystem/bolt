import { withContext, define } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './_list-item.scss';
import { ListContext } from './list';

let cx = classNames.bind(styles);

@define
class BoltListItem extends withContext(withLitHtml()) {
  static is = 'bolt-list-item';

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [[ListContext, 'tag']];
  }

  connectedCallback() {
    super.connectedCallback();
    this.context = this.contexts.get(ListContext);
  }

  render() {
    const classes = cx('c-bolt-list__item');
    const { tag } = this.context || 'ul';

    return html`
      ${this.addStyles([styles])}
      ${
        tag === 'ul' || tag === 'ol' 
          ? html`
            <li class="${classes}">
              ${this.slot('default')}
            </li>
          `
          : html `
            <span class="${classes}">
                ${this.slot('default')}
            </span>
          `
      }
    `;
  }
}

export { BoltListItem };
