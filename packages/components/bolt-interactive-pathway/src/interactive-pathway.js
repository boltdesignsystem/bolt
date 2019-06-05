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
    self.activeItemIndex = 0;

    self.clickHandler = self.clickHandler.bind(self);

    return self;
  }

  clickHandler(event) {
    console.log('Wubba Lubba Dub Dub: event', event);
    console.log('Wubba Lubba Dub Dub: this.renderRoot', this.renderRoot);

    // Disable all list items
    this.renderRoot
      .querySelectorAll('li')
      .forEach(item => item.setAttribute('data-is-active', 'inactive'));
    // Enable clicked list item
    event.target.setAttribute('data-is-active', 'active');
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);

    const classes = cx('c-bolt-interactive-pathway', {
      [`c-bolt-interactive-pathway--disabled`]: disabled,
    });

    console.log('Wubba Lubba Dub Dub: classes', this.fooList);

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <ul>
          ${this.fooList.map(
            (item, index) => html`
              <li
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
              >pane 2</div>
            `,
          )}
        </div>
      </div>
    `;
  }
}

export { BoltInteractivePathway };
