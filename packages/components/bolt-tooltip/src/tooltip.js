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
      wrap: {
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
  }

  static get styles() {
    return [unsafeCSS(tooltipStyles)];
  }

  render() {
    // @todo: automatic schema validation?
    const placement = this.placement || schema.properties.placement.default;
    const wrap = this.wrap || schema.properties.wrap.default;
    const uuid = this.uuid || Math.floor(10000 + Math.random() * 90000);

    const classes = cx('c-bolt-tooltip', {
      [`c-bolt-tooltip--${placement}`]: placement,
      [`c-bolt-tooltip--wrap`]: wrap,
    });

    return html`
      <span class="${classes}">
        ${this.templateMap.get('default') &&
          html`
            <bolt-trigger
              aria-describedby="js-bolt-tooltip-${uuid}"
              aria-controls="js-bolt-tooltip-${uuid}"
              aria-expanded=false>
              ${this.slotify('default')}
            </bolt-trigger>
          `}
        ${this.templateMap.get('content') &&
          html`
            <span id="js-bolt-tooltip-${uuid}" class="${cx(`c-bolt-tooltip__content`)}" role="tooltip" aria-hidden="true">
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
