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
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self._isActiveStep = false;
    return self;
  }

  setActive(isActive = true) {
    this._isActiveStep = isActive;
    this.triggerUpdate();
  }

  /**
   * @param {Event} event
   */
  handleAnimationEnd(event) {
    console.debug('bolt:transitionend', event);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.getAttribute('step')) {
      console.error('The attribute "step" is present and should not be.');
    }

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

  triggerStepChange() {
    this.dispatchEvent(
      new CustomEvent('change-active-step', {
        bubbles: true,
      }),
    );
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);
    const isLastStep = !(
      this.nextElementSibling &&
      this.nextElementSibling.tagName.toLowerCase() === 'bolt-interactive-step'
    );
    const isFirstStep = !(
      this.previousElementSibling &&
      this.previousElementSibling.tagName.toLowerCase() ===
        'bolt-interactive-step'
    );

    const classes = cx('c-bolt-interactive-step', {
      [`c-bolt-interactive-step--disabled`]: disabled,
      [`c-bolt-interactive-step--active`]: this._isActiveStep,
      [`c-bolt-interactive-step--first`]: isFirstStep,
      [`c-bolt-interactive-step--last`]: isLastStep,
    });

    return html`
      ${this.addStyles([styles])}
      <li class="${classes}" is="shadow-root">
        <div
          class="c-bolt-interactive-step__nav-item-wrapper"
          @click=${() => this.triggerStepChange()}
        >
          <div class="c-bolt-interactive-step__line"></div>
          <span class="c-bolt-interactive-step__dot">&#9679;</span>
          <span class="c-bolt-interactive-step__title">
            ${this.slot('title')}
          </span>
        </div>
        <div class="c-bolt-interactive-step__body">
          <div class="c-bolt-interactive-step__body-inner">
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
        </div>
      </li>
    `;
  }
}

export { BoltInteractiveStep };
