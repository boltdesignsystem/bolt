import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html, convertSchemaToProps } from '@bolt/core';
import classNames from 'classnames/bind';
import schema from './character.schema';
import styles from './character.scss';

let cx = classNames.bind(styles);

@define
class BoltCharacter extends withLitHtml() {
  static is = 'bolt-character';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    ...convertSchemaToProps(schema),
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const { characterUrl, size, useIcon, animtype } = this.validateProps(
      this.props,
    );
    const classes = cx('c-bolt-character', `c-bolt-character--${size}`);

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <span
          class="c-bolt-character__slot c-bolt-character__slot--cardinal c-bolt-character__slot--top"
        >
          ${this.slot('top')}
        </span>
        <span
          class="c-bolt-character__slot c-bolt-character__slot--cardinal c-bolt-character__slot--left"
        >
          ${this.slot('left')}
        </span>
        <span
          class="c-bolt-character__slot c-bolt-character__slot--cardinal c-bolt-character__slot--bottom"
        >
          ${this.slot('bottom')}
        </span>
        <span
          class="c-bolt-character__slot c-bolt-character__slot--cardinal c-bolt-character__slot--right"
        >
          ${this.slot('right')}
        </span>
        <div class="c-bolt-character__main-image-wrapper">
          ${useIcon
            ? html`
                <span
                  class="c-bolt-character__slot c-bolt-character__slot--icon"
                >
                  <bolt-icon></bolt-icon>
                </span>
              `
            : html`
                <img
                  class="c-bolt-character__main-image"
                  src="${characterUrl}"
                  alt="Character Image"
                />
              `}
        </div>
        <bolt-svg-animations
          class="c-bolt-character__background"
          speed="4000"
          animtype="${animtype}"
          theme="dark"
        ></bolt-svg-animations>
      </div>
    `;
  }
}

export { BoltCharacter };
