import { supportsCSSVars } from '@bolt/core/utils';
import classNames from 'classnames/dedupe';
import {
  customElement,
  BoltElement,
  html,
  styleMap,
  unsafeCSS,
} from '@bolt/element';
import tooltipStyles from './tooltip.scss';
import schema from '../tooltip.schema';

let cx = classNames.bind(tooltipStyles);

@customElement('bolt-tooltip')
class BoltTooltip extends BoltElement {
  static get properties() {
    return {
      placement: String,
      open: {
        type: Boolean,
        reflect: true,
      },
      uuid: String,
      noCssVars: {
        type: Boolean,
        attribute: 'no-css-vars',
      },
    };
  }

  constructor() {
    super();
    this.noCssVars = supportsCSSVars ? false : true;
    this.open = false;
    this.uuid = this.uuid || Math.floor(10000 + Math.random() * 90000);
  }

  static get styles() {
    return [unsafeCSS(tooltipStyles)];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.setAttribute('ready', '');
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeAttribute('ready');
  }

  render() {
    // @todo: automatic schema validation?
    const placement = this.placement || schema.properties.placement.default;
    const textContent =
      this.templateMap.get('content') &&
      this.templateMap.get('content')[0].textContent.trim();

    const classes = cx('c-bolt-tooltip', {
      [`is-expanded`]: this.open,
      [`c-bolt-tooltip--${placement}`]: placement,
      [`c-bolt-tooltip--text-wrap`]: textContent && textContent.length > 31,
      [`c-bolt-tooltip--text-align-center`]:
        textContent && textContent.length > 31 && textContent.length < 62,
    });

    const tooltipOpen = () => {
      this.open = true;
    };
    const tooltipClosed = () => {
      this.open = false;
    };

    return html`
      <span
        class="${classes}"
        @mouseover="${tooltipOpen}"
        @mouseout="${tooltipClosed}"
        @focusin="${tooltipOpen}"
        @focusout="${tooltipClosed}"
      >
        <bolt-trigger
          aria-describedby="js-bolt-tooltip-${this.uuid}"
          aria-controls="js-bolt-tooltip-${this.uuid}"
          aria-expanded="${this.open}"
        >
          ${this.slotify('default')}
        </bolt-trigger>
        ${this.templateMap.get('content') &&
          html`
            <span
              id="js-bolt-tooltip-${this.uuid}"
              class="${cx(`c-bolt-tooltip__content`)}"
              role="tooltip"
              aria-hidden="${!this.open}"
            >
              <span class="${cx(`c-bolt-tooltip__bubble`)}">
                ${this.slotify('content')}
              </span>
            </span>
          `}
      </span>
    `;
  }
}

export { BoltTooltip };
