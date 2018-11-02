import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import schema from '../card.schema.yml';
import styles from './card-body.scss';

let cx = classNames.bind(styles);

@define
class BoltCardBody extends withLitHtml() {
  static is = 'bolt-card-body';

  static props = {
    tag: props.string, // figure || div
  };

  render() {
    const classes = cx('c-bolt-card__body');

    return html`
      ${this.addStyles([styles])}
      ${
        this.props.tag === 'figure'
          ? html`
          <figure class=${classes}>
            ${this.slot('default')}
          </figure>`
          : html`
          <div class=${classes}>
            ${this.slot('default')}
          </div>`
      }
    `;
  }
}

export { BoltCardBody };
