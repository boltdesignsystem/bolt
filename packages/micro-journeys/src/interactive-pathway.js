import {
  props,
  define,
  hasNativeShadowDomSupport,
  query,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import cx from 'classnames';
// import styles from './interactive-pathway.scss';
// import schema from '../interactive-pathway.schema.yml';

// let cx = classNames.bind(styles);

@define
class BoltInteractivePathway extends withLitHtml() {
  static is = 'bolt-interactive-pathway';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    activePathwayId: props.number,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = schema;
    self.isActivePathway = false;
    self.activeStep = 0;
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
  };

  render() {
    const classes = cx('c-bolt-interactive-pathway', {
      [`c-bolt-interactive-pathway--disabled`]: !this.isActivePathway,
      [`c-bolt-interactive-pathway--active`]: this.isActivePathway,
    });

    // new approach
    return html`
      <section class="${classes}">
        <nav>
          ${this.steps.map((step, stepIndex) => {
            const isActiveItem = this.activeStep === stepIndex;
            return html`
              <div
                @click=${() => this.setActiveStep(stepIndex)}
                style="font-weight: ${isActiveItem ? 'bold' : 'normal'}"
              >
                ${step.title}
              </div>
            `;
          })}
        </nav>
        ${this.slot('default')}
      </section>
    `;

    // old approach
    return html`
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
