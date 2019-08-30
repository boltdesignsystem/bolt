import {
  props,
  define,
  hasNativeShadowDomSupport,
  query,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames';
import styles from './interactive-pathway.scss';
// import schema from '../interactive-pathway.schema.yml';

let cx = classNames.bind(styles);

@define
class BoltInteractivePathway extends withLitHtml() {
  static is = 'bolt-interactive-pathway';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = schema;
    self.isActivePathway = false;
    self.activeStep = -1;
    self.steps = [];
    self.addEventListener('change-active-step', event => {
      const steps = this.getSteps();
      const stepId = steps.findIndex(step => step.el === event.target);
      this.setActiveStep(stepId);
    });
    return self;
  }

  /**
   * @return {{ el: BoltInteractiveStep, title: string }[]}
   */
  getSteps() {
    const els = /** @type {BoltInteractiveStep[]} */ (query(
      'bolt-interactive-step',
      this,
    ));

    return els.map(el => ({
      el,
      title: el.getTitle(),
    }));
  }

  setActive(isActive = true) {
    this.isActivePathway = isActive;
    this.setActiveStep(0);
    this.triggerUpdate();
  }

  /**
   * @return {string}
   */
  getTitle() {
    /** @type {HTMLElement} */
    const pathwayTitleEl = this.querySelector('[slot="pathway-title"]');
    return pathwayTitleEl ? pathwayTitleEl.innerText : '';
  }

  connectedCallback() {
    super.connectedCallback();
    // let children render before trying to access
    setTimeout(() => {
      this.steps = this.getSteps();
      this.triggerUpdate();
    }, 0);
  }

  /**
   * Set the active tab panel step
   * @param {number} stepIndex
   * @return {Promise<void>}
   */
  setActiveStep = async stepIndex => {
    if (stepIndex === this.activeStep) {
      // @todo first one initially set twice, causes double animation in
      console.warn('current step already active');
      return;
    }
    const steps = this.getSteps();
    if (!steps) {
      console.error('No steps inside, so cannot setActiveStep', this);
      return;
    }
    const newActiveStep = steps[stepIndex];
    const currentActiveStep = steps[this.activeStep];
    if (!newActiveStep) {
      console.error(
        `uh oh setActiveStep fired with stepIndex "${stepIndex}" but could not find one`,
      );
      return;
    }
    if (currentActiveStep) {
      await currentActiveStep.el.triggerAnimOuts();
      currentActiveStep.el.setActive(false);
    }
    newActiveStep.el.setActive(true);
    this.activeStep = stepIndex;
    await newActiveStep.el.triggerAnimIns();
    this.triggerUpdate();
  };

  render() {
    const classes = cx('c-bolt-interactive-pathway', {
      [`c-bolt-interactive-pathway--disabled`]: !this.isActivePathway,
      [`c-bolt-interactive-pathway--active`]: this.isActivePathway,
    });

    const navClasses = cx('c-bolt-interactive-pathway__nav');
    const itemClasses = cx('c-bolt-interactive-pathway__items');
    // new approach
    return html`
      ${this.addStyles([styles])}
      <section class="${classes}">
        <nav class="${navClasses}">
          ${this.steps.map((step, stepIndex) => {
            const isActiveItem = this.activeStep === stepIndex;
            const navItemClasses = cx('c-bolt-interactive-pathway__nav-item', {
              'c-bolt-interactive-pathway__nav-item--active': isActiveItem,
            });
            return html`
              <div
                class="${navItemClasses}"
                @click=${() => this.setActiveStep(stepIndex)}
              >
                ${step.title}
              </div>
            `;
          })}
        </nav>
        <div class="${itemClasses}">
          ${this.slot('default')}
        </div>
      </section>
    `;

    // old approach
    const old = html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <ul class="c-bolt-interactive-pathway__nav">
          ${this.slot('default')}
        </ul>
      </div>
    `;
  }
}

export { BoltInteractivePathway };
