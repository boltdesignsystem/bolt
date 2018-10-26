import {
  props,
  define,
  declarativeClickHandler,
  sanitizeBoltClasses,
  hasNativeShadowDomSupport,
  afterNextRender,
} from '@bolt/core/utils';
import { wire, withHyperHtml } from '@bolt/core/renderers';

import classNames from 'classnames/bind';

import visuallyhiddenUtils from '@bolt/global/styles/07-utilities/_utilities-visuallyhidden.scss';
import styles from './button.scss';

let cx = classNames.bind(styles);

@define
class BoltButton extends withHyperHtml() {
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

    // When possible, use afterNextRender to defer non-critical work until after first paint.
    afterNextRender(this, function() {
      this.addEventListener('click', this.clickHandler);
    });
  }

  rendered() {
    super.rendered();
    const root = this;
    const slots = this.slots;

    // helper function to let you quickly check if an array of elements is inside a component's
    function containsAny(source, target) {
      const result = source.filter(function(item) {
        return target.indexOf(item) > -1;
      });
      return result.length > 0;
    }

    // Automatically re-render if the component's children get externally modified (ex. a new icon gets injected)
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(function(mutation) {
        if (mutation.removedNodes.length > 0) {
          const itemsRemoved = [].slice.call(mutation.removedNodes); // grab items removed + convert to array

          for (let i = 0; i < slots.length; i++) {
            if (containsAny(slots[slot[i]], itemsRemoved)) {
              for (let j = 0; j < itemsRemoved.length; j++) {
                const itemRemoved = itemsRemoved[j];
                slots[slot] = slots[slot].filter(
                  slottedItem => slottedItem !== itemRemoved,
                );
              }
            }
          }
        } else {
          const itemsAdded = [].slice.call(mutation.addedNodes); // grab items added + convert to array

          for (let i = 0; i < itemsAdded.length; i++) {
            const itemAdded = itemsAdded[i];
            const slotName = itemAdded.getAttribute
              ? itemAdded.getAttribute('slot')
              : null;

            if (!slotName) {
              slots.default.push(itemAdded);
            } else if (slots[slotName]) {
              slots[slotName].push(itemAdded);
            } else {
              slots[slotName] = [];
              slots[slotName].push(itemAdded);
            }
          }
        }

        // re-render if Shadow DOM is supported and enabled; temp workaround to dealing w/ components already rendered, but without slot support
        if (hasNativeShadowDomSupport && root.useShadow) {
          root.triggerUpdate();
        }
      });
    });

    this.observer.observe(this, {
      attributes: false,
      childList: true,
      characterData: false,
    });
  }

  disconnecting() {
    this.removeEventListener('click', this.clickHandler);
    this.observer.disconnect();
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
      'c-bolt-button--medium': !this.props.size, // default size prop
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

          return wire(this)`
            <span class="${iconClasses}">${
            name in this.slots
              ? this.slot(name)
              : wire(this)`<slot name="${name}" />`
          }</span>`;
        default:
          const itemClasses = cx('c-bolt-button__item', {
            'is-empty': name in this.slots === false,
            'u-bolt-visuallyhidden': this.props.iconOnly,
          });

          return wire(this)`
            <span class="${itemClasses}">${
            name in this.slots ? this.slot('default') : wire(this)`<slot/>`
          }</span>`;
      }
    };

    const innerSlots = [
      slotMarkup('before'),
      slotMarkup('default'),
      slotMarkup('after'),
    ];

    function renderInnerSlots(elementToAppendTo) {
      // hyperhtml workaround till lit-html in place
      for (var i = 0; i < innerSlots.length; i++) {
        const slotValue = innerSlots[i];
        if (slotValue !== undefined) {
          elementToAppendTo.appendChild(slotValue);
        }
      }
      return elementToAppendTo;
    }

    if (this.rootElement) {
      buttonElement = this.rootElement.firstChild.cloneNode(true);
      // render(inner, buttonElement); // lit-html syntax
      buttonElement.className += ' ' + classes;
    } else if (hasUrl) {
      buttonElement = wire()`<a href="${
        this.props.url
      }" class="${classes}" target="${urlTarget}"></a>`;
    } else {
      buttonElement = wire()`<button class="${classes}"></button>`;
    }

    buttonElement = renderInnerSlots(buttonElement);

    return this.html`
      ${this.addStyles([styles, visuallyhiddenUtils])}
      ${buttonElement}
    `;
  }
}

export { BoltButton };
