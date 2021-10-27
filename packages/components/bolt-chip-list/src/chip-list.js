import {
  ifDefined,
  html,
  customElement,
  BoltElement,
  unsafeCSS,
  unsafeHTML,
} from '@bolt/element';
import { render } from 'lit-html';
import { iconMore } from '@bolt/elements-icon';
import classNames from 'classnames/bind';
import iconStyles from '@bolt/elements-icon/index.scss';
import styles from './chip-list.scss';
import schema from '../chip-list.schema';

let cx = classNames.bind(styles);

@customElement('bolt-chip-list')
class BoltChipList extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  constructor() {
    super();
    this.selector = 'bolt-list-item';
    this.triggerAttr = 'truncate-trigger';
  }

  static get styles() {
    return [unsafeCSS(styles), unsafeCSS(iconStyles)];
  }

  get items() {
    // Get all list items, except the trigger items
    return this.querySelectorAll(`${this.selector}:not([${this.triggerAttr}])`);
  }

  get willTruncate() {
    return this.truncate > -1 && this.truncate < this.items.length;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    // Preserve state if expanded before component loads + input exists
    if (this.querySelector('.c-bolt-chip-list__input')?.checked) {
      this.expanded = true;
    }

    // Remove initial SSR triggers
    Array.from(this.querySelectorAll(`[${this.triggerAttr}]`)).forEach(el =>
      el.remove(),
    );

    if (this.willTruncate) {
      this.triggerElement = document.createElement(this.selector);
      this.triggerElement.setAttribute(this.triggerAttr, '');
      this.items[0].parentNode.appendChild(this.triggerElement);
    }
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated && super.firstUpdated(changedProperties);

    // Wait until component has rendered before removing no-js fallback HTML to prevent FOUC
    Array.from(this.querySelectorAll('.c-bolt-chip-list--no-js')).forEach(el =>
      el.remove(),
    );
  }

  render() {
    const items = Array.from(this.items);

    if (this.willTruncate) {
      const truncatedItems = items.slice(this.truncate);

      if (this.expanded) {
        truncatedItems.forEach(el => {
          el.removeAttribute('hidden');
          el.removeAttribute('aria-hidden');
        });
      } else {
        truncatedItems.forEach(el => {
          el.setAttribute('hidden', '');
          el.setAttribute('aria-hidden', true);
        });
      }
    }

    if (this.willTruncate && this.triggerElement) {
      render(
        html`
          ${!this.expanded || (this.expanded && this.collapsible)
            ? html`
                <bolt-trigger
                  aria-label="${this.expanded ? 'Show less' : 'Show more'}"
                  @click=${e => this.toggle(e)}
                >
                  <bolt-chip
                    icon-only
                    size="${ifDefined(this.size ? this.size : undefined)}"
                  >
                    ${unsafeHTML(iconMore({ attributes: { slot: 'after' } }))}
                  </bolt-chip>
                </bolt-trigger>
              `
            : ''}
        `,
        this.triggerElement,
      );
    }

    return html`
      ${this.slotify('default')}
    `;
  }
}

export { BoltChipList };
