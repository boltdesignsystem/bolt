import {
  unsafeCSS,
  unsafeHTML,
  BoltElement,
  customElement,
  html,
} from '@bolt/element';
import { withContext } from 'wc-context/lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { iconChevronRight } from '@bolt/elements-icon/src/icons/js/chevron-right';
import { iconExternalLink } from '@bolt/elements-icon/src/icons/js/external-link';
import classNames from 'classnames/bind';
import globalStyles from '@bolt/global/styles/03-generic/_generic-global.scss';
import iconStyles from '@bolt/elements-icon/index.scss';
import buttonStyles from '@bolt/elements-button/src/button.scss';
import styles from './_card-replacement-action.scss';

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
      unsafeCSS(globalStyles),
      unsafeCSS(iconStyles),
      unsafeCSS(buttonStyles),
      unsafeCSS(styles),
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
    let renderedIcon;

    if (this.slotMap.get('icon')) {
      renderedIcon = this.slotify('icon');
    } else if (this.external) {
      renderedIcon = unsafeHTML(iconExternalLink());
    } else if (this.icon !== 'none') {
      renderedIcon = unsafeHTML(iconChevronRight());
    }

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
                ${ifDefined(this.external ? 'rel="noopener"' : undefined)}
              >
                ${this.slotify('default')}${renderedIcon
                  ? // prettier-ignore
                    html`<span class="e-bolt-button__icon-after">${renderedIcon}</span>`
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
