import {
  props,
  define,
  hasNativeShadowDomSupport,
  query,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
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
    self.addEventListener('change-active-step', event => {
      const steps = this.getSteps();
      const stepId = steps.findIndex(el => el === event.target);
      this.setActiveStep(stepId);
    });

    return self;
  }

  /**
   * @return {BoltInteractiveStep[]}
   */
  getSteps() {
    return /** @type {BoltInteractiveStep[]} */ (query(
      'bolt-interactive-step',
      this,
    ));
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
    const pathwayTitleEl = this.querySelector('[slot="pathway-title"');
    return pathwayTitleEl ? pathwayTitleEl.innerText : '';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * Set the active tab panel step
   * @param {string | number} stepId
   * @return {Promise<void>}
   */
  setActiveStep = async stepId => {
    stepId = typeof stepId === 'number' ? stepId.toString() : stepId;
    const steps = this.getSteps();
    if (!steps) {
      console.error('No steps inside, so cannot setActiveStep', this);
      return;
    }
    const newActiveStep = steps[stepId];
    const currentActiveStep = steps[this.activeStep];
    if (!newActiveStep) {
      console.error(
        `uh oh setActiveStep fired with stepId "${stepId}" but could not find one`,
      );
      return;
    }
    if (currentActiveStep) {
      await currentActiveStep.triggerAnimOuts();
      currentActiveStep.setActive(false);
    }
    newActiveStep.setActive(true);
    this.activeStep = stepId;
    await newActiveStep.triggerAnimIns();
  };

  render() {
    const classes = cx('c-bolt-interactive-pathway', {
      [`c-bolt-interactive-pathway--disabled`]: !this.isActivePathway,
      [`c-bolt-interactive-pathway--active`]: this.isActivePathway,
    });

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
