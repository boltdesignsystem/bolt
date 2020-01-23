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
import popoverStyles from './popover.scss';
import schema from '../popover.schema';

let cx = classNames.bind(popoverStyles);

@customElement('bolt-popover')
class BoltPopover extends BoltElement {
  static get properties() {
    return {
      spacing: String,
      placement: String,
      nowrap: Boolean,
      expanded: Boolean, // @to-do: Expanded indicates if popover content is expanded
      uuid: String, // @to-do: uuid to be assigned to the id of popover content
      hasPopup: Boolean,
      hasFocusableContent: Boolean,
    };
  }

  static get styles() {
    return [unsafeCSS(popoverStyles)];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.setAttribute('ready', '');
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.removeAttribute('ready');
  }

  setOpen() {
    if (this.isHovering || this.hasFocus) {
      this.expanded = true;
    } else {
      this.expanded = false;
    }
  }

  handleFocus(e) {
    this.hasFocus = e.type === 'focusin' ? true : false;
    this.setOpen();
  }

  handleClick(e) {
    const handleExternalClick = e => {
      if (
        !(
          e.target.closest('bolt-popover') &&
          e.target.closest('bolt-popover') === this
        )
      ) {
        this.expanded = false;
        document.removeEventListener('click', handleExternalClick);
      }
    };

    if (this.expanded) {
      this.expanded = false;
      document.removeEventListener('click', handleExternalClick);
    } else {
      this.expanded = true;
      document.addEventListener('click', handleExternalClick);
    }
  }

  sortChildren() {
    // @todo: add mutation observer and call this when content changes
    let hasFocusableContent;
    const focusableElements = ['bolt-link', 'bolt-button', 'bolt-trigger'];

    const sort = e => {
      if (e.nodeType === 1) {
        // If element node
        // Decides if tooltip wrapper can get focus or not
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

    this.slotMap.get('content') &&
      this.slotMap.get('content').forEach(e => {
        // Sorts through the content slot, figure out what kind of nodes it
        // contains, and sets variables accordingly
        recursivelySort(e);
      });

    this.hasFocusableContent = hasFocusableContent;
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
        ],
      });
    }
  }

  firstUpdated(changedProperties) {
    super.firstUpdated && super.firstUpdated(changedProperties);
    this.setupPlacement();
    this.hasPopup = this.querySelector('bolt-list');
  }

  render() {
    if (!this._wasInitiallyRendered) {
      this.sortChildren();
    }

    const spacing = this.spacing || schema.properties.spacing.default;
    const placement = this.placement || schema.properties.placement.default;
    const nowrap = this.nowrap || schema.properties.nowrap.default;

    const classes = cx('c-bolt-popover', {
      [`c-bolt-popover--spacing-${spacing}`]: spacing,
      [`c-bolt-popover--${placement}`]: placement,
      [`c-bolt-popover--nowrap`]: nowrap,
      [`is-expanded`]: this.expanded,
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
              aria-expanded="${this.expanded}"
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
              aria-hidden="${!this.expanded}"
            >
              ${this.slotify('content')}
            </span>
          `}
      </span>
    `;
  }
}

export { BoltPopover };
