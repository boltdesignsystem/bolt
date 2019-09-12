import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './three-character-layout.scss';

let cx = classNames.bind(styles);

@define
class BoltThreeCharacterLayout extends withLitHtml() {
  static is = 'bolt-three-character-layout';

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
    const classes = cx('c-bolt-three-character-layout');

    // const eventChangeActiveStep = new CustomEvent('change-active-step', {
    //   bubbles: true,
    //   detail: {
    //     stepId: this.props.step,
    //   },
    // });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        <div class="c-bolt-three-character-layout__character-row">
          <span
            class="c-bolt-three-character-layout__character c-bolt-three-character-layout__character--left"
          >
            ${this.slot('character--left')}
          </span>
          ${this.slot('connection-one')}
          <span
            class="c-bolt-three-character-layout__character c-bolt-three-character-layout__character--middle"
          >
            ${this.slot('character--middle')}
          </span>
          ${this.slot('connection-two')}
          <span
            class="c-bolt-three-character-layout__character c-bolt-three-character-layout__character--right"
          >
            ${this.slot('character--right')}
          </span>
        </div>
      </div>
    `;
  }
}

export { BoltThreeCharacterLayout };
