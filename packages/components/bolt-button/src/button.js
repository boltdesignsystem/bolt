import { props, define } from '@bolt/core/utils';
import { html, render } from '@bolt/core/renderers/renderer-lit-html';
import { BoltAction } from '@bolt/core/elements/bolt-action';
import { convertInitialTags } from '@bolt/core/decorators';
import { ifDefined } from 'lit-html/directives/if-defined';

import classNames from 'classnames/bind';

import styles from './button.scss';
import schema from '../button.schema.yml';

let cx = classNames.bind(styles);

@define
@convertInitialTags(['button', 'a']) // The first matching tag will have its attributes converted to component props
class BoltButton extends BoltAction {
  static is = 'bolt-button';

  static props = {
    color: props.string,
    text: props.string,
    size: props.string,
    rounded: props.boolean, // DEPRECATED.  Use border-radius instead of rounded.
    borderRadius: props.string,
    iconOnly: props.boolean,
    width: props.string,
    align: props.string,
    transform: props.string,
    disabled: props.boolean,
    target: props.string,
    url: props.string,
    onClick: props.string, // Managed by base class
    onClickTarget: props.string, // Managed by base class
    tabindex: props.number,
    inert: props.boolean, // will eventually go hand in hand with https://github.com/WICG/inert#notes-on-the-polyfill
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.schema = schema;
    self.delegateFocus = true;
    return self;
  }

  render() {
    const classes = cx('c-bolt-button', {
      'c-bolt-button--medium': !this.props.size, // Default size
      [`c-bolt-button--${this.props.size}`]: this.props.size,
      'c-bolt-button--primary': !this.props.color, // Default color
      [`c-bolt-button--${this.props.color}`]: this.props.color,
      [`c-bolt-button--${this.props.width}`]:
        this.props.width && this.props.width !== 'auto',
      'c-bolt-button--border-radius-regular': !this.props.borderRadius, // Default border radius
      'c-bolt-button--border-radius-full':
        this.props.rounded && !this.props.borderRadius, // DEPRECATED.  Use the border-radius property instead of rounded.
      [`c-bolt-button--border-radius-${this.props.borderRadius}`]: this.props
        .borderRadius,
      'c-bolt-button--center': !this.props.align, // Default align
      [`c-bolt-button--${this.props.align}`]: this.props.align,
      [`c-bolt-button--${this.props.transform}`]:
        this.props.transform && this.props.transform !== 'none',
      'c-bolt-button--disabled': this.props.disabled,
      'c-bolt-button--inert': this.props.tabindex === -1 || this.props.inert,
      'c-bolt-button--icon-only': this.props.iconOnly,
    });

    // Decide on if the rendered button tag should be a <button> or <a> tag, based on if a URL exists OR if a link was passed in from the getgo
    const hasUrl = this.props.url.length > 0 && this.props.url !== 'null';

    // Assign default target attribute value if one isn't specified
    const urlTarget = this.props.target && hasUrl ? this.props.target : '_self';

    // The buttonElement to render, based on the initial HTML passed alone.
    let buttonElement = null;
    const self = this;

    const slotMarkup = name => {
      switch (name) {
        case 'before':
        case 'after':
          const iconClasses = cx('c-bolt-button__icon', {
            'is-empty': name in this.slots === false,
          });

          return bolt.isServer
            ? html`
                ${name in this.slots
                  ? html`
                      <replace-with-grandchildren class="${iconClasses}"
                        ><span class="c-bolt-button__icon-sizer"
                          >${name in this.slots ? this.slot(name) : ''}</span
                        ></replace-with-grandchildren
                      >
                    `
                  : ''}
              `
            : html`
                <span class="${iconClasses}"
                  ><span class="c-bolt-button__icon-sizer"
                    >${name in this.slots
                      ? this.slot(name)
                      : html`
                          <slot name="${name}" />
                        `}</span
                  ></span
                >
              `;
        default:
          const itemClasses = cx('c-bolt-button__item', {
            'is-empty': name in this.slots === false,
          });

          return bolt.isServer
            ? html`
                ${name in this.slots
                  ? html`
                      <replace-with-children class="${itemClasses}"
                        >${name in this.slots
                          ? this.slot('default')
                          : ''}</replace-with-children
                      >
                    `
                  : ''}
              `
            : html`
                <span class="${itemClasses}"
                  >${name in this.slots
                    ? this.slot('default')
                    : html`
                        <slot />
                      `}</span
                >
              `;
      }
    };

    const innerSlots = [
      slotMarkup('before'),
      slotMarkup('default'),
      slotMarkup('after'),
    ];

    if (this.rootElement) {
      buttonElement = this.rootElement.firstChild.cloneNode(true);
      buttonElement.className += ' ' + classes;

      if (this.props.url) {
        buttonElement.setAttribute('href', this.props.url);
      }

      if (this.props.target) {
        buttonElement.setAttribute('target', this.props.target);
      }

      if (this.props.tabindex) {
        buttonElement.setAttribute('target', this.props.tabindex);
      }

      render(innerSlots, buttonElement);
    } else if (hasUrl) {
      buttonElement = html`
        <a
          href="${this.props.url}"
          class="${classes}"
          target="${urlTarget}"
          tabindex=${ifDefined(
            this.props.tabindex === -1
              ? '-1'
              : this.props.tabindex
              ? this.props.tabindex
              : undefined,
          )}
          is=${ifDefined(bolt.isServer ? 'shadow-root' : undefined)}
          >${innerSlots}</a
        >
      `;
    } else {
      buttonElement = html`
        <button
          class="${classes}"
          tabindex=${ifDefined(
            this.props.tabindex === -1
              ? '-1'
              : this.props.tabindex
              ? this.props.tabindex
              : undefined,
          )}
          is=${ifDefined(bolt.isServer ? 'shadow-root' : undefined)}
        >
          ${innerSlots}
        </button>
      `;
    }

    return html`
      ${this.addStyles([styles])} ${buttonElement}
    `;
  }
}

export { BoltButton };
