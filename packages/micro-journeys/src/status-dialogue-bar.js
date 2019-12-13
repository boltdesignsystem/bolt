import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html, convertSchemaToProps } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './status-dialogue-bar.scss';
import schema from './status-dialogue-bar.schema';

let cx = classNames.bind(styles);

@define
class BoltStatusDialogueBar extends withLitHtml() {
  static is = 'bolt-status-dialogue-bar';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    ...convertSchemaToProps(schema),
  };

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const props = this.validateProps(this.props);
    const hasArrow = !!(
      props.dialogueArrowDirection && props.dialogueArrowDirection !== 'none'
    );
    const classes = cx('c-bolt-status-dialogue-bar', {
      [`c-bolt-status-dialogue-bar--alert`]: props.isAlertMessage,
      [`c-bolt-status-dialogue-bar--has-arrow c-bolt-status-dialogue-bar--arrow--${props.dialogueArrowDirection}`]: hasArrow,
    });
    const triangle = (direction => {
      switch (direction) {
        case 'right':
          return '▶';
        case 'left':
          return '◀';
        case 'up':
          return '▲';
        case 'down':
          return '▼';
        default:
          return '';
      }
    })(props.dialogueArrowDirection);

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        ${hasArrow
          ? html`
              <span class="c-bolt-status-dialogue-bar--arrow" aria-hidden="true"
                >${triangle}</span
              >
            `
          : ''}
        <div class="c-bolt-status-dialogue-bar__content">
          ${!props.iconName || props.iconName === '-none-'
            ? ''
            : html`
                <div class="c-bolt-micro-journeys-flex-aspect">
                  <bolt-icon
                    size="medium"
                    name="${props.iconName}"
                    class="c-bolt-status-dialogue-bar__icon"
                  />
                </div>
              `}
          <span class="c-bolt-status-dialogue-bar__slot--text">
            <div
              class="c-bolt-micro-journeys-flex-aspect c-bolt-micro-journeys-flex-aspect-full"
            >
              ${this.slot('text')}
            </div>
          </span>
        </div>
      </div>
    `;
  }
}

export { BoltStatusDialogueBar };
