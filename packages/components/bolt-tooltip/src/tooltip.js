import { customElement, BoltElement, html } from '@bolt/element';
import { tippy, hideOnEsc, inspectNodeTypes } from '@bolt/core-v3.x/utils';
import schema from '../tooltip.schema';

@customElement('bolt-tooltip')
class BoltTooltip extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      dotted: {
        type: Boolean,
        reflect: true,
      },
      zIndex: { type: Number },
      paddingTop: { type: Number },
    };
  }

  constructor() {
    super();
    this.uuid = this.uuid || Math.floor(10000 + Math.random() * 90000);
  }

  getPaddingTop() {
    const stickyPageHeader =
      document.querySelector('.c-bolt-page-header') ||
      document.querySelector('.c-page-header.is-fixed'); // use [data-sticky-page-header] once navbar work merged into master

    const stickyElements = document.querySelectorAll('.js-bolt-sticky');

    let offsetHeight = 0;
    let tallestStickyElement = 0;

    if (stickyPageHeader) {
      offsetHeight += stickyPageHeader.offsetHeight;
    }

    if (stickyElements.length) {
      stickyElements.forEach(el => {
        const height = el.offsetHeight;
        if (height > tallestStickyElement) {
          tallestStickyElement = height;
        }
      });
    }

    return offsetHeight + tallestStickyElement;
  }

  initTippy() {
    this.zIndex = parseInt(
      getComputedStyle(this).getPropertyValue('--c-bolt-tooltip-z-index'),
      10,
    );
    this.paddingTop = this.getPaddingTop();
    this.$boundary =
      this.$boundary ||
      (this.boundary && this.closest(this.boundary)) ||
      undefined;

    // Note: trigger cannot not be a shadow DOM element or Tippy doesn't always hide properly
    this.popover = tippy(this.trigger, {
      content: this.content,
      placement: this.placement || schema.properties.placement.default,
      trigger: 'mouseenter focus', // To help debug styles set to 'click'
      arrow: false,
      interactive: true,
      theme: 'tooltip',
      appendTo: document.body,
      maxWidth: 'none', // Set width via CSS variable for legacy Edge support
      offset: [0, 0],
      plugins: [hideOnEsc],
      zIndex: this.zIndex,
      popperOptions: {
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: this.fallbackPlacements ?? undefined,
              boundary: this.$boundary,
              padding: { top: this.paddingTop },
            },
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: this.$boundary,
            },
          },
        ],
      },
      onCreate: ({ popper }) => {
        const theme = this.inverted ? `t-bolt-xlight` : `t-bolt-xxdark`;
        popper.querySelector('.tippy-box').classList.add(theme);
      },
    });
  }

  firstUpdated() {
    const {
      hasText,
      hasAllowedContent,
      hasDisallowedContent,
      firstFocusableElement,
    } = inspectNodeTypes(this.slotMap.get('default'));

    // If `firstFocusableElement` has Shadow DOM, `getFocusableElement()` returns the focusable element within the Shadow DOM
    this.trigger = firstFocusableElement || this;
    this.content = this.querySelector('[slot="content"]');
    this.dotted = (hasText || hasAllowedContent) && !hasDisallowedContent;

    if (!this.content) return;

    // Handle non-focusable trigger elements
    if (!firstFocusableElement) {
      this.trigger.setAttribute('role', 'button');
      this.trigger.setAttribute('tabindex', 0);
    }

    // Set classes on content container
    const contentClasslist = [`c-bolt-tooltip__content`];
    const textContentLength = this.content.textContent.trim().length;
    if (textContentLength > 31) {
      contentClasslist.push(`c-bolt-tooltip__content--text-wrap`);
    }
    this.content.classList.add(...contentClasslist);

    this.initTippy();
    this.setAttribute('ready', '');

    // Call super and dispatch "ready" event _after_ Tippy is setup
    super.firstUpdated && super.firstUpdated();
  }

  render() {
    return html`
      ${this.slotify('default')} ${this.slotify('content')}
    `;
  }
}

export { BoltTooltip };
