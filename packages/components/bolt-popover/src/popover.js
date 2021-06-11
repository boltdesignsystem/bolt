import { customElement, BoltElement, html } from '@bolt/element';
import {
  tippy,
  hideOnEsc,
  handleFocus,
  inspectNodeTypes,
} from '@bolt/core-v3.x/utils';
import schema from '../popover.schema';
import '@bolt/core-v3.x/elements/focus-trap';

@customElement('bolt-popover')
class BoltPopover extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      zIndex: { type: Number },
      paddingTop: { type: Number },
    };
  }

  constructor() {
    super();
    this.uuid = this.uuid || Math.floor(10000 + Math.random() * 90000);

    this.zIndex = parseInt(
      getComputedStyle(this).getPropertyValue('--c-bolt-popover-z-index'),
      10,
    );

    let offsetHeight = 0;
    // if header is sticky
    if (
      document.querySelector('header.is-fixed') !== null ||
      document.querySelector('header.c-bolt-page-header') !== null
    ) {
      offsetHeight += document.querySelector('header').clientHeight;
    }
    // @TODO: also add tallest js-sticky element?
    this.paddingTop = offsetHeight;
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
      trigger: this.triggerEvent === 'hover' ? 'mouseenter click' : 'click',
      arrow: false,
      interactive: true,
      theme: 'popover',
      role: null,
      appendTo: document.body,
      maxWidth: 'none', // Set width via CSS variable, requires legacy Edge support
      offset: [0, 0],
      plugins: [hideOnEsc, handleFocus],
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
    });
  }

  firstUpdated() {
    const { firstFocusableElement } = inspectNodeTypes(
      this.slotMap.get('default'),
    );

    // If `firstFocusableElement` has Shadow DOM, `getFocusableElement()` returns the focusable element within the Shadow DOM
    this.trigger = firstFocusableElement || this;
    this.content = this.querySelector('[slot="content"]');

    if (!this.content) return;

    // Handle non-focusable trigger elements
    if (!firstFocusableElement) {
      this.trigger.setAttribute('role', 'button');
      this.trigger.setAttribute('tabindex', 0);
    }

    // Handle popup/menu inside content
    if (this.querySelector('bolt-menu')) {
      this.trigger.setAttribute('aria-haspopup', true);
    } else {
      this.trigger.setAttribute(
        'aria-controls',
        `js-bolt-popover-${this.uuid}`,
      );
      this.content.setAttribute('id', `js-bolt-popover-${this.uuid}`);
    }

    // Set classes on content container
    const contentClasslist = [
      `c-bolt-popover__content`,
      `c-bolt-popover__content--spacing-${this.spacing}`,
    ];
    const textContentLength = this.content.textContent.trim().length;
    if (this.theme && this.theme !== 'none') {
      contentClasslist.push(`t-bolt-${this.theme}`);
    }
    if (textContentLength > 31) {
      contentClasslist.push(`c-bolt-popover__content--text-wrap`);
    }
    this.content.classList.add(...contentClasslist);

    // Set width on content container
    const widthCSSVarName = '--c-bolt-popover-bubble-width';
    const widthCSSVarValue = getComputedStyle(this).getPropertyValue(
      widthCSSVarName,
    );
    if (widthCSSVarValue) {
      this.content.style.setProperty(widthCSSVarName, widthCSSVarValue);
    }

    // Add focus trap
    const trap = document.createElement('focus-trap');
    while (this.content.firstChild) {
      trap.appendChild(this.content.firstChild);
    }
    this.content.appendChild(trap);

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

export { BoltPopover };
