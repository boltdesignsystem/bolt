import { ifDefined } from 'lit-html/directives/if-defined';
import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import schema from '../card.schema.yml';
import styles from './_card-action.scss';

let cx = classNames.bind(styles);

@define
class BoltCardAction extends withLitHtml() {
  static is = 'bolt-card-action';

  static props = {
    url: props.string, // figure || div
    external: props.boolean,
  };

  render(props) {
    const classes = cx('c-bolt-card__action');
    const { url, external } = this.props;

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        ${this.slots.default.length === 1 &&
        this.slots.default[0].tagName === undefined
          ? html`
              <bolt-button
                color="text"
                width="full"
                align="start"
                url="${ifDefined(url ? url : undefined)}"
                target="${ifDefined(
                  url ? (external ? '_blank' : '_self') : undefined,
                )}"
              >
                ${this.slot('default')}
                <bolt-icon
                  slot="after"
                  name="${external ? 'external-link' : 'chevron-right'}"
                ></bolt-icon>
              </bolt-button>
            `
          : html`
              ${this.slot('default')}
            `}
      </div>
    `;
  }
}

export { BoltCardAction };
