import {
  define,
  props,
  css,
  hasNativeShadowDomSupport,
} from '@bolt/core/utils';
import {
  render,
  withLitHtml,
  html,
} from '@bolt/core/renderers/renderer-lit-html';

import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';
import styles from '../accordion.scss';

@define
class AccordionItem extends withLitHtml() {
  static is = 'bolt-accordion-item';

  static props = {
    autoOpen: props.boolean,
    uuid: props.string,
  };

  constructor(self) {
    self = super(self);
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  connecting() {
    const originalInput = this.querySelector('.c-bolt-accordion__state');
    const originalLinks = this.querySelector('.c-bolt-accordion__header-link');

    originalInput && originalInput.parentNode.removeChild(originalInput);
    originalLinks && originalLinks.parentNode.removeChild(originalLinks);

    window.addEventListener('optimizedResizeHandler', () => {
      this.autoHeight();
    });

    this.addEventListener('activateLink', this.close);
  }

  close() {
    const elem = this;
    setTimeout(function() {
      elem.accordion.folds[0].close();
    }, 300);
  }

  autoHeight() {
    if (this.contentElem) {
      if (
        this.props.collapse &&
        window.matchMedia('(min-width: 600px)').matches
      ) {
        this.contentElem.classList.add('u-bolt-height-auto');
      } else if (this.props.collapse) {
        this.contentElem.classList.remove('u-bolt-height-auto');
      }
    }
  }

  get open() {
    return this.state.open;
    // this.accordion.folds[0].close();
  }

  // Sets the `active` state for the current custom element
  set open(value) {
    /* Properties can be set to all kinds of string values. This
     * makes sure it’s converted to a proper boolean value using
     * JavaScript’s truthiness & falsiness principles.
     */

    if (value && value === true) {
      this.state.open = true;
      this.setAttribute('open', 'open');
    } else {
      this.removeAttribute('open');
    }
  }

  template() {
    const accordionHeaderClasses = css(
      'c-bolt-accordion__header',
      this.props.center ? 'c-bolt-accordion__header--center' : '',
    );

    const headerTemplate = children => {
      const content = this.headerLabel
        ? this.headerLabel.textContent
        : children;
      return html`
        <div class="${accordionHeaderClasses}">
          <button class="c-bolt-accordion__header-button">
            ${content}

            <span class="c-bolt-accordion__header-icons">
              <div class="c-bolt-accordion__header-icons-inner">
                <span
                  class="c-bolt-accordion__header-icon c-bolt-accordion__header-icon--open"
                >
                  <bolt-icon name="add-open"></bolt-icon>
                </span>

                <span
                  class="c-bolt-accordion__header-icon c-bolt-accordion__header-icon--close"
                >
                  <bolt-icon name="minus-open"></bolt-icon>
                </span>
              </div>
            </span>
          </button>
        </div>
      `;
    };
    const contentTemplate = children => {
      return html`
        <div class="c-bolt-accordion__content">
          <div class="c-bolt-accordion__content-inner">${children}</div>
        </div>
      `;
    };

    const slotMarkup = name => {
      switch (name) {
        case 'header':
          return name in this.slots
            ? html`
                ${headerTemplate(this.slot(name))}
              `
            : html`
                <slot name="${name}" />
              `;

        default:
          return html`
            ${name in this.slots
              ? contentTemplate(this.slot('default'))
              : html`
                  <slot />
                `}
          `;
      }
    };

    const innerSlots = [slotMarkup('header'), slotMarkup('default')];

    return html`
      <div class="c-bolt-accordion-item">${innerSlots}</div>
    `;
  }

  rendered() {
    super.rendered && super.rendered();

    this.autoHeight();
  }

  render() {
    this.accordionTemplate = document.createDocumentFragment();
    render(this.template(), this.accordionTemplate);

    this.contentElem = this.accordionTemplate.querySelector(
      '.c-bolt-accordion__content',
    );

    return html`
      ${this.addStyles([styles, heightUtils])} ${this.accordionTemplate}
    `;
  }
}

// @todo - refactor, surface this up to a higher level for reuse
// Create a custom 'optimizedResizeHandler' event that works just like window.resize but is more performant because it
// won't fire before a previous event is complete.
// This was adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function() {
  function throttle(type, name, obj) {
    obj = obj || window;
    let running = false;

    function func() {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    }
    obj.addEventListener(type, func);
  }

  // Initialize on window.resize event.  Note that throttle can also be initialized on any type of event,
  // such as scroll.
  throttle('resize', 'optimizedResizeHandler');
})();

export { AccordionItem };
