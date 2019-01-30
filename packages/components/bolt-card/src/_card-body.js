import { withContext, define } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import styles from './_card-body.scss';
import { CardContext } from './card';

let cx = classNames.bind(styles);

@define
class BoltCardBody extends withContext(withLitHtml()) {
  static is = 'bolt-card-body';

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [[CardContext, 'tag']];
  }

  connectedCallback() {
    super.connectedCallback();
    this.context = this.contexts.get(CardContext);
  }

  render() {
    const classes = cx('c-bolt-card__body');
    const { tag } = this.context || 'div'; // fallback if the `tag` context isn't available for some reason

    return html`
      ${this.addStyles([styles])}
      ${tag === 'figure'
        ? html`
            <figcaption class="${classes}">
              ${this.slot('default')}
            </figcaption>
          `
        : html`
            <div class="${classes}">${this.slot('default')}</div>
          `}
    `;
  }
}

export { BoltCardBody };
