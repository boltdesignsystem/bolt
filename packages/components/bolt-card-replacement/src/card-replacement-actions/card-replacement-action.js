import { unsafeCSS, BoltElement, customElement, html } from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames/bind';
import styles from './_card-replacement-action.scss';
import buttonStyles from '../../../../elements/bolt-button/src/button.scss';
import globalStyles from '../../../../global/styles/03-generic/_generic-global.scss';

let cx = classNames.bind(styles);

@customElement('bolt-card-replacement-action')
class BoltCardReplacementAction extends withContext(BoltElement) {
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
      icon: {
        type: String,
      },
    };
  }

  static get styles() {
    return [
      unsafeCSS(styles),
      unsafeCSS(buttonStyles),
      unsafeCSS(globalStyles),
    ];
  }

  static get observedContexts() {
    return ['spacing'];
  }

  render() {
    const classes = cx('c-bolt-card_replacement__action');
    const buttonClasses = cx(
      'e-bolt-button',
      'e-bolt-button--transparent',
      'e-bolt-button--block',
      {
        [`e-bolt-button--${this.spacing}`]:
          this.spacing && this.spacing !== 'none',
      },
    );

    return html`
      <div class="${classes}">
        ${this.slotMap.get('default').length === 1 &&
        this.slotMap.get('default')[0].tagName === undefined
          ? html`
              <a
                class="${buttonClasses}"
                href="${ifDefined(this.url ? this.url : undefined)}"
                target="${ifDefined(
                  this.url ? (this.external ? '_blank' : '_self') : undefined,
                )}"
              >
                ${this.slotify('default')}
                ${this.icon !== 'none'
                  ? // prettier-ignore
                    html`
                      <span class="e-bolt-button__icon-after"><bolt-icon
                        name="${this.icon
                          ? this.icon
                          : this.external
                          ? 'external-link'
                          : 'chevron-right'}"
                        aria-hidden="true"></bolt-icon></span>
                    `
                  : ''}
              </a>
            `
          : html`
              ${this.slotify('default')}
            `}
      </div>
    `;
  }
}

export { BoltCardReplacementAction };
