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

import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';
import styles from './accordion-item.scss';
import { AccordionItemHeader } from './AccordionItemHeader';
import { AccordionItemContent } from './AccordionItemContent';
import { AccordionContext } from '../accordion';

@define
class AccordionItem extends withContext(withLitHtml()) {
  static is = 'bolt-accordion-item';

  static props = {
    autoOpen: props.boolean,
    uuid: props.string,
  };

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [
      [AccordionContext, 'noSeparator'],
      [AccordionContext, 'shadow'],
      [AccordionContext, 'spacing'],
      [AccordionContext, 'iconValign'],
      [AccordionContext, 'useShadow'],
    ];
  }

  constructor(self) {
    self = super(self);

    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  get isFirstItem() {
    return this.accordionItems && this === this.accordionItems[0];
  }

  get isLastItem() {
    return (
      this.accordionItems &&
      this === this.accordionItems[this.accordionItems.length - 1]
    );
  }

  connecting() {
    const originalInput = this.querySelector('.c-bolt-accordion-item__state');
    const originalLinks = this.querySelectorAll(
      '.c-bolt-accordion-item__trigger-link',
    );

    originalInput && originalInput.remove();
    originalLinks.length && originalLinks.forEach(el => el.remove());

    // @todo: Can we get this from Accordion via context instead?
    this.accordionItems =
      this.parentNode &&
      this.parentNode.getElementsByTagName('BOLT-ACCORDION-ITEM');

    // window.addEventListener('optimizedResizeHandler', () => {
    //   this.autoHeight();
    // });

    this.addEventListener('activateLink', this.close);
  }

  connectedCallback() {
    super.connectedCallback();
    this.context = this.contexts.get(AccordionContext);

    // Inherit useShadow from `bolt-accordion`
    this.useShadow = this.context.useShadow;
  }

  close() {
    const elem = this;
    setTimeout(function() {
      elem.accordion.folds[0].close();
    }, 300);
  }

  // autoHeight() {
  //   if (this.contentElem) {
  //     if (
  //       this.props.collapse &&
  //       window.matchMedia('(min-width: 600px)').matches
  //     ) {
  //       this.contentElem.classList.add('u-bolt-height-auto');
  //     } else if (this.props.collapse) {
  //       this.contentElem.classList.remove('u-bolt-height-auto');
  //     }
  //   }
  // }

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

  template() {
    const { noSeparator, shadow, iconValign } = this.context;

    const accordionClasses = css(
      'c-bolt-accordion-item',
      !noSeparator ? 'c-bolt-accordion-item--separator' : '',
      shadow ? 'c-bolt-accordion-item--shadow' : '',
      iconValign && iconValign !== 'top'
        ? `c-bolt-accordion-item--icon-valign-${iconValign}`
        : '',
      this.isFirstItem ? 'c-bolt-accordion-item--first-item' : '',
      this.isLastItem ? 'c-bolt-accordion-item--last-item' : '',
    );

    const slotMarkup = name => {
      switch (name) {
        case 'header':
          return name in this.slots
            ? AccordionItemHeader(this.slot(name), this.props, this.context)
            : html`
                <slot name="${name}" />
              `;

        default:
          return name in this.slots
            ? AccordionItemContent(
                this.slot('default'),
                this.props,
                this.context,
              )
            : html`
                <slot />
              `;
      }
    };

    const innerSlots = [slotMarkup('header'), slotMarkup('default')];

    return html`
      <div class="${accordionClasses}">${innerSlots}</div>
    `;
  }

  rendered() {
    super.rendered && super.rendered();

    this.contentElem = this.renderRoot.querySelector(
      '.c-bolt-accordion-item__content',
    );

    // this.autoHeight();
  }

  render() {
    // console.log('@render');

    this.addClassesToSlottedChildren();

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
