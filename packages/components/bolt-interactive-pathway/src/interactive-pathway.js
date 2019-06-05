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
      .querySelectorAll('.c-bolt-interactive-pathway__stage')
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
    this.renderRoot
      .querySelector('h1')
      .innerHTML = `Currently Active Item: ${this.activeItem}`;
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
        <h1>Currently Active Item: ${this.activeItem}</h1>
        <ul>
          ${this.fooList.map(
            (item, index) => html`
              <li
                class="c-bolt-interactive-pathway__stage"
                data-pathway-step="${item}"
                data-is-active="${index === 0 ? 'active' : 'inactive'}"
                @click=${this.clickHandler}
              >
                Item ${item}
              </li>
            `,
          )}
        </ul>
        <div class="stage">
          ${this.fooList.map(
            (item, index) => html`
              <div
                data-pathway-step="${item}"
                data-is-active="${index === 0 ? 'active' : 'inactive'}"
              >
                pane ${item}
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }
}

export { BoltInteractivePathway };
