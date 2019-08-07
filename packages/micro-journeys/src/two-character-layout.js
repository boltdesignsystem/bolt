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
    characterLeftUrl: {
      ...props.string,
      ...{
        default:
          'https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/customer-happy.png',
      },
    },
    characterRightUrl: {
      ...props.string,
      ...{
        default:
          'https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/pega-rep.png',
      },
    },
    connectionUrl: {
      ...props.string,
      ...{
        default:
          'https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/animated-bands-ltr.png',
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
    const {
      characterLeftUrl,
      characterRightUrl,
      connectionUrl,
    } = this.validateProps(this.props);
    const classes = cx('c-bolt-two-character-layout');

    // const eventChangeActiveStep = new CustomEvent('change-active-step', {
    //   bubbles: true,
    //   detail: {
    //     stepId: this.props.step,
    //   },
    // });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <div class="c-bolt-two-character-layout__character-row">
          <img
            class="c-bolt-two-character-layout__character c-bolt-two-character-layout__character--left"
            src="${characterLeftUrl}"
            alt="Character on the left"
          />
          ${this.slot('connection')}
          <img
            class="c-bolt-two-character-layout__character c-bolt-two-character-layout__character--right"
            src="${characterRightUrl}"
            alt="Character on the right"
          />
        </div>
      </div>
    `;
  }
}

export { BoltTwoCharacterLayout };
