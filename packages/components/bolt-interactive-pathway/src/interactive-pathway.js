import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './interactive-pathway.scss';
import schema from '../interactive-pathway.schema.yml';

let cx = classNames.bind(styles);

@define
class BoltInteractivePathway extends withLitHtml() {
  static is = 'bolt-interactive-pathway';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    disabled: {
      ...props.boolean,
      ...{ default: false },
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
    self.schema = schema;

    self.clickStep = self.clickStep.bind(self);
    self._updateActiveItemDomState = self._updateActiveItemDomState.bind(self);
    self._getParentBoltStepNode = self._getParentBoltStepNode.bind(self);

    return self;
  }

  connectedCallback() {
    super.connectedCallback();

    /** @type {HTMLElement[]}  */
    this.steps = Array.from(this.querySelectorAll('bolt-interactive-step'));
    // Load the first step as the active step when switch between pathways or initial load
    // this.activeStep = this.steps[0] ? this.step[0].getAttribute('step') : '1';
    // this.activeStep = this.steps[0].getAttribute('step');
    // this._updateActiveItemDomState();

    // This creates the initial onLoad animation effect for the first step
    window.setTimeout(() => {
      this.activeStep = this.steps[0].getAttribute('step');
      this._updateActiveItemDomState();
    }, 2500); // @todo replace this with a nice onScroll/inView trigger
  }

  /**
   * Searches up the Shadow Dom until it finds the parent `bolt-interactive-step` node
   * @todo this could use a refactor for performance
   * @param node
   */
  _getParentBoltStepNode(node) {
    if (node.tagName === 'BOLT-INTERACTIVE-STEP') {
      return node;
    } else {
      if (node.parentNode) {
        return this._getParentBoltStepNode(node.parentNode);
      } else {
        return null;
      }
    }
  }

  clickStep(event) {
    const parentBoltInteractiveStepNode = this._getParentBoltStepNode(
      event.target,
    );
    this.activeStep = parentBoltInteractiveStepNode.getAttribute('step');
    this._updateActiveItemDomState();
  }

  _updateActiveItemDomState() {
    this.steps.forEach(item => {
      item.getAttribute('step') === this.activeStep
        ? item.setAttribute('active', '')
        : item.removeAttribute('active');
    });
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled, active } = this.validateProps(this.props);

    const classes = cx('c-bolt-interactive-pathway', {
      [`c-bolt-interactive-pathway--disabled`]: disabled,
      [`c-bolt-interactive-pathway--active`]: active,
    });

    // @todo refactor this with lithtml event handlers
    // Adds click handler to the pathway steps. wait... Shouldn't this be in the connectedCallback?
    this.slots.steps.map(node => {
      node.renderRoot
        .querySelector('.c-bolt-interactive-step__nav-item-wrapper')
        .addEventListener('click', event => {
          this.clickStep(event);
        });
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
