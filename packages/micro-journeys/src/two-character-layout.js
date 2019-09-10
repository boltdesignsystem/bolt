import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './two-character-layout.scss';

let cx = classNames.bind(styles);

@define
class BoltTwoCharacterLayout extends withLitHtml() {
  static is = 'bolt-two-character-layout';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    // const {} = this.validateProps(this.props);
    const classes = cx('c-bolt-two-character-layout');

    // const eventChangeActiveStep = new CustomEvent('change-active-step', {
    //   bubbles: true,
    //   detail: {
    //     stepId: this.props.step,
    //   },
    // });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        <div class="c-bolt-two-character-layout__character-row">
          <span
            class="c-bolt-two-character-layout__character c-bolt-two-character-layout__character--left"
          >
            ${this.slot('character--left')}
          </span>
          ${this.slot('connection')}
          <span
            class="c-bolt-two-character-layout__character c-bolt-two-character-layout__character--right"
          >
            ${this.slot('character--right')}
          </span>
        </div>
      </div>
    `;
  }
}

export { BoltTwoCharacterLayout };
