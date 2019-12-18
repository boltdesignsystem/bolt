import { html, customElement } from 'lit-element';
import { props, convertSchemaToProps } from '@bolt/core-v3.x/utils';
import { withLitContext } from '@bolt/core-v3.x/renderers';
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
    self.animateInInitialExclusions = [boltTwoCharacterLayoutIs];
    self.initializedAnimationExclusions = [];
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
    this.animateInInitialExclusions.forEach(exclusionComponent => {
      this.addEventListener(
        `${exclusionComponent}:animation-initialized`,
        this.handleExcludedAnimationInitializedOnChild,
      );
    });
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
    this.animateInInitialExclusions.forEach(exclusionComponent => {
      this.removeEventListener(
        `${exclusionComponent}:animation-initialized`,
        this.handleExcludedAnimationInitializedOnChild,
      );
    });

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

  handleExcludedAnimationInitializedOnChild(e) {
    this.initializedAnimationExclusions = [
      ...this.initializedAnimationExclusions,
      ...e.target.querySelectorAll('bolt-animate'),
    ];
  }

  async triggerAnimOuts(durationOverride = null) {
    const anims = this.querySelectorAll('bolt-animate');
    return triggerAnims({ animEls: anims, stage: 'OUT', durationOverride });
  }

  async triggerAnimIns() {
    let anims = [...this.querySelectorAll('bolt-animate')];
    // Filter bolt-animates inside animateInInitialExclusions.
    if (this.animateInInitialExclusions.length) {
      const animateInInitialExclusions = [
        ...this.querySelectorAll(
          `${this.animateInInitialExclusions.join(
            ' bolt-animate',
          )} bolt-animate`,
        ),
      ];
      // Tell the excluded components they can animate themselves.
      [
        ...this.querySelectorAll(this.animateInInitialExclusions.join(' ')),
      ].forEach(exclusion => {
        exclusion.setAttribute('parent-animations-triggered', true);
      });
      anims = anims.filter(animateEl => {
        return !animateInInitialExclusions.find(exclusion =>
          animateEl.isSameNode(exclusion),
        );
      });
    }
    // Add any excluded components that have finished initializing to trigger list.
    const animEls = [...anims, ...this.initializedAnimationExclusions];
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
