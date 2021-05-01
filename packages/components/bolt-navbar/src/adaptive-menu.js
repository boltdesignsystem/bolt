import { html, render } from '@bolt/element';
import '@bolt/core-v3.x/utils/optimized-resize';

export class BoltAdaptiveMenu {
  constructor(el, options = {}) {
    if (!el) return;
    this.el = el;
    this.options = {
      items: [],
      container: null,
      baseClass: 'c-bolt-adaptive-menu',
      ...options,
    };
    this.state = {
      open: false,
    };

    this.init();
  }

  init() {
    this.menuItems = this.getMenuItems();
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleDropdownItemClick = this.handleDropdownItemClick.bind(this);
    this.handleExternalClick = this.handleExternalClick.bind(this);
    this.handleEscapeKeypress = this.handleEscapeKeypress.bind(this);
    this.adaptMenu = this.adaptMenu.bind(this);
    window.addEventListener('throttledResize', this.adaptMenu);

    this.el.classList.add(this.options.baseClass);

    this.updateMenu();
    this.adaptMenu();
  }

  getMenuItems() {
    let items = [];
    Array.from(this.options.items).forEach(item => {
      // const isActive = item === this.activeItem;
      const dropdownItem = item.cloneNode(true);
      dropdownItem.setAttribute('role', 'menuitem');
      dropdownItem.classList.add(
        `${this.options.baseClass}__dropdown-item`,
        'is-duplicate',
        'is-dropdown-link',
      );

      dropdownItem.addEventListener('click', this.handleDropdownItemClick);
      items.push(dropdownItem);
    });

    return items;
  }

  handleDropdownItemClick(event) {
    console.log('click');
  }

  adaptMenu() {
    const { items, container } = this.options;
    if (!container) return;

    container.classList.add('u-bolt-overflow-hidden');

    // reveal all items for the calculation
    items.forEach(item => {
      item.classList.remove('u-bolt-hidden');
    });

    // hide all duplicate items in the menu
    this.menuItems.forEach(item => {
      item.classList.add('u-bolt-hidden');
    });

    // Note: below we use `getBoundingClientRect()` because it returns a decimal.
    // Whereas `offsetWidth` returns an integer, leading to rounding errors in
    // Safari and older Edge < 80.

    const hiddenItems = [];
    const containerWidth = container.getBoundingClientRect().width;
    let menuWidth = this.el.getBoundingClientRect().width;
    let isOverflowing = false;

    items.forEach((item, i) => {
      // Subtract 1 from the width of each item to fix a bug in Edge version < 80 where
      // it miscalculates the size of the items and/or container and always adds at least
      // 1 item to the "More" dropdown menu.
      const itemWidth = item.getBoundingClientRect().width - 1;

      // make sure the items fit + we haven't already started to encounter items that don't
      if (containerWidth >= menuWidth + itemWidth && isOverflowing !== true) {
        menuWidth += itemWidth;
      } else {
        isOverflowing = true;
        item.classList.add('u-bolt-hidden');
        hiddenItems.push(i);
      }
    });

    if (!hiddenItems.length) {
      // Hide the menu if there are no overflowing items
      this.el.classList.add('u-bolt-hidden');
    } else {
      // Show only the overflowing items
      this.menuItems.forEach((item, i) => {
        if (hiddenItems.includes(i)) {
          item.classList.remove('u-bolt-hidden');
        }
      });
      // Reveal the menu
      this.el.classList.remove('u-bolt-hidden');
    }

    container.classList.remove('u-bolt-overflow-hidden');
  }

  getKey(e) {
    if (e.key !== undefined) {
      return e.key;
    } else if (e.keyCode !== undefined) {
      return e.keyCode;
    }
  }

  handleEscapeKeypress(e) {
    if (this.getKey(e) === 'Escape' || this.getKey(e) === 27) {
      this.state.open = false;
      this.updateMenu();
      document.removeEventListener('keyup', this.handleEscapeKeypress);
    }
  }

  handleMenuClick(e) {
    e.stopPropagation();
    this.state.open = !this.state.open;
    this.updateMenu();
  }

  handleExternalClick(e) {
    console.log('extrnal');
    const target = e.target;

    if (this.el.contains(target)) {
      return;
    }

    this.state.open = false;
    this.updateMenu();
  }

  updateActiveItem(item) {
    console.log('her');
    this.menuItems.forEach(el => {});
  }

  updateMenu() {
    console.log('@update menu');
    if (!this.menuItems) return;

    const { open } = this.state;
    const { baseClass } = this.options;

    if (open) {
      this.el.classList.add(`${this.options.baseClass}--is-open`);
      document.addEventListener('click', this.handleExternalClick);
      document.addEventListener('keyup', this.handleEscapeKeypress);
    } else {
      this.el.classList.remove(`${this.options.baseClass}--is-open`);
      document.removeEventListener('click', this.handleExternalClick);
    }

    render(
      html`
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded="${open}"
          class="${baseClass}__button"
          @click="${this.handleMenuClick}"
        >
          <span class="${baseClass}__button-text">
            ${this.moreText ? this.moreText : 'More'}
          </span>
          <span class="${baseClass}__button-icon">
            <bolt-icon name="chevron-down"></bolt-icon>
          </span>
        </button>
        <div class="${baseClass}__dropdown" role="menu">
          <div class="${baseClass}__dropdown-inner">
            ${this.menuItems}
          </div>
        </div>
      `,
      this.el,
    );
  }
}
