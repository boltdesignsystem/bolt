import { define, props } from '@bolt/core/utils';
import { h, withPreact } from '@bolt/core/renderers';
import classNames from 'classnames/bind';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import button from '@bolt/components-button/src/button.scss';
import colorUtils from '@bolt/global/styles/07-utilities/_utilities-colors.scss';
import styles from './tooltip.scss';

let cx = classNames.bind(styles);

@define
class BoltTooltip extends withLitHtml() {
  static is = 'bolt-tooltip';

  static props = {
    triggerText: props.string,
    triggerType: props.string,
    triggerTransform: props.string,
    triggerIconName: props.string,
    triggerIconSize: {
      ...props.string,
      ...{ default: 'medium' },
    },
    triggerToggleText: props.string,
    triggerToggleIcon: props.string,
    content: props.any,
    noWrap: props.boolean,
    spacing: {
      ...props.string,
      ...{ default: 'small' },
    },
    positionVert: {
      ...props.string,
      ...{ default: 'up' },
    },
    count: props.string, // For use ONLY with share
  };

  constructor(self) {
    self = super(self);
    self.useShadow = false; // @todo: Get this working with shadowDOM + slots
    return self;
  }

  connected() {
    this.triggerID = `bolt-tooltip-id-${Math.floor(Math.random() * 20)}`;
  }

  render() {
    const classes = cx('c-bolt-tooltip is-align-center', {
      [`c-bolt-tooltip${
        this.triggerType === 'button' ? `--action` : `--help`
      }`]: this.triggerType,
      [`is-push-${this.positionVert}`]: this.positionVert,
      [`c-bolt-tooltip--nowrap`]: this.noWrap,
      [`c-bolt-tooltip--spacing-${this.spacing}`]: this.spacing,
    });

    const triggerClasses = cx(
      'c-bolt-button c-bolt-button--rounded c-bolt-button--medium c-bolt-button--secondary c-bolt-button--center u-bolt-color-orange',
      { [`c-bolt-button--${this.triggerTransform}`]: this.triggerTransform },
    );

    const contentClasses = cx('c-bolt-tooltip__content', {
      [`c-bolt-tooltip__content--${this.trigger}`]: this.trigger,
      [`c-bolt-tooltip__content--${this.count}`]: this.count,
    });

    function setIcon(iconName, iconSize, iconText) {
      if (iconName) {
        return html`
          <span class="c-bolt-button__icon">
            <bolt-icon name="${iconName}" size="${iconSize}" />
          </span>
          ${iconText}
        `;
      }
    }

    function setTrigger(data) {
      if (data.triggerType === 'button') {
        return html`
          <button class=${triggerClasses}>
            <div class="toggle--closed">
              ${setIcon(
                data.triggerIconName,
                data.triggerIconSize,
                data.triggerText,
              )}
            </div>
            <div class="toggle--open">
              ${setIcon(
                data.triggerToggleIcon,
                data.triggerIconSize,
                data.triggerToggleText,
              )}
            </div>
          </button>
        `;
      } else {
        return html`
          ${setIcon(
            data.triggerIconName,
            data.triggerIconSize,
            data.triggerText,
          )}
        `;
      }
    }

    function clickHandler(e) {
      this.parentNode.parentNode.classList.toggle('is-active');
    }

    function setClick(data) {
      if (data.triggerType === 'button') {
        return html`
          <span
            class="c-bolt-tooltip__trigger"
            aria-describedby=${data.triggerID}
            @click=${clickHandler}
          >
            ${setTrigger(data)}
          </span>
        `;
      } else {
        return html`
          <span
            class="c-bolt-tooltip__trigger"
            aria-describedby=${data.triggerID}
          >
            ${setTrigger(data)}
          </span>
        `;
      }
    }

    const triggerMarkup = html`
      <span>
        ${setClick(this.props)}
      </span>
    `;

    const tooltipMarkup = html`
      <span>
        <span class=${classes}>
          <tooltip-trigger
            text=${this.triggerText}
            trigger=${this.triggerType}
            transform=${this.triggerTransform}
            icon=${this.triggerIconName}
            size=${this.triggerIconSize}
            toggle-text=${this.triggerToggleText}
            toggle-icon=${this.triggerToggleIcon}
            trigger-id="${this.triggerID}"
          >
            ${triggerMarkup}
          </tooltip-trigger>
          <span
            id=${ifDefined(this.triggerID)}
            class=${contentClasses}
            role="tooltip"
            aria-hidden="true"
          >
            <span class="c-bolt-tooltip__content-bubble">${this.content}</span>
          </span>
        </span>
      </span>
    `;

    return html`
      ${this.addStyles([styles])} ${tooltipMarkup}
    `;
  }
}

export { BoltTooltip };
