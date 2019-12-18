import { html, customElement } from 'lit-element';
import { props } from '@bolt/core/utils';
import { withLitContext, convertSchemaToProps } from '@bolt/core';
import { triggerAnims } from '@bolt/components-animate/utils';
import classNames from 'classnames/bind';
import { boltTwoCharacterLayoutIs } from '@bolt/micro-journeys/src/two-character-layout';
import styles from './interactive-step.scss';
import schema from './interactive-step.schema';

const cx = classNames.bind(styles);

@customElement('bolt-interactive-step')
class BoltInteractiveStep extends withLitContext {
  static is = 'bolt-interactive-step';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    ...convertSchemaToProps(schema),
  };

  contextChangedCallback(name, oldValue, value) {
    this.triggerUpdate();
  }

  // @ts-ignore
  constructor(self) {
    self = super(self);
    self._isActiveStep = false;
    self._isBecomingActive = false;
    // These components are responsible for their own inital animate in.
    self.animateInExclusions = [boltTwoCharacterLayoutIs];
    return self;
  }

  /**
   * Set this step to be the active step, trigger re-render.
   *
   * @param {Boolean} isActive
   */
  setActive(isActive = true) {
    this._isActiveStep = isActive;
    this._isBecomingActive = false;
    this.triggerUpdate();
  }

  /**
   * Prepare the step by rendering the content to the DOM so that `bolt-animate`s
   * can animate themselves out swiftly in preparation to be animated in.
   *
   * @param {Boolean} isBecomingActive
   * @return {Promise}
   */
  setIsBecomingActive = async (isBecomingActive = true) => {
    this._isBecomingActive = isBecomingActive;
    this.triggerUpdate();
    return this.triggerAnimOuts(1);
  };

  /**
   * @param {Event} event
   */
  handleAnimationEnd(event) {}

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

  async triggerAnimOuts(durationOverride = null) {
    const anims = this.querySelectorAll('bolt-animate');
    return triggerAnims({ animEls: anims, stage: 'OUT', durationOverride });
  }

  async triggerAnimIns() {
    let animEls = [...this.querySelectorAll('bolt-animate')];
    // Filter bolt-animates inside animateInExclusions.
    if (this.animateInExclusions.length) {
      const animateInExclusions = [
        ...this.querySelectorAll(
          `${this.animateInExclusions.join(' bolt-animate')} bolt-animate`,
        ),
      ];
      [...this.querySelectorAll(this.animateInExclusions.join(' '))].forEach(
        exclusion => {
          exclusion.triggerAnimIns();
        },
      );
      animEls = animEls.filter(animateEl => {
        return !animateInExclusions.find(exclusion =>
          animateEl.isSameNode(exclusion),
        );
      });
    }
    return triggerAnims({
      animEls,
      stage: 'IN',
    });
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
    const props = this.validateProps(this.props);
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
          ${props.tabTitle}
        </header>
        <div class="c-bolt-interactive-step__body">
          <div class="c-bolt-interactive-step__body-inner">
            <div class="c-bolt-interactive-step__top-slot">
              ${this._isActiveStep || this._isBecomingActive
                ? html`
                    ${this.slot('top')}
                  `
                : ''}
            </div>
            <div class="c-bolt-interactive-step__bottom-slot">
              ${this._isActiveStep || this._isBecomingActive
                ? html`
                    ${this.slot('bottom')}
                  `
                : ''}
            </div>
          </div>
        </div>
      </article>
    `;
  }
}

export { BoltInteractiveStep };
