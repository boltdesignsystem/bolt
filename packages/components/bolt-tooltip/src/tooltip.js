import {
  customElement,
  BoltElement,
  html,
  styleMap,
  unsafeCSS,
} from '@bolt/element';
import { isFocusable } from '@bolt/core-v3.x/utils';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames/dedupe';
import tooltipStyles from './tooltip.scss';
import schema from '../tooltip.schema';
import Popper from 'popper.js';

let cx = classNames.bind(tooltipStyles);

@customElement('bolt-tooltip')
class BoltTooltip extends BoltElement {
  static get properties() {
    return {
      placement: String,
      open: {
        type: Boolean,
        reflect: true,
      },
      uuid: String,
      dotted: Boolean,
      hasFocusableContent: Boolean,
    };
  }

  constructor() {
    super();
    this.open = false;
    this.hasFocus = false;
    this.isHovering = false;
    this.textContentLength = 0;
    this.uuid = this.uuid || Math.floor(10000 + Math.random() * 90000);
  }

  static get styles() {
    return [unsafeCSS(tooltipStyles)];
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
      this.open = true;
    } else {
      this.open = false;
    }
  }

  handleFocus(e) {
    this.hasFocus = e.type === 'focusin' ? true : false;
    this.setOpen();
  }

  handleHover(e) {
    this.isHovering =
      e.type === 'mouseover' ||
      (e.type === 'mouseout' &&
        // relatedTarget may be slotted content
        (this.contains(e.relatedTarget) ||
          // or it may be in Shadow DOM
          this.renderRoot.contains(e.relatedTarget)))
        ? true
        : false;
    this.setOpen();
  }

  sortChildren() {
    // @todo: add mutation observer and call this when content changes
    let hasText, hasAllowedContent, hasDisallowedContent, hasFocusableContent;
    const focusableElements = ['bolt-link', 'bolt-button', 'bolt-trigger'];
    const allowedInlineElements = [
      'abbr',
      'acronym',
      'b',
      'cite',
      'em',
      'i',
      'strong',
      'sub',
      'sup',
      'time',
    ];

    const sort = e => {
      if (e.nodeType === 3) {
        // If text node
        hasText = true;
      } else if (e.nodeType === 1) {
        // If element node
        // Decides if tooltip gets a dotted underline style
        if (allowedInlineElements.includes(e.nodeName.toLowerCase())) {
          hasAllowedContent = true;
        } else {
          hasDisallowedContent = true;
        }

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

    this.templateMap.get('default') &&
      this.templateMap.get('default').forEach(e => {
        // Sorts through the default slot, figure out what kind of nodes it
        // contains, and sets variables accordingly
        recursivelySort(e);
      });

    this.dotted = (hasText || hasAllowedContent) && !hasDisallowedContent;
    this.hasFocusableContent = hasFocusableContent;
  }

  getTextContentLength() {
    // @todo: add mutation observer and call this when content changes
    if (this.templateMap.get('content')) {
      this.textContentLength = this.templateMap
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
    this.tooltip = this.renderRoot.querySelector('.c-bolt-tooltip');
    this.content = this.renderRoot.querySelector('.c-bolt-tooltip__content');

    if (this.tooltip && this.content) {
      this.popper = new Popper(this.tooltip, this.content, {
        placement: this.placement || 'bottom',
      });
    }
  }

  firstUpdated(changedProperties) {
    super.firstUpdated && super.firstUpdated(changedProperties);
    this.setupPlacement();
  }

  render() {
    if (!this._wasInitiallyRendered) {
      this.sortChildren();
      this.getTextContentLength();
    }

    // @todo: automatic schema validation?
    const placement = this.placement || schema.properties.placement.default;

    const classes = cx('c-bolt-tooltip', {
      [`is-expanded`]: this.open,
      [`c-bolt-tooltip--${placement}`]: placement,
      [`c-bolt-tooltip--dotted`]: this.dotted,
      [`c-bolt-tooltip--text-wrap`]: this.textContentLength > 31,
      [`c-bolt-tooltip--text-align-center`]:
        this.textContentLength > 31 && this.textContentLength < 62,
    });

    return html`
      <span
        class="${classes}"
        @mouseover="${this.handleHover}"
        @mouseout="${this.handleHover}"
        @focusin="${this.handleFocus}"
        @focusout="${this.handleFocus}"
      >
        ${this.slotify('default') &&
          html`
            <span
              tabindex="${this.hasFocusableContent ? '-1' : '0'}"
              role="button"
              aria-describedby="js-bolt-tooltip-${this.uuid}"
              aria-controls="js-bolt-tooltip-${this.uuid}"
              aria-expanded="${this.open}"
            >
              ${this.slotify('default')}
            </span>
          `}
        ${this.templateMap.get('content') &&
          html`
            <span
              id="js-bolt-tooltip-${this.uuid}"
              class="${cx(`c-bolt-tooltip__content`)}"
              role="tooltip"
              aria-hidden="${!this.open}"
            >
              <span class="${cx(`c-bolt-tooltip__bubble`)}">
                ${this.slotify('content')}
              </span>
            </span>
          `}
      </span>
    `;
  }
}

export { BoltTooltip };
