import {
  props,
  define,
  declarativeClickHandler,
  sanitizeBoltClasses,
  hasNativeShadowDomSupport,
  afterNextRender,
  watchForComponentMutations,
} from '@bolt/core/utils';
import {
  withLitHtml,
  html,
  render,
} from '@bolt/core/renderers/renderer-lit-html';

import classNames from 'classnames/bind';

import visuallyhiddenUtils from '@bolt/global/styles/07-utilities/_utilities-visuallyhidden.scss';
import styles from './button.scss';

let cx = classNames.bind(styles);

@define
class BoltButton extends withLitHtml() {
  static is = 'bolt-button';

  static props = {
    color: props.string,
    text: props.string,
    size: props.string,
    rounded: props.boolean,
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
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  connecting() {
    const root = this;

    // If the initial <bolt-button> element contains a button or link, break apart the original HTML so we can retain any button or a tags but swap out the inner content with slots.
    this.childNodes.forEach((childElement, i) => {
      if (childElement.tagName === 'BUTTON' || childElement.tagName === 'A') {
        root.rootElement = document.createDocumentFragment();

        // Take any existing buttons and links and move them to the root of the custom element
        while (childElement.firstChild) {
          root.appendChild(childElement.firstChild);
        }

        if (childElement.className) {
          childElement.className = sanitizeBoltClasses(childElement);
        }

        if (
          childElement.getAttribute('is') &&
          childElement.getAttribute('is') === 'shadow-root'
        ) {
          childElement.removeAttribute('is');
        }

        root.rootElement.appendChild(childElement);
      }
    });

    // When possible, use afterNextRender to defer non-critical
    // work until after first paint.
    afterNextRender(this, function() {
      this.addEventListener('click', this.clickHandler);
    });
  }

  rendered() {
    super.rendered(); // ensure any events emitted by the Bolt Base class fire as expected

    // re-render if Shadow DOM is supported and enabled; temp workaround to dealing w/ components already rendered, but without slot support
    if (hasNativeShadowDomSupport && this.useShadow) {
      this.observer = watchForComponentMutations(this);

      this.observer.observe(this, {
        attributes: false,
        childList: true,
        characterData: false,
      });
    }
  }

  disconnecting() {
    this.removeEventListener('click', this.clickHandler);

    if (hasNativeShadowDomSupport && this.useShadow) {
      this.observer.disconnect();
    }
  }

  // Attach external events declaratively
  clickHandler(event) {
    declarativeClickHandler(this);
  }

  render() {
    const classes = cx('c-bolt-button', {
      'c-bolt-button--rounded': this.props.rounded,
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
            <span class="${iconClasses}">${
            name in this.slots ? this.slot(name) : html`<slot name="${name}" />`
          }</span>`;
        default:
          const itemClasses = cx('c-bolt-button__item', {
            'is-empty': name in this.slots === false,
            'u-bolt-visuallyhidden': this.props.iconOnly,
          });

          return html`
            <span class="${itemClasses}">${
            name in this.slots ? this.slot('default') : html`<slot/>`
          }</span>`;
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
      buttonElement = html`<a href="${
        this.props.url
      }" class="${classes}" target="${urlTarget}">${innerSlots}</a>`;
    } else {
      buttonElement = html`<button class="${classes}">${innerSlots}</button>`;
    }

    return html`
      ${this.addStyles([styles, visuallyhiddenUtils])}
      ${buttonElement}
    `;
  }
}

export { BoltButton };
