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

    self.fooList = ['One', 'Two', 'Three', 'Four', 'Five'];
    self.activeItem = self.fooList[0];

    self.clickHandler = self.clickHandler.bind(self);
    self._rerenderPathwayUl = self._rerenderPathwayUl.bind(self);
    self._rerenderPathwayStage = self._rerenderPathwayStage.bind(self);
    self._TEMPrerenderPathwayTitleHelper = self._TEMPrerenderPathwayTitleHelper.bind(
      self,
    );

    return self;
  }

  clickHandler(event) {
    const clickedPathwayStep = event.target.getAttribute('data-pathway-step');
    this.activeItem = clickedPathwayStep;

    console.log('Wubba Lubba Dub Dub: this.activeItem', this.activeItem);

    this._rerenderPathwayUl();
    this._rerenderPathwayStage();
    this._TEMPrerenderPathwayTitleHelper();
  }

  _rerenderPathwayUl() {
    this.renderRoot.querySelectorAll('li').forEach(item => {
      const updatedItemState =
        item.getAttribute('data-pathway-step') === this.activeItem
          ? 'active'
          : 'inactive';
      item.setAttribute('data-is-active', updatedItemState);
    });
  }

  _rerenderPathwayStage() {
    // Disable all list items
    this.renderRoot
      .querySelectorAll('.c-bolt-interactive-pathway__step')
      .forEach(item => {
        const updatedItemState =
          item.getAttribute('data-pathway-step') === this.activeItem
            ? 'active'
            : 'inactive';
        item.setAttribute('data-is-active', updatedItemState);
      });
  }

  _TEMPrerenderPathwayTitleHelper() {
    // Disable all list items
    this.renderRoot.querySelector('h1').innerHTML = `Currently Active Item: ${
      this.activeItem
    }`;
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
          <li
            class="c-bolt-interactive-pathway__nav-item"
            data-pathway-step="1"
            data-is-active="active"
            @click=${this.clickHandler}
          >
            <span class="pathway__nav-item-dot">&#9679;</span>
            <span class="pathway__nav-item-text">Moment of need</span>
          </li>

          <li
            class="c-bolt-interactive-pathway__nav-item"
            data-pathway-step="2"
            data-is-active="inactive"
            @click=${this.clickHandler}
          >
            <span class="pathway__nav-item-dot">&#9679;</span>
            <span class="pathway__nav-item-text">Next best action</span>
          </li>

          <li
            class="c-bolt-interactive-pathway__nav-item"
            data-pathway-step="3"
            data-is-active="inactive"
            @click=${this.clickHandler}
          >
            <span class="pathway__nav-item-dot">&#9679;</span>
            <span class="pathway__nav-item-text">Context across channels</span>
          </li>

          <li
            class="c-bolt-interactive-pathway__nav-item"
            data-pathway-step="4"
            data-is-active="inactive"
            @click=${this.clickHandler}
          >
            <span class="pathway__nav-item-dot">&#9679;</span>
            <span class="pathway__nav-item-text">Resolve</span>
          </li>

          <li
            class="c-bolt-interactive-pathway__nav-item"
            data-pathway-step="5"
            data-is-active="inactive"
            @click=${this.clickHandler}
          >
            <span class="pathway__nav-item-dot">&#9679;</span>
            <span class="pathway__nav-item-text">Outcomes</span>
          </li>

          <li
            class="c-bolt-interactive-pathway__nav-item"
            data-pathway-step="6"
            data-is-active="inactive"
            @click=${this.clickHandler}
          >
            <span class="pathway__nav-item-dot">&#9679;</span>
            <span class="pathway__nav-item-text">What's next?</span>
          </li>
        </ul>
        <div class="c-bolt-interactive-pathway__body">
          ${this.fooList.map(
            (item, index) => html`
              <div
                class="c-bolt-interactive-pathway__step"
                data-pathway-step="${index}"
                data-is-active="${index === 0 ? 'active' : 'inactive'}"
              >
                <div
                  class="c-bolt-interactive-pathway__step-dialogue c-bolt-interactive-pathway__step-dialogue--left"
                >
                  <bolt-tooltip>
                    Lorem ipsum dolor sit amet ${item}, Lorem ipsum dolor sit
                    amet ${item}, Lorem ipsum dolor sit amet ${item}, Lorem
                    ipsum dolor sit amet ${item}
                  </bolt-tooltip>
                </div>
                <div
                  class="c-bolt-interactive-pathway__step-image"
                  data-animation-type="{{ step.image_entrance_type }}"
                  data-animation-speed="{{ step.image_entrance_speed }}"
                  data-animation-delay="{{ step.image_entrance_delay }}"
                >
                  <img src="{{ file_url(step.image_url) }}" alt="" />
                  <img
                    class="c-bolt-interactive-pathway__step-person-icon c-bolt-interactive-pathway__step-customer--{{ step.customer_disposition }}"
                    src="https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/customer-happy.png"
                    alt="Customer is {{ step.customer_disposition }}"
                  />
                  <img
                    class="c-bolt-interactive-pathway__step-person-icon c-bolt-interactive-pathway__step-pega-rep"
                    src="https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/pega-rep.png"
                    alt="Your helpful Pega Rep"
                  />
                </div>
                <div
                  class="c-bolt-interactive-pathway__step-body"
                  data-animation-type="{{ step.body_animation_type }}"
                  data-animation-speed="{{ step.body_animation_speed }}"
                  data-animation-delay="{{ step.body_animation_delay }}"
                >
                  Lorem ipsum dolor sit amet ${item}, Lorem ipsum dolor sit amet
                  ${item}, Lorem ipsum dolor sit amet ${item}, Lorem ipsum dolor
                  sit amet ${item}
                </div>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }
}

export { BoltInteractivePathway };
