import { define, props } from '@bolt/core/utils';
import classNames from 'classnames/bind';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import styles from './tooltip.scss';

let cx = classNames.bind(styles);

@define
class BoltTooltip extends withLitHtml() {
  static is = 'bolt-tooltip';

  static props = {
    triggerText: {
      ...props.string,
      ...{ default: undefined },
    },
    triggerType: {
      ...props.string,
      ...{ default: undefined },
    },
    triggerTransform: {
      ...props.string,
      ...{ default: undefined },
    },
    triggerIconName: {
      ...props.string,
      ...{ default: undefined },
    },
    triggerIconSize: {
      ...props.string,
      ...{ default: 'medium' },
    },
    triggerToggleText: {
      ...props.string,
      ...{ default: undefined },
    },
    triggerToggleIcon: {
      ...props.string,
      ...{ default: undefined },
    },
    content: props.any,
    noWrap: props.boolean,
    spacing: {
      ...props.string,
      ...{ default: 'small' },
    },
    triggerID: props.string,
    positionVert: {
      ...props.string,
      ...{ default: 'up' },
    },
    count: {
      ...props.string,
      ...{ default: undefined },
    }, // For use ONLY with share
    isOpen: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  constructor(self) {
    self = super(self);
    self.clickHandler = self.clickHandler.bind(self);
    return self;
  }

  connected() {
    this.triggerID = `bolt-tooltip-id-${Math.floor(Math.random() * 20)}`;
  }

  clickHandler() {
    this.isOpen = !this.isOpen;
  }

  }

  setClick() {
    if (this.triggerType === 'button') {
      return html`
        <bolt-tooltip-trigger
          class="${this.isOpen ? 'is-active' : ''} c-bolt-tooltip__trigger"
          aria-describedby=${this.triggerID}
          @click=${this.clickHandler}
        >
          ${this.setTrigger()}
        </bolt-tooltip-trigger>
      `;
    } else {
      return html`
        <bolt-tooltip-trigger
          class="${this.isOpen ? 'is-active' : ''} c-bolt-tooltip__trigger"
          aria-describedby=${this.triggerID}
        >
          ${this.setTrigger()}
        </bolt-tooltip-trigger>
      `;
    }
  }

  setTrigger() {
    if (this.triggerType === 'button') {
      return html`
        <bolt-button
          color="secondary"
          transform="${ifDefined(this.triggerTransform)}"
          >${this.triggerIconName &&
            html`
              <bolt-icon
                name="${this.isOpen
                  ? this.triggerToggleIcon
                  : this.triggerIconName}"
                size="${this.triggerIconSize}"
                slot="before"
              ></bolt-icon>
            `}
          ${this.isOpen
            ? this.triggerToggleText
            : this.triggerText}</bolt-button
        >
      `;
    } else {
      return html`
        ${this.triggerIconName &&
          html`
            <bolt-icon
              name="${this.triggerIconName}"
              size="${this.triggerIconSize}"
              slot="before"
            ></bolt-icon>
          `}
        ${this.triggerText}
      `;
    }
  }

  render() {
    const classes = cx('c-bolt-tooltip is-align-center is-rendered', {
      [`c-bolt-tooltip${
        this.triggerType === 'button' ? `--action` : `--help`
      }`]: this.triggerType,
      [`is-push-${this.positionVert}`]: this.positionVert,
      [`is-open`]: this.isOpen,
      [`c-bolt-tooltip--nowrap`]: this.noWrap,
      [`c-bolt-tooltip--spacing-${this.spacing}`]: this.spacing,
    });

    const contentClasses = cx('c-bolt-tooltip__content', {
      [`c-bolt-tooltip__content--${this.triggerType}`]: this.triggerType,
      [`c-bolt-tooltip__content--${this.count}`]: this.count,
    });

    return html`
      ${this.addStyles([styles])}
      <span class=${classes}>
        ${this.setClick()}
        <bolt-tooltip-content
          id=${ifDefined(this.triggerID)}
          class=${contentClasses}
          role="tooltip"
          aria-hidden="true"
        >
          <span class="c-bolt-tooltip__content-bubble"
            >${this.slot('default')}</span
          >
        </bolt-tooltip-content>
      </span>
    `;
  }
}

export { BoltTooltip };
