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

    self.fooList = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];
    self.activeItem = self.fooList[0];

    self.clickHandler = self.clickHandler.bind(self);
    self._rerenderPathwayUl = self._rerenderPathwayUl.bind(self);
    self._rerenderPathwayStage = self._rerenderPathwayStage.bind(self);

    return self;
  }

  clickHandler(event) {
    const clickedPathwayStep = event.target.getAttribute('step');
    this.activeItem = clickedPathwayStep;

    console.log('Wubba Lubba Dub Dub: this.activeItem', this.activeItem);

    this._rerenderPathwayUl();
    this._rerenderPathwayStage();
    this._TEMPrerenderPathwayTitleHelper();
  }

  _rerenderPathwayUl() {
    this.renderRoot.querySelectorAll('bolt-interactive-step').forEach(item => {
      const updatedItemState =
        item.getAttribute('step') === this.activeItem ? 'true' : 'false';
      item.setAttribute('active', updatedItemState);
    });
  }

  _rerenderPathwayStage() {
    // Disable all list items
    this.renderRoot.querySelectorAll('bolt-interactive-step').forEach(item => {
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

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <ul class="c-bolt-interactive-pathway__nav">
          <bolt-interactive-step
            step="1"
            active="true"
            @click=${this.clickHandler}
          >
            <span slot="title">Moment of Need</span>
            <span slot="dialogue">I'm saying something!</span>
            <span slot="body"
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus blanditiis consectetur culpa cum, doloremque doloribus
              ea error ipsa itaque modi nisi non odit officia quod reiciendis
              rem reprehenderit tempora tempore?</span
            >
          </bolt-interactive-step>
          <bolt-interactive-step
            step="2"
            active="false"
            @click=${this.clickHandler}
          >
            <span slot="title">Next best action</span>
          </bolt-interactive-step>
          <bolt-interactive-step
            step="3"
            active="false"
            @click=${this.clickHandler}
          >
            <span slot="title">Context Across Channels</span>
          </bolt-interactive-step>
          <bolt-interactive-step
            step="4"
            active="false"
            @click=${this.clickHandler}
          >
            <span slot="title">Resolve</span>
          </bolt-interactive-step>
          <bolt-interactive-step
            step="5"
            active="false"
            @click=${this.clickHandler}
          >
            <span slot="title">Outcomes</span>
          </bolt-interactive-step>
          <bolt-interactive-step
            step="6"
            active="false"
            @click=${this.clickHandler}
          >
            <span slot="title">What's next?</span>
          </bolt-interactive-step>
        </ul>
      </div>
    `;
  }
}

export { BoltInteractivePathway };
