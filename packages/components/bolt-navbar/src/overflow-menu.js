import { html, render } from '@bolt/element';
import '@bolt/core-v3.x/utils/optimized-resize';

// @todo this JS could be shared between Navbar and Tabs, nothing Navbar-specific here
export class BoltOverflowMenu {
  constructor(el, options = {}) {
    if (!el) return;

    this.el = el;
    this.options = {
      items: [],
      container: null,
      baseClass: 'c-bolt-overflow-menu',
      moreText: 'More',
      ...options,
    };
    this.state = {
      open: false,
    };

    this.init();
  }

  get open() {
    return this.state.open;
  }

  set open(isOpen) {
    this.state.open = isOpen;
    this.updateMenu();
  }

  init() {
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleExternalClick = this.handleExternalClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleEscapeKeypress = this.handleEscapeKeypress.bind(this);
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('throttledResize', this.handleResize);

    this.menuItems = this.getMenuItems();

    this.el.classList.add(this.options.baseClass);

    this.updateMenu();
    this.handleResize();
  }

  getMenuItems() {
    return this.options.items.map(item => {
      const menuItem = item.cloneNode(true);
      menuItem.setAttribute('role', 'menuitem');

      const menuItemLink = menuItem.querySelector('a');
      // menu item may also contain <button>, only bind to <a>
      if (menuItemLink) {
        menuItemLink.addEventListener('click', this.handleMenuItemClick);
      }

      return menuItem;
    });
  }

  handleMenuItemClick(event) {
    event.preventDefault();
    const target = event.target.closest('a');
    const index = this.menuItems.findIndex(el => el.contains(target));

    if (index !== -1) {
      this.options.items[index]?.querySelector('a')?.click();
    }
  }

  handleResize() {
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
    const containerWidth = container.getBoundingClientRect().width;
    const hiddenItems = [];
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

  handleEscapeKeypress(e) {
    const key = e.key || e.keyCode;

    if (key === 'Escape' || key === 27) {
      this.open = false;
      document.removeEventListener('keyup', this.handleEscapeKeypress);
    }
  }

  handleMenuClick(e) {
    e.stopPropagation();
    this.open = !this.open;
  }

  handleExternalClick(e) {
    const target = e.target;

    if (this.el.contains(target)) return;

    this.open = false;
  }

  updateActiveItem(item) {
    const index = this.options.items.indexOf(item);

    if (index === -1) return;

    this.menuItems.forEach((el, i) => {
      if (i === index) {
        el.setAttribute('data-bolt-current', '');
      } else {
        el.removeAttribute('data-bolt-current');
      }
    });
  }

  updateMenu() {
    if (!this.menuItems) return;

    const { open } = this.state;
    const { baseClass, moreText } = this.options;

    if (open) {
      this.el.classList.add(`${baseClass}--is-open`);
      document.addEventListener('click', this.handleExternalClick);
      document.addEventListener('keyup', this.handleEscapeKeypress);
    } else {
      this.el.classList.remove(`${baseClass}--is-open`);
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
          <span class="${baseClass}__button-text">${moreText}</span>
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
