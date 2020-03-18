import {
  customElement,
  BoltElement,
  html,
  styleMap,
  unsafeCSS,
} from '@bolt/element';
import { isFocusable } from '@bolt/core-v3.x/utils';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames/bind';
import { createPopper } from '@popperjs/core';
import Mousetrap from 'mousetrap';
import themeStyles from '@bolt/global/styles/06-themes/_themes.wc.scss';
import popoverStyles from './popover.scss';
import schema from '../popover.schema';

let cx = classNames.bind(popoverStyles);

@customElement('bolt-popover')
class BoltPopover extends BoltElement {
  static get properties() {
    return {
      spacing: String,
      placement: String,
      uuid: String,
      open: {
        type: Boolean,
        reflect: true,
      },
      theme: {
        type: String,
      },
      hasPopup: Boolean,
      hasFocusableContent: Boolean,
      boundary: String,
      fallbackPlacements: {
        attribute: 'fallback-placements',
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.open = false;
    this.textContentLength = 0;
    this.uuid = this.uuid || Math.floor(10000 + Math.random() * 90000);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.handleExternalClick = this.handleExternalClick.bind(this);
  }

  static get styles() {
    return [unsafeCSS(popoverStyles), unsafeCSS(themeStyles)];
  }

  // removes any hashes from the URL while preserving any query string params
  // todo: maybe worth sharing this + matchSSRState with other Bolt components?
  clearURLHash() {
    window.history.replaceState(
      '',
      document.title,
      window.location.pathname + window.location.search,
    );
  }

  // updates Popover's internal state to match any SSR / no-js interactions that have occurred
  matchSSRState() {
    const uuid = this.getAttribute('uuid');

    const popoverOpenedHash = `#js-bolt-popover-${uuid}`;
    const popoverClosedHash = `#js-bolt-popover-trigger-${uuid}`;

    const currentHash = window.location.hash;

    // if URL hash matches, auto-open or auto-close + clean up any existing URL hashes
    if (currentHash === popoverOpenedHash) {
      this.clearURLHash();
      this.show();
    } else if (currentHash === popoverClosedHash) {
      this.clearURLHash();
      this.hide();
    }
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.matchSSRState();
    this.setAttribute('ready', '');
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeAttribute('ready');
  }

  hide() {
    this.open = false;
    document.removeEventListener('click', this.handleExternalClick);
    Mousetrap.unbind('esc');
  }

  show() {
    this.open = true;
    document.addEventListener('click', this.handleExternalClick);
    Mousetrap.bind('esc', this.hide, 'keyup');
  }

  handleExternalClick(e) {
    if (
      !(
        e.target.closest('bolt-popover') &&
        e.target.closest('bolt-popover') === this
      )
    ) {
      this.hide();
    }
  }

  handleClick(e) {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  sortChildren() {
    // @todo: add mutation observer and call this when content changes
    let hasFocusableContent;
    const focusableElements = ['bolt-link', 'bolt-button', 'bolt-trigger'];

    const sort = e => {
      if (e.nodeType === 1) {
        // If element node
        // Decides if popover wrapper can get focus or not
        if (
          // Covers native elements and those with tabindex set
          isFocusable(e) ||
          // Covers custom elements which delegate focus
          focusableElements.includes(e.nodeName.toLowerCase())
        ) {
          hasFocusableContent = true;
        }
      }
    };

    const recursivelySort = e => {
      sort(e);
      if (e.children) {
        Array.from(e.children).forEach(e => {
          recursivelySort(e);
        });
      }
    };

    this.slotMap.get('default') &&
      this.slotMap.get('default').forEach(e => {
        // Sorts through the content slot, figure out what kind of nodes it
        // contains, and sets variables accordingly
        recursivelySort(e);
      });

    this.hasFocusableContent = hasFocusableContent;
  }

  getTextContentLength() {
    // @todo: add mutation observer and call this when content changes
    if (this.slotMap.get('content')) {
      this.textContentLength = this.slotMap
        .get('content')[0]
        .textContent.trim().length;
    }
  }

  update(changedProperties) {
    super.update && super.update(changedProperties);

    if (changedProperties.get('placement')) {
      if (this.popper) {
        this.popper.destroy();
      }
      this.setupPlacement();
    }
  }

  setupPlacement() {
    this.popover = this.renderRoot.querySelector('.c-bolt-popover');
    this.content = this.renderRoot.querySelector('.c-bolt-popover__content');

    this.$boundary =
      this.$boundary ||
      (this.boundary && this.closest(this.boundary)) ||
      undefined;

    if (this.popover && this.content) {
      this.popper = createPopper(this.popover, this.content, {
        placement: this.placement || schema.properties.placement.default,
        modifiers: [
          {
            name: 'onPlacementChange',
            enabled: true,
            phase: 'afterWrite',
            fn: ({ state }) => {
              if (this.placement !== state.placement) {
                this.placement = state.placement;
              }
            },
          },
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
              // @todo continue evaluating placement config
              // altAxis: true,
              boundary: this.$boundary,
            },
          },
        ],
      });
    }
  }

  firstUpdated(changedProperties) {
    super.firstUpdated && super.firstUpdated(changedProperties);
    this.setupPlacement();
    this.hasPopup = this.querySelector('bolt-menu');
  }

  render() {
    if (!this._wasInitiallyRendered) {
      this.sortChildren();
      this.getTextContentLength();
    }

    const spacing = this.spacing || schema.properties.spacing.default;
    const placement = this.placement || schema.properties.placement.default;

    const classes = cx('c-bolt-popover', {
      [`is-expanded`]: this.open,
      [`c-bolt-popover--spacing-${spacing}`]: spacing,
      [`c-bolt-popover--${placement}`]: placement,
      [`c-bolt-popover--text-wrap`]: this.textContentLength > 31,
    });

    const bubbleClasses = cx('c-bolt-popover__bubble', {
      [`t-bolt-${this.theme}`]: this.theme && this.theme !== 'none',
    });

    return html`
      <span class="${classes}">
        ${this.slotMap.get('default') &&
          html`
            <span
              tabindex="${this.hasFocusableContent ? '-1' : '0'}"
              role="button"
              aria-controls="${ifDefined(
                !this.hasPopup ? `js-bolt-popover-${this.uuid}` : undefined,
              )}"
              aria-expanded="${this.open}"
              aria-haspopup="${ifDefined(this.hasPopup ? 'true' : undefined)}"
              @click="${this.handleClick}"
            >
              ${this.slotify('default')}
            </span>
          `}
        ${this.slotMap.get('content') &&
          html`
            <span
              id="js-bolt-popover-${this.uuid}"
              class="${cx(`c-bolt-popover__content`)}"
              aria-hidden="${!this.open}"
            >
              <span class="${bubbleClasses}">
                ${this.slotify('content')}
              </span>
            </span>
          `}
      </span>
    `;
  }
}

export { BoltPopover };
