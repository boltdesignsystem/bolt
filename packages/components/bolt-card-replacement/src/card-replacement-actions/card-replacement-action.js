import { ifDefined } from 'lit-html/directives/if-defined';
import { props, hasNativeShadowDomSupport } from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import { html, customElement } from '@bolt/element';

import schema from '../../card-replacement.schema.yml';
import styles from './_card-replacement-action.scss';

let cx = classNames.bind(styles);

@customElement('bolt-card-replacement-action')
class BoltCardReplacementAction extends withLitHtml {
  static props = {
    url: props.string,
    external: props.boolean,
    spacing: props.string,
  };

  render(props) {
    const classes = cx('c-bolt-card_replacement__action');
    const { url, external, spacing } = this.props;

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
                size="${ifDefined(spacing ? spacing : undefined)}"
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

export { BoltCardReplacementAction };
