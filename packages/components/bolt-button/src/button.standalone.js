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

    // Make sure the button component ONLY ever reuses any existing HTML ONCE. This, in part, helps to prevent rendering diff errors in HyperHTML after booting up!
    if (this._wasInitiallyRendered === false) {
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
    }

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

  // internal helper method for generating the internal slot markup
  _renderButtonSlot(slotName, slotClasses) {
    return wire()`
      <span class="${slotClasses}">
        ${this.slot(`${slotName}`)}
      </span>`;
  }

  render() {
    const { iconOnly, target, url } = this.props;

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

    const beforeSlotClasses = cx('c-bolt-button__icon', {
      'is-empty': 'before' in this.slots === false,
    });

    const defaultSlotClasses = cx('c-bolt-button__item', {
      'is-empty': 'default' in this.slots === false,
      'u-bolt-visuallyhidden': iconOnly,
    });

    const afterSlotClasses = cx('c-bolt-button__icon', {
      'is-empty': 'after' in this.slots === false,
    });

    // Decide on if the rendered button tag should be a <button> or <a> tag, based on if a URL exists OR if a link was passed in from the getgo
    const hasUrlProp = url.length > 0 && url !== 'null';

    // Assign default target attribute value if one isn't specified
    const urlTarget = target && hasUrlProp ? target : '_self';

    // Placeholder for the  buttonElement to render, based on the initial HTML passed alone.
    let existingButton = null;

    // pre-render the button's slots to simplify adding to the HyperHTML template or existing DOM element if present.
    const defaultSlot = this._renderButtonSlot('default', defaultSlotClasses);
    const afterSlot = this._renderButtonSlot('after', afterSlotClasses);
    const beforeSlot = this._renderButtonSlot('before', beforeSlotClasses);
    const slots = [beforeSlot, defaultSlot, afterSlot];

    // if the component initially rendered with a button or link inside, use that instead of generating one from scratch
    if (this.rootElement) {
      existingButton = this.rootElement.firstChild.cloneNode(true);
      existingButton.className += ' ' + classes;

      const slotsForExistingButton = document.createDocumentFragment();
      for (let i = 0; i < slots.length; i++) {
        slotsForExistingButton.appendChild(slots[i]);
      }
      existingButton.appendChild(slotsForExistingButton);
    }

    return this.html`
      ${this.addStyles([styles, visuallyhiddenUtils])}
      ${
        this.rootElement
          ? existingButton
          : hasUrlProp
            ? wire()`
              <a href="${url}" class="${classes}" target="${urlTarget}">
                ${slots}
              </a>`
            : wire()`
              <button class="${classes}">
                ${slots}
              </button>`
      }
    `;
  }
}

export { BoltButton };
