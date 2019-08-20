import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import { triggerAnims } from '@bolt/components-animate/utils';
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

  /**
   * @param {Event} event
   */
  handleAnimationEnd(event) {
    console.log('bolt:transitionend', event);
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('bolt:transitionend', this.handleAnimationEnd);
  }

  disconnectedCallback() {
    this.removeEventListener('bolt:transitionend', this.handleAnimationEnd);
  }

  async triggerAnimOuts() {
    const anims = Array.from(this.querySelectorAll('bolt-animate'));
    return triggerAnims({ animEls: anims, stage: 'OUT' });
  }

  async triggerAnimIns() {
    const anims = Array.from(this.querySelectorAll('bolt-animate'));
    return triggerAnims({ animEls: anims, stage: 'IN' });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled, active, step } = this.validateProps(this.props);
    const totalSteps = this.parentElement.getAttribute('total-steps');
    console.log(this.parentElement);
    const classes = cx('c-bolt-interactive-step', {
      [`c-bolt-interactive-step--disabled`]: disabled,
      [`c-bolt-interactive-step--active`]: active,
      [`c-bolt-interactive-step--first`]: step === '1',
      [`c-bolt-interactive-step--last`]: step === totalSteps,
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
          <div class="c-bolt-interactive-step__line"></div>
          <span class="c-bolt-interactive-step__dot">&#9679;</span>
          <span class="c-bolt-interactive-step__title">
            ${this.slot('title')}
          </span>
        </div>
        <div class="c-bolt-interactive-step__body" data-active="${active}">
          <div
            class="c-bolt-interactive-step__slot c-bolt-interactive-step__slot--top"
          >
            ${this.slot('top')}
          </div>
          <div
            class="c-bolt-interactive-step__slot c-bolt-interactive-step__slot--bottom"
          >
            ${this.slot('bottom')}
          </div>
        </div>
      </li>
    `;
  }
}

export { BoltInteractiveStep };
