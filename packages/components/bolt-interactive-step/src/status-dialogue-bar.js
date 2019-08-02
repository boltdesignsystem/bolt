import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './status-dialogue-bar.scss';

let cx = classNames.bind(styles);

@define
class BoltStatusDialogueBar extends withLitHtml() {
  static is = 'bolt-status-dialogue-bar';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    hasIcon: {
      ...props.boolean,
      ...{
        default: false,
      },
    },
    isAlertMessage: {
      ...props.boolean,
      ...{
        default: false,
      },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const { hasIcon, isAlertMessage } = this.validateProps(this.props);
    const classes = cx('c-bolt-status-dialogue-bar', {
      [`c-bolt-status-dialogue-bar--alert`]: isAlertMessage,
      't-bolt-dark': isAlertMessage,
    });

    console.log("Hey super smart dev, check this out -> ", { isAlertMessage });

    console.log("Hey super smart dev, check this out -> ", { hasIcon });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        ${hasIcon
          ? html`
              <span class="c-bolt-status-dialogue-bar__slot--icon">
                ${this.slot('icon')}
              </span>
            `
          : ''}
        <span class="c-bolt-status-dialogue-bar__slot--text">
          ${this.slot('text')}
        </span>
      </div>
    `;
  }
}

export { BoltStatusDialogueBar };
