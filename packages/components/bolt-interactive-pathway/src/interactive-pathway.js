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
    activePathwayId: props.number,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.schema = schema;

    return self;
  }

  connectedCallback() {
    super.connectedCallback();

    /** @type {HTMLElement[]}  */
    this.steps = Array.from(this.querySelectorAll('bolt-interactive-step'));

    // This creates the initial onLoad animation effect for the first step
    window.setTimeout(() => {
      this.activeStep = this.steps[0].getAttribute('step');
      this._updateActiveItemDomState();
    }, 2500); // @todo replace this with a nice onScroll/inView trigger
  }

  /**
   * Searches up the Shadow Dom until it finds the parent node with matching tagName or null.
   * @param node
   * @param nodeParentTagName
   */
  _getParentBoltStepNode = (node, nodeParentTagName) => {
    if (node.tagName === nodeParentTagName) {
      return node;
    } else {
      if (node.parentNode) {
        return this._getParentBoltStepNode(node.parentNode, nodeParentTagName);
      } else {
        return null;
      }
    }
  };

  handleClickStep = event => {
    const parentBoltInteractiveStepNode = this._getParentBoltStepNode(
      event.target,
      'BOLT-INTERACTIVE-STEP',
    );
    this.activeStep = parentBoltInteractiveStepNode.getAttribute('step');
    this._updateActiveItemDomState();
  };

  _updateActiveItemDomState = () => {
    this.steps.forEach(item => {
      item.getAttribute('step') === this.activeStep
        ? item.setAttribute('active', '')
        : item.removeAttribute('active');
    });
  };

  render() {
    const isActive =
      `${this.getAttribute('pathwayid')}` === `${this.activePathwayId}`;

    const classes = cx('c-bolt-interactive-pathway', {
      [`c-bolt-interactive-pathway--disabled`]: !isActive,
      [`c-bolt-interactive-pathway--active`]: isActive,
    });

    // @todo refactor this with lithtml event handlers
    // Adds click handler to the pathway steps. wait... Shouldn't this be in the connectedCallback?
    this.slots.steps.map(node => {
      node.renderRoot
        .querySelector('.c-bolt-interactive-step__nav-item-wrapper')
        .addEventListener('click', event => {
          this.handleClickStep(event);
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
