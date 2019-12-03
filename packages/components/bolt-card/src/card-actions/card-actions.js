import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import styles from './_card-actions.scss';

let cx = classNames.bind(styles);

@define
class BoltCardActions extends withLitHtml() {
  static is = 'bolt-card-actions';

  render() {
    const classes = cx('c-bolt-card__actions');

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">${this.slot('default')}</div>
    `;
  }
}

export { BoltCardActions };
