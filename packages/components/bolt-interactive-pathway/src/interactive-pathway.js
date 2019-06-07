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
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.schema = schema;

    self.clickStep = self.clickStep.bind(self);
    self._updateActiveItemDomState = self._updateActiveItemDomState.bind(self);

    self.$steps = self.querySelectorAll('bolt-interactive-step');

    return self;
  }

  clickStep(event) {
    const clickedPathwayStep = event.target.getAttribute('step');
    this.activeItem = clickedPathwayStep;
    this._updateActiveItemDomState();
  }

  _updateActiveItemDomState() {
    this.$steps.forEach(item => {
      const updatedItemState =
        item.getAttribute('step') === this.activeItem ? 'true' : 'false';
      item.setAttribute('active', updatedItemState);
    });
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);

    const classes = cx('c-bolt-interactive-pathway', {
      [`c-bolt-interactive-pathway--disabled`]: disabled,
    });

    // Adds click handler to the pathway steps
    this.slots.steps.map(node => {
      node.addEventListener('click', event => {
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
