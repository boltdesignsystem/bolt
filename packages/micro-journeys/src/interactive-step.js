import {
  props,
  define,
  hasNativeShadowDomSupport,
  withContext,
} from '@bolt/core/utils';
import { withLitHtml, html, convertSchemaToProps } from '@bolt/core';
import { triggerAnims } from '@bolt/components-animate/utils';
import classNames from 'classnames/bind';
import { BoltInteractivePathwaysContext } from './interactive-pathways';
import styles from './interactive-step.scss';
import schema from './interactive-step.schema';

const cx = classNames.bind(styles);

@define
class BoltInteractiveStep extends withContext(withLitHtml()) {
  static is = 'bolt-interactive-step';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    ...convertSchemaToProps(schema),
  };

  static get consumes() {
    return [[BoltInteractivePathwaysContext, 'theme']];
  }

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

    this.addEventListener('bolt:transitionend', this.handleAnimationEnd);

    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent(`${BoltInteractiveStep.is}:connected`, {
          bubbles: true,
          detail: {
            title: this.getTitle(),
          },
        }),
      );
    }, 0);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('bolt:transitionend', this.handleAnimationEnd);

    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent(`${BoltInteractiveStep.is}:disconnected`, {
          bubbles: true,
          detail: {
            title: this.getTitle(),
          },
        }),
      );
    }, 0);
  }

  async triggerAnimOuts() {
    const anims = this.querySelectorAll('bolt-animate');
    return triggerAnims({ animEls: anims, stage: 'OUT' });
  }

  async triggerAnimIns() {
    const anims = this.querySelectorAll('bolt-animate');
    return triggerAnims({ animEls: anims, stage: 'IN' });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'tab-title':
        if (oldValue !== newValue) {
          // this.triggerUpdate();
          this.dispatchEvent(
            new CustomEvent(`${BoltInteractiveStep.is}:title-updated`, {
              bubbles: true,
            }),
          );
        }
        break;
    }
  }

  /**
   * @return {string}
   */
  getTitle() {
    return this.props.tabTitle;
  }

  /**
   * Request that this step becomes the new active step
   * @event change-active-step
   * @return {void}
   */
  triggerStepChange() {
    this.dispatchEvent(
      new CustomEvent(`${BoltInteractiveStep.is}:change-active-step`, {
        bubbles: true,
      }),
    );
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { tabTitle } = this.validateProps(this.props);
    this.theme = this.context.theme;
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
      [`c-bolt-interactive-step--active`]: this._isActiveStep,
      [`c-bolt-interactive-step--first`]: isFirstStep,
      [`c-bolt-interactive-step--last`]: isLastStep,
      [`t-bolt-${this.theme}`]: this.theme,
    });

    const titleClasses = cx('c-bolt-interactive-step__title');

    return html`
      ${this.addStyles([styles])}
      <article class="${classes}">
        <header
          class="${titleClasses}"
          @click=${() => this.triggerStepChange()}
        >
          ${tabTitle}
        </header>
        <div class="c-bolt-interactive-step__body">
          <div class="c-bolt-interactive-step__body-inner">
            <div class="c-bolt-interactive-step__top-slot">
              ${this.slot('top')}
            </div>
            <div class="c-bolt-interactive-step__bottom-slot">
              ${this.slot('bottom')}
            </div>
          </div>
        </div>
      </article>
    `;
  }
}

export { BoltInteractiveStep };
