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
    // self.schema = this.getModifiedSchema(schema);

    self.fooList = ['One', 'Two', 'Three', 'Four', 'Five'];
    self.activeItemIndex = 0;

    self.clickHandler = self.clickHandler.bind(self);

    return self;
  }

  clickHandler(event) {
    console.log('Wubba Lubba Dub Dub: event', event);
    console.log('Wubba Lubba Dub Dub: this.renderRoot', this.renderRoot);
    this.renderRoot
      .querySelectorAll('li')
      .forEach(item => item.setAttribute('data-is-active', 'inactive'));
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
          <div>pane 1</div>
          <div>pane 2</div>
          <div>pane 3</div>
          <div>pane 4</div>
          <div>pane 5</div>
        </div>
      </div>
    `;
  }
}

export { BoltInteractivePathway };
