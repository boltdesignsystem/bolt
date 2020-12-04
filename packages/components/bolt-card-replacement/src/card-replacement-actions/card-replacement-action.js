import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames/bind';
import styles from './_card-replacement-action.scss';
import schema from '../../card-replacement.schema';

let cx = classNames.bind(styles);

@customElement('bolt-card-replacement-action')
class BoltCardReplacementAction extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    return {
      url: {
        type: String,
      },
      external: {
        type: Boolean,
      },
      spacing: {
        type: String,
      },
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  static get observedContexts() {
    return ['spacing'];
  }

  render() {
    const classes = cx('c-bolt-card_replacement__action');

    return html`
      <div class="${classes}">
        ${this.slotMap.get('default').length === 1 &&
        this.slotMap.get('default')[0].tagName === undefined
          ? html`
              <bolt-button
                color="text"
                width="full"
                align="start"
                url="${ifDefined(this.url ? this.url : undefined)}"
                target="${ifDefined(
                  this.url ? (this.external ? '_blank' : '_self') : undefined,
                )}"
                size="${ifDefined(this.spacing ? this.spacing : undefined)}"
              >
                ${this.slotify('default')}
                <bolt-icon
                  slot="after"
                  name="${this.external ? 'external-link' : 'chevron-right'}"
                ></bolt-icon>
              </bolt-button>
            `
          : html`
              ${this.slotify('default')}
            `}
      </div>
    `;
  }
}

export { BoltCardReplacementAction };
