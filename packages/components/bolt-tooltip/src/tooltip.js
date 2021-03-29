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
    };
  }

  constructor() {
    super();
    this.uuid = this.uuid || Math.floor(10000 + Math.random() * 90000);
  }

  initTippy() {
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
      theme: 'tooltip',
      appendTo: document.body,
      maxWidth: 'none', // Set width via CSS variable for legacy Edge support
      offset: [0, 0],
      plugins: [hideOnEsc],
      popperOptions: {
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: this.fallbackPlacements ?? undefined,
              boundary: this.$boundary,
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
    const contentClasslist = [`c-bolt-tooltip__content`, `t-bolt-xxxdark`];
    const textContentLength = this.content.textContent.trim().length;
    if (textContentLength > 31) {
      contentClasslist.push(`c-bolt-tooltip__content--text-wrap`);
    }
    if (textContentLength > 31 && textContentLength < 62) {
      contentClasslist.push(`c-bolt-tooltip__content--text-align-center`);
    }
    this.content.classList.add(...contentClasslist);

    this.initTippy();
    this.setAttribute('ready', '');

    // Call super and dispatch "ready" event _after_ Tippy is setup
    super.firstUpdated && super.firstUpdated();
  }

  render() {
    return html`
      ${this.slotify('default')}
    `;
  }
}

export { BoltTooltip };
