import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './interactive-step.scss';
//import schema from '../interactive-step.schema.yml'; //Todo: Uncomment when you will need schema

let cx = classNames.bind(styles);

@define
class BoltInteractiveStep extends withLitHtml() {
  static is = 'bolt-interactive-step';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    disabled: {
      ...props.boolean,
      ...{ default: false },
    },
    step: {
      ...props.string,
      ...{ default: '1' },
    },
    active: {
      ...props.boolean,
      ...{ default: false },
    },
    hideInteractionAnimations: {
      ...props.boolean,
      ...{ default: false },
    },
    customerDisposition: {
      ...props.string,
      ...{ default: 'happy' },
    },
    speakerPosition: {
      ...props.string,
      ...{ default: 'left' },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const { step, customerDisposition } = this;
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const {
      disabled,
      active,
      hideInteractionAnimations,
      speakerPosition,
    } = this.validateProps(this.props);

    const classes = cx('c-bolt-interactive-step', {
      [`c-bolt-interactive-step--disabled`]: disabled,
      [`c-bolt-interactive-step--active`]: active,
    });

    const eventChangeActiveStep = new CustomEvent('change-active-step', {
      bubbles: true,
      detail: {
        stepId: this.props.step,
      },
    });

    return html`
      ${this.addStyles([styles])}
      <li class="${classes}" is="shadow-root" data-step="${step}">
        <div
          class="c-bolt-interactive-step__nav-item-wrapper"
          @click=${e => e.target.dispatchEvent(eventChangeActiveStep)}
        >
          <span class="c-bolt-interactive-step__dot">&#9679;</span>
          <span class="c-bolt-interactive-step__title"
            >${this.slot('title')}</span
          >
        </div>
        <div class="c-bolt-interactive-step__body" data-active="${active}">
          ${hideInteractionAnimations
            ? ''
            : html`
                <div class="c-bolt-interactive-step__dialogue">
                  <bolt-tooltip-content
                    role="tooltip"
                    aria-hidden="false"
                    id="bolt-tooltip-id-11"
                    class="c-bolt-interactive-step__speech c-bolt-interactive-step__speech--${speakerPosition}"
                  >
                    <span class="c-bolt-interactive-step__speech-bubble"
                      >${this.slot('dialogue')}</span
                    >
                  </bolt-tooltip-content>
                </div>
                <div class="c-bolt-interactive-step__interaction-images">
                  <span class="c-bolt-interactive-step__interaction-band"
                    >${this.slot('dialogueBand')}</span
                  >
                  <img
                    class="c-bolt-interactive-step__avatar"
                    src="https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/customer-${customerDisposition}.png"
                    alt="Customer is ${customerDisposition}"
                  />
                  <img
                    class="c-bolt-interactive-step__avatar c-bolt-interactive-step__avatar--right"
                    src="https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/pega-rep.png"
                    alt="Your helpful Pega Rep"
                  />
                </div>
              `}
          <div class="c-bolt-interactive-step__step-body">
            ${this.slot('body')}
          </div>
        </div>
      </li>
    `;
  }
}

export { BoltInteractiveStep };
