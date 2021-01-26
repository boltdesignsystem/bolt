import { customElement, BoltElement, html, unsafeCSS } from '@bolt/element';
import { getUniqueId } from '@bolt/core-v3.x/utils';
import { withContext } from 'wc-context/lit-element';
import { Waypoint } from '@bolt/core-v3.x/utils/waypoint';
import classNames from 'classnames/bind';
import styles from './navbar.scss';
import itemStyles from './navbar-item.scss';
import schema from '../navbar.schema';
import '@bolt/core-v3.x/utils/optimized-resize';

let cx = classNames.bind(styles);

/*
 * 2. role="list": declares that an element is a list.
 * 3. Aria lists reference: https://www.scottohara.me/blog/2018/05/26/aria-lists.html
 */

@customElement('bolt-navbar')
class BoltNavbar extends withContext(BoltElement) {
  static schema = schema;

  // static useShadow = false;

  static get properties() {
    return {
      ...this.props,
      activeItem: {
        type: Object,
      },
      menuItems: {
        type: Object,
      },
      isReady: {
        type: Boolean,
        attribute: 'is-ready',
        reflect: true,
      },
      dropdownIsOpen: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();

    this.uuid =
      this.uuid || bolt.config.env === 'test' ? '12345' : getUniqueId();
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  static get providedContexts() {
    return {
      activeItem: { property: 'activeItem' },
      scrollOffsetSelector: { property: 'scrollOffsetSelector' },
      scrollOffset: { property: 'scrollOffset' },
    };
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    this.menuItems = this.querySelectorAll(
      'bolt-navbar-item:not(.c-bolt-navbar__show-more)',
    );

    this.addEventListener('navbar:activate', this.onActivate);
    this.scrollOffsetEl = document.querySelector(this.scrollOffsetSelector);
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();

    this.removeEventListener('navbar:activate', this.onActivate);
    window.removeEventListener('throttledResize', this._adaptPriorityNav);
    this.waypoint.destroy();
  }

  get items() {
    return this.querySelectorAll('bolt-navbar-item');
  }

  setupAdaptiveMenu() {
    this.dropdownIsOpen = false;

    customElements.whenDefined('bolt-navbar-item').then(() => {
      // this._waitForDropdownToFinishAnimating = this._waitForDropdownToFinishAnimating.bind(
      //   this,
      // );
      this._handleDropdownToggle = this._handleDropdownToggle.bind(this);
      this._adaptPriorityNav = this._adaptPriorityNav.bind(this);

      window.addEventListener('throttledResize', this._adaptPriorityNav);

      this._adaptPriorityNav();
      this._handleExternalClicks();

      this.isReady = true;
    });
  }

  _handleDropdownToggle(e) {
    // e.preventDefault();
    this.dropdownIsOpen = !this.dropdownIsOpen;
  }

  _adaptPriorityNav() {
    // this

    // Vars to be moved:

    this.overflowMenuContainer = this.renderRoot.querySelector(
      '.c-bolt-navbar__show-more',
    );
    // this.allNavbarItems = this.renderRoot.querySelectorAll('bolt-navbar-item');
    this.navContainer = this.renderRoot.querySelector('.c-bolt-navbar__list');
    this.navContainer.classList.add('is-resizing');

    // reveal all items for the calculation
    this.menuItems.forEach(item => {
      item.classList.remove('is-hidden');
    });

    // container width
    const containerWidth = this.navContainer?.getBoundingClientRect().width;

    // Note: below we use `getBoundingClientRect()` because it returns a decimal.
    // Whereas `offsetWidth` returns an integer, leading to rounding errors in
    // Safari and older Edge < 80.

    // hide items that won't fit in the Primary
    let overflowMenuWidth = this.overflowMenuContainer?.getBoundingClientRect()
      .width;
    let hiddenItems = [];

    let hideTheRest = false; // keep track when the items in the nav stop fitting
    // console.log(containerWidth);
    // console.log(overflowMenuWidth);
    this.menuItems.forEach((item, i) => {
      // Subtract 1 from the width of each item to fix a bug in Edge version < 80 where
      // it miscalculates the size of the items and/or container and always adds at least
      // 1 item to the "More" dropdown menu.
      const itemWidth = item?.getBoundingClientRect().width - 1;

      // make sure the items fit + we haven't already started to encounter items that don't
      if (
        containerWidth >= overflowMenuWidth + itemWidth &&
        hideTheRest !== true
      ) {
        overflowMenuWidth += itemWidth;
      } else {
        hideTheRest = true;
        item.classList.add('is-hidden');
        hiddenItems.push(i);
      }
    });

    // this.priorityDropdown = this.querySelector('.c-bolt-navbar__dropdown');
    // this.dropdownItems = this.priorityDropdown.querySelectorAll('li');
    // this.dropdownLinks = this.priorityDropdown.querySelectorAll(
    //   'bolt-navlink',
    // );

    // toggle the visibility of More button and items in Secondary
    // if (!hiddenItems.length) {
    //   this.dropdownIsOpen = false;
    //   this.removeAttribute('open');
    //   this.moreListItem.classList.add('is-hidden');
    //   this.overflowMenuContainer.classList.remove('is-active');
    //   this.overflowMenuContainer.setAttribute('aria-expanded', false);
    // } else {
    //   this.dropdownItems.forEach((item, i) => {
    //     if (!hiddenItems.includes(i)) {
    //       item.classList.add('is-hidden');
    //     }
    //   });
    // }

    this.navContainer.classList.remove('is-resizing');
  }

  getWaypointData() {
    const data = [];

    this.items.forEach(item => {
      if (item.waypointElement) {
        data.push({
          trigger: item,
          element: item.waypointElement,
        });
      }
    });

    return data;
  }

  onActivate(event) {
    if (event?.detail?.activeItem) {
      this.activeItem = event.detail.activeItem;
    }
    // this.close();
  }

  getItemByElement(element, shift = 0) {
    const match = this.waypointData.find(
      item => item.waypointElement === element,
    );
    const index = this.waypointData.indexOf(match) + shift;

    if (index !== -1) {
      return this.waypointData[index];
    }
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {});
  }

  onEnter({ trigger, currentPosition, previousPosition }) {
    // Fires when waypoint enters the boundary
    if (trigger && trigger !== this.activeItem) {
      this.activeItem = trigger;
    }
  }

  onPositionChange({
    element,
    trigger,
    currentPosition,
    previousPosition,
    direction,
  }) {
    this.setStickyOffset();

    // if (currentPosition === 'inside' &&) {

    //   this.activeItem = trigger;
    // }
    console.log(this.activeItem);
    // If `activeItem` is undefined (could be first load), use the first item
    // with position 'below' to get the previous item, which is assumed to be
    // the most visible section
    if (!this.activeItem) {
      if (currentPosition === 'below') {
        let item = this.getItemByElement(element, -1);
        if (item) {
          this.activeItem = item.trigger;
        }
      }
    }
  }

  get stickyOffset() {
    if (!this.sticky) return;
    return (this.scrollOffsetEl?.offsetHeight || 0) + (this.scrollOffset || 0);
  }

  setStickyOffset() {
    const offset = this.stickyOffset;

    if (offset) {
      // Set TOC offset
      this.style.top = `${offset}px`;

      if (this.waypoint) {
        // Set Waypoint offset
        this.waypoint.options.stickyOffset = offset;
      }
    }
  }

  close() {
    this.dropdownIsOpen = false;
    this.dropdownIsOpen = false;

    this.removeAttribute('open');
    this.classList.add('is-closing');

    this.overflowMenuContainer.classList.remove('is-active');
    this.overflowMenuContainer.setAttribute('aria-expanded', false);

    // this.priorityDropdown.addEventListener(
    //   this.transitionEvent,
    //   this._waitForDropdownToFinishAnimating,
    // );
  }

  _onClickLink(event) {
    // const activeIndex = Array.from(this.menuItems).indexOf(event.target);
    // if (activeIndex !== -1) {
    //   this.activeItem = event.target;
    // }
    // if (event?.detail?.activeItem) {
    //   this.activeItem = event.detail.activeItem;
    // }
    // this.close();
  }

  _handleExternalClicks() {
    document.addEventListener('click', e => {
      let el = e.target;
      while (el) {
        // if (el === this.priorityDropdown || el === this.overflowMenuContainer) {
        if (el === this.overflowMenuContainer) {
          return;
        }
        el = el.parentNode;
      }

      this.close();
    });
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();

    this.waypointData = this.getWaypointData();
    this.waypoint = new Waypoint({
      items: this.waypointData,
      topOffset: 0,
      bottomOffset: '75%',
      stickyOffset: this.stickyOffset || 0,
      onEnter: args => {
        this.onEnter(args);
      },
      onPositionChange: args => {
        this.onPositionChange(args);
      },
      // Show waypoint boundary on-screen
      debug: true,
    });

    this.setupAdaptiveMenu();
  }

  render() {
    const classes = cx('c-bolt-navbar', {
      [`c-bolt-navbar--${this.width}`]: this.width,
      [`t-bolt-${this.theme}`]: this.theme,
      [`c-bolt-navbar--center c-bolt-navbar--small`]: this.center,
      [`c-bolt-navbar--show-dropdown`]: this.dropdownIsOpen,
    });

    const listClasses = cx('c-bolt-navbar__list', {
      [`is-ready`]: this.isReady,
      // [`is-resizing`]: this.isResizing,
    });

    // this.isOpen = true;
    // this.setAttribute('open', true);
    // this.containerTabs.classList.add('c-bolt-nav-priority--show-dropdown');
    // this.classList.add('is-opening');
    // this.dropdownButton.classList.add('is-active');
    // this.dropdownButton.setAttribute('aria-expanded', true);

    // this.priorityDropdown.addEventListener(
    //   this.transitionEvent,
    //   this._waitForDropdownToFinishAnimating,
    //   true,
    // );

    const getOverflowItems = () => {
      let items = [];
      Array.from(this.menuItems).forEach(item => {
        // const isActive = item === this.activeItem;
        const dropdownItem = item.cloneNode(true);
        dropdownItem.setAttribute('role', 'menuitem');
        dropdownItem.classList.add('is-duplicate');
        dropdownItem.classList.add('is-dropdown-link');
        dropdownItem.classList.add('c-bolt-navbar__dropdown-item');
        dropdownItem.classList.toggle('is-hidden');
        // if () {
        //   dropdownItem.setAttribute('active', true);
        // } else {
        //   dropdownItem.removeAttribute('active');
        // }
        // if (isActive) {
        //   dropdownItem.setAttribute('active', true);
        // } else {
        //   dropdownItem.removeAttribute('active');
        // }
        items.push(dropdownItem);
      });

      return items;
    };

    return html`
      <nav
        role="presentation"
        class="${classes}"
        aria-labelledby="js-bolt-navbar-${this.uuid}"
      >
        ${this.slotMap.get('title') &&
          html`
            <span
              class="${cx('c-bolt-navbar__title')}"
              id="js-bolt-navbar-${this.uuid}"
            >
              ${this.slotify('title')}
            </span>
          `}
        <div class="${listClasses}" role="list">
          <div class="${cx('c-bolt-navbar__list-inner')}" role="presentation">
            ${this.slotify('default')}
            <div class="${cx('c-bolt-navbar__show-more')}">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded="${this.dropdownIsOpen}"
                class="c-bolt-navbar__button c-bolt-navbar__show-button"
                @click="${this._handleDropdownToggle}"
              >
                <span class="c-bolt-navbar__show-text">
                  ${this.moreText ? this.moreText : 'More'}
                </span>
                <span class="c-bolt-navbar__show-icon">
                  <bolt-icon name="chevron-down"></bolt-icon>
                </span>
              </button>
              <div class="${cx('c-bolt-navbar__dropdown')}" role="menu">
                <div class="${cx('c-bolt-navbar__dropdown-list')}">
                ${getOverflowItems()}
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

export { BoltNavbar };
