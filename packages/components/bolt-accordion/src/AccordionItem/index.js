import {
  withContext,
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
import { ifDefined } from 'lit-html/directives/if-defined';

import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';
import styles from '../accordion.scss';
import { AccordionContext } from '../accordion';

@define
class AccordionItem extends withContext(withLitHtml()) {
  static is = 'bolt-accordion-item';

  static props = {
    autoOpen: props.boolean,
    uuid: props.string,
    first: props.boolean,
    last: props.boolean,
  };

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [
      [AccordionContext, 'noSeparator'],
      [AccordionContext, 'shadow'],
      [AccordionContext, 'spacing'],
      [AccordionContext, 'iconValign'],
    ];
  }

  constructor(self) {
    self = super(self);
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  connecting() {
    const originalInput = this.querySelector('.c-bolt-accordion__state');
    const originalLinks = this.querySelectorAll(
      '.c-bolt-accordion__header-link',
    );

    originalInput && originalInput.remove;
    originalLinks.length && originalLinks.forEach(el => el.remove());

    window.addEventListener('optimizedResizeHandler', () => {
      this.autoHeight();
    });

    this.addEventListener('activateLink', this.close);
  }

  connectedCallback() {
    super.connectedCallback();
    this.context = this.contexts.get(AccordionContext);
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

  // automatically adds classes for the first and last slotted item (in the default slot) to help with tricky ::slotted selectors
  addClassesToSlottedChildren() {
    if (this.slots) {
      if (this.slots.default) {
        const defaultSlot = [];

        this.slots.default.forEach(item => {
          if (item.tagName) {
            item.classList.remove('is-first-child');
            item.classList.remove('is-last-child'); // clean up existing classes
            defaultSlot.push(item);
          }
        });

        if (defaultSlot[0]) {
          defaultSlot[0].classList.add('is-first-child');

          if (defaultSlot.length === 1) {
            defaultSlot[0].classList.add('is-last-child');
          }
        }

        if (defaultSlot[defaultSlot.length - 1]) {
          defaultSlot[defaultSlot.length - 1].classList.add('is-last-child');
        }
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
    const { noSeparator, shadow, spacing, iconValign } = this.context;
    const separator = !noSeparator;

    const accordionClasses = css(
      'c-bolt-accordion-item',
      separator ? 'c-bolt-accordion-item--separator' : '',
      shadow ? 'c-bolt-accordion-item--shadow' : '',
      iconValign && iconValign !== 'top'
        ? `c-bolt-accordion-item--icon-valign-${iconValign}`
        : '',
      this.props.first ? 'c-bolt-accordion-item--first-item' : '',
      this.props.last ? 'c-bolt-accordion-item--last-item' : '',
    );

    const spacingClasses = css(
      spacing ? `c-bolt-accordion-item--spacing-${spacing}` : '',
    );

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
          <button class="c-bolt-accordion__header-button ${spacingClasses}">
            <div class="c-bolt-accordion__header-content">
              ${content}
            </div>
            <span class="c-bolt-accordion__header-icons">
              <div class="c-bolt-accordion__header-icons-inner">
                <span
                  class="c-bolt-accordion__header-icon c-bolt-accordion__header-icon--open"
                >
                  <bolt-icon name="chevron-down"></bolt-icon>
                </span>

                <span
                  class="c-bolt-accordion__header-icon c-bolt-accordion__header-icon--close"
                >
                  <bolt-icon name="chevron-up"></bolt-icon>
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
          <div class="c-bolt-accordion__content-inner ${spacingClasses}">
            ${children}
          </div>
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

    this.addClassesToSlottedChildren();

    return html`
      <div class="${accordionClasses}">${innerSlots}</div>
    `;
  }

  rendered() {
    super.rendered && super.rendered();

    this.contentElem = this.renderRoot.querySelector(
      '.c-bolt-accordion__content',
    );

    this.autoHeight();
  }

  render() {
    // const { separator } = this.context;

    // console.log(separator);

    this.accordionTemplate = document.createDocumentFragment();
    render(this.template(), this.accordionTemplate);

    return html`
      ${this.addStyles([styles, heightUtils])} ${this.template()}
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
