import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
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
    totalSteps: props.string,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = schema;
    self.addEventListener('change-active-step', ({ detail: { stepId } }) => {
      if (!stepId) {
        console.error(
          `uh oh, received change-active-step event with no "stepId" payload`,
        );
        return;
      }
      this.setActiveStep(stepId);
    });
    if (!this.getAttribute('total-steps')) {
      console.error('The attribute "total-steps" is missing.');
    }
    return self;
  }

  connectedCallback() {
    super.connectedCallback();

    /** @type {BoltInteractiveStep[]}  */
    this.steps = Array.from(this.querySelectorAll('bolt-interactive-step'));

    // This creates the initial onLoad animation effect for the first step
    window.setTimeout(() => {
      const stepId = this.steps[0].getAttribute('step');
      this.setActiveStep(stepId);
    }, 2500); // @todo replace this with a nice onScroll/inView trigger
  }

  /**
   * Set the active tab panel step
   * @param {string | number} stepId
   * @return {Promise<void>}
   */
  setActiveStep = async stepId => {
    stepId = typeof stepId === 'number' ? stepId.toString() : stepId;
    const newActiveStep = this.steps.find(
      s => s.getAttribute('step') === stepId,
    );
    const currentActiveStep = this.steps.find(
      s => typeof s.getAttribute('active') === 'string',
    );
    if (!newActiveStep) {
      console.error(
        `uh oh setActiveStep fired with stepId "${stepId}" but could not find one`,
      );
      return;
    }
    if (currentActiveStep) {
      await currentActiveStep.triggerAnimOuts();
      currentActiveStep.removeAttribute('active');
    }
    newActiveStep.setAttribute('active', '');
    this.activeStep = stepId;
    await newActiveStep.triggerAnimIns();
  };

  render() {
    const isActive =
      `${this.getAttribute('pathwayid')}` === `${this.activePathwayId}`;

    const classes = cx('c-bolt-interactive-pathway', {
      [`c-bolt-interactive-pathway--disabled`]: !isActive,
      [`c-bolt-interactive-pathway--active`]: isActive,
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <ul class="c-bolt-interactive-pathway__nav">
          ${this.slot('steps')}
        </ul>
      </div>
    `;
  }
}

export { BoltInteractivePathway };
