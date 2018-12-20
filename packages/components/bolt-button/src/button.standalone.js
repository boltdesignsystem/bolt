import { props, define } from '@bolt/core/utils';
import { html, render } from '@bolt/core/renderers/renderer-lit-html';
import { BoltAction } from '@bolt/core/elements/bolt-action';

import classNames from 'classnames/bind';

import visuallyhiddenUtils from '@bolt/global/styles/07-utilities/_utilities-visuallyhidden.scss';
import styles from './button.scss';

let cx = classNames.bind(styles);

@define
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
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    // Define a list of tag names that are allowed in the component root. See: @bolt/core/utils/get-component-root-element.js
    self.rootElementTags = ['button', 'a'];
    return self;
  }

  render() {
    const classes = cx('c-bolt-button', {
      'c-bolt-button--disabled': this.props.disabled,
      'c-bolt-button--icon-only': this.props.iconOnly,
      'c-bolt-button--center': !this.props.align, // defautl align prop
      [`c-bolt-button--${this.props.align}`]: this.props.align,
      'c-bolt-button--primary': !this.props.color, // default color prop
      [`c-bolt-button--${this.props.color}`]: this.props.color,
      'c-bolt-button--medium': !this.props.size,
      [`c-bolt-button--${this.props.size}`]: this.props.size,
      [`c-bolt-button--${this.props.width}`]: this.props.width,
      [`c-bolt-button--${this.props.transform}`]: this.props.transform,
      [`c-bolt-button--border-radius-full`]:
        this.props.rounded && !this.props.borderRadius, // DEPRECATED.  Use the border-radius property instead of rounded.
      [`c-bolt-button--border-radius-${this.props.borderRadius}`]: this.props
        .borderRadius,
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

          return html`
            <span class="${iconClasses}"
              >${
                name in this.slots
                  ? this.slot(name)
                  : html`
                      <slot name="${name}" />
                    `
              }</span
            >
          `;
        default:
          const itemClasses = cx('c-bolt-button__item', {
            'is-empty': name in this.slots === false,
            'u-bolt-visuallyhidden': this.props.iconOnly,
          });

          return html`
            <span class="${itemClasses}"
              >${
                name in this.slots
                  ? this.slot('default')
                  : html`
                      <slot />
                    `
              }</span
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
      render(innerSlots, buttonElement);
    } else if (hasUrl) {
      buttonElement = html`
        <a href="${this.props.url}" class="${classes}" target="${urlTarget}"
          >${innerSlots}</a
        >
      `;
    } else {
      buttonElement = html`
        <button class="${classes}">${innerSlots}</button>
      `;
    }

    return html`
      ${this.addStyles([styles, visuallyhiddenUtils])} ${buttonElement}
    `;
  }
}

export { BoltButton };
