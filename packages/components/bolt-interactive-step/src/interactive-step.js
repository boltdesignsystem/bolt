import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './interactive-step.scss';
//import schema from '../interactive-step.schema.yml'; //Todo: Uncomment when you will need schema

const cx = classNames.bind(styles);

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
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const {
      disabled,
      active,
      step,
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
          <div class="c-bolt-interactive-step__step-top">
            ${this.slot('top')}
          </div>
          <div class="c-bolt-interactive-step__step-body">
            ${this.slot('body')}
          </div>
        </div>
      </li>
    `;
  }
}

export { BoltInteractiveStep };
