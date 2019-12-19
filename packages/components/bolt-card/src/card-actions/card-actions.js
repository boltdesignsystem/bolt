import {
  props,
  define,
  hasNativeShadowDomSupport,
} from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import { customElement, html } from '@bolt/element';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import styles from './_card-actions.scss';

let cx = classNames.bind(styles);

@customElement('bolt-card-actions')
class BoltCardActions extends withLitHtml {
  render() {
    const classes = cx('c-bolt-card__actions');

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">${this.slot('default')}</div>
    `;
  }
}

export { BoltCardActions };
