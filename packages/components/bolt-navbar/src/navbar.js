import { getUniqueId } from '@bolt/core-v3.x/utils';
import { html, render } from '@bolt/element';
// import { withContext } from 'wc-context/lit-element';
import { Waypoint } from '@bolt/core-v3.x/utils/waypoint';
// import classNames from 'classnames/bind';
// import itemStyles from './navbar-item.scss';
// import schema from '../navbar.schema';
import {
  smoothScroll,
  scrollOptions,
  getScrollTarget,
} from '@bolt/components-smooth-scroll/src/smooth-scroll';
import '@bolt/core-v3.x/utils/optimized-resize';

/*
 * 2. role="list": declares that an element is a list.
 * 3. Aria lists reference: https://www.scottohara.me/blog/2018/05/26/aria-lists.html
 */

export class BoltNavbar {
  // static schema = schema;

  // // static useShadow = false;

  // static get properties() {
  //   return {
  //     ...this.props,
  //     activeItem: {
  //       type: Object,
  //     },
  //     menuItems: {
  //       type: Object,
  //     },
  //     isReady: {
  //       type: Boolean,
  //       attribute: 'is-ready',
  //       reflect: true,
  //     },
  //     dropdownIsOpen: {
  //       type: Boolean,
  //     },
  //   };
  // }

  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  set isReady(value) {
    if (value) {
      this.el.classList.add('is-ready');
    } else {
      this.el.classList.remove('is-ready');
    }
  }

  set activeItem(el) {
    if (!this.state.activeItem) {
      el.classList.add(this.activeClass);
      this.state.activeItem = el;
    } else if (this.state.activeItem !== el) {
      this.state.activeItem.classList.remove(this.activeClass);
      el.classList.add(this.activeClass);
      this.state.activeItem = el;
    }
  }

  set dropdownIsOpen(open) {
    if (open) {
      this.state.isOpen = open;
    } else {
      this.state.isOpen = open;
    }
    this.renderMenu();
  }

  get items() {
    return this.el.querySelectorAll('bolt-navbar-item');
  }

  get navLinks() {
    return this.el.querySelectorAll('bolt-navbar-item .c-bolt-navbar-item');
  }

  init() {
    this.uuid =
      this.uuid || bolt.config.env === 'test' ? '12345' : getUniqueId();

    this.menuItems = this.el.querySelectorAll(
      'bolt-navbar-item:not(.c-bolt-navbar__show-more)',
    );
    this.activeClass = 'c-bolt-navbar-item--active';
    this.scrollOffsetSelector = this.el.getAttribute('scroll-offset-selector');
    this.scrollOffsetEl = document.querySelector(this.scrollOffsetSelector);
    this.handleNavItemClick = this.handleNavItemClick.bind(this);

    this.state = {
      activeItem: null,
      isOpen: false,
    };

    this.isReady = true;

    this.navLinks.forEach(el => {
      if (el.hash) {
        try {
          el.waypointElement = document.querySelector(el.hash);
        } catch (err) {
          console.log(err);
        }
      }

      el.addEventListener('click', this.handleNavItemClick);
    });

    this.setupWaypoints();

    // this.addEventListener('navbar:activate', this.onActivate);

    this.setupAdaptiveMenu();
  }

  getWaypointData() {
    const data = [];

    this.navLinks.forEach(item => {
      if (item.waypointElement) {
        data.push({
          trigger: item,
          element: item.waypointElement,
        });
      }
    });

    return data;
  }

  setupWaypoints() {
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
  }

  handleNavItemClick(event) {
    const el = event.target;

    try {
      if (el.waypointElement) {
        event.preventDefault();

        // Don't add the :focus state to the link in this scenario.  The focus state is about to get removed anyway as
        // we move down the page, and a flash of the focused state just adds confusion.
        document.activeElement.blur();

        let scrollOpts = scrollOptions;

        const scrollOffset = this.scrollOffset || 0;
        const scrollOffsetElemHeight =
          this.scrollOffsetSelector &&
          document.querySelector(this.scrollOffsetSelector)
            ? document.querySelector(this.scrollOffsetSelector).clientHeight
            : 0;

        scrollOpts.offset = scrollOffset + scrollOffsetElemHeight;

        // Delete the default `header` value: https://github.com/cferdinandi/smooth-scroll#fixed-headers
        // It works with fixed but not sticky elements. For consistency, handle scroll position entirely through `offset`.
        // @todo We need a solution for multiple stacked fixed/sticky elements. Also see `onPositionChange()` in toc.js.
        delete scrollOpts.header;

        smoothScroll.animateScroll(el.waypointElement, el, scrollOpts);

        this.activeItem = el;
        // this.dispatchEvent(
        //   new CustomEvent('navbar:activate', {
        //     detail: {
        //       activeItem: this,
        //       onClick: true,
        //     },
        //     bubbles: true,
        //   }),
        // );
      }
    } catch (err) {
      console.log(err);
    }
  }

  renderMenu() {
    const template = (open = false) => {
      const isOpen = this.state.isOpen;
      return html`
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded="${isOpen}"
          class="c-bolt-navbar__button c-bolt-navbar__show-button ${isOpen
            ? 'is-active'
            : ''}"
          @click="${this._handleDropdownToggle}"
        >
          <span class="c-bolt-navbar__show-text">
            ${this.moreText ? this.moreText : 'More'}
          </span>
          <span class="c-bolt-navbar__show-icon">
            <bolt-icon name="chevron-down"></bolt-icon>
          </span>
        </button>
        <div
          class="c-bolt-navbar__dropdown ${isOpen ? 'is-active' : ''}"
          role="menu"
        >
          <div class="c-bolt-navbar__dropdown-list">
            ${this.getOverflowItems()}
          </div>
        </div>
      `;
    };

    render(template(), this.overflowMenu);
  }

  setupAdaptiveMenu() {
    // this.overflowMenuContainer = this.renderRoot.querySelector(
    //   '.c-bolt-navbar__show-more',
    // );

    // this.overflowMenuContainer = 'c-bolt-navbar__list-inner'

    this.overflowMenu = this.getOverflowMenu();
    this.el
      .querySelector('.c-bolt-navbar__list-inner')
      .append(this.overflowMenu);
    // console.log();

    this.dropdownIsOpen = false;

    this._handleDropdownToggle = this._handleDropdownToggle.bind(this);
    this._adaptPriorityNav = this._adaptPriorityNav.bind(this);

    window.addEventListener('throttledResize', this._adaptPriorityNav);

    this.renderMenu();

    this._adaptPriorityNav();
    this._handleExternalClicks();
  }

  getOverflowItems() {
    let items = [];
    Array.from(this.menuItems).forEach(item => {
      // const isActive = item === this.activeItem;
      const dropdownItem = item.cloneNode(true);
      dropdownItem.setAttribute('role', 'menuitem');
      dropdownItem.classList.add('is-duplicate');
      dropdownItem.classList.add('is-dropdown-link');
      dropdownItem.classList.add('c-bolt-navbar__dropdown-item');
      // dropdownItem.classList.toggle('is-hidden');
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
  }

  getOverflowMenu() {
    const menu = document.createElement('div');
    menu.classList.add('c-bolt-navbar__show-more');
    return menu;
    // const button = document.createElement('div');
    // button.classList.add('c-bolt-navbar__button c-bolt-navbar__show-button');
    // button.setAttribute('type', 'button');
    // button.setAttribute('aria-haspopup', 'true');
    // button.setAttribute('aria-expanded', 'false');

    // const moreText = this.el.getAttribute('more-text').length
    //   ? this.el.getAttribute('more-text')
    //   : 'More';
    // button.innerHTML = `
    //     <span class="c-bolt-navbar__show-text">${moreText}</span>
    //     <span class="c-bolt-navbar__show-icon">
    //       <bolt-icon name="chevron-down"></bolt-icon>
    //     </span>
    //   `;

    //   </button>
    //   <div class="${cx('c-bolt-navbar__dropdown')}" role="menu">
    //     <div class="${cx('c-bolt-navbar__dropdown-list')}">
    //     ${getOverflowItems()}
    //   </div>
  }
  // firstUpdated() {
  // showMore.innerHTML = html`
  //   yo
  // `;

  // last item
  //   <div class="${cx('c-bolt-navbar__show-more')}">

  // </div>

  // }

  _handleDropdownToggle(e) {
    console.log('@handle');
    console.log(this);
    // e.preventDefault();
    this.dropdownIsOpen = !this.state.isOpen;
  }

  _adaptPriorityNav() {
    this.overflowMenuContainer = this.el.querySelector(
      '.c-bolt-navbar__show-more',
    );
    this.navContainer = this.el.querySelector('.c-bolt-navbar__list');
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

    // this.priorityDropdown = this.el.querySelector('.c-bolt-navbar__dropdown');
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

  onActivate(event) {
    if (event?.detail?.activeItem) {
      this.activeItem = event.detail.activeItem;
    }
    // this.close();
  }

  getItemByElement(element, shift = 0) {
    const match = this.waypointData.find(item => item.waypoint === element);
    const index = this.waypointData.indexOf(match) + shift;

    if (index !== -1) {
      return this.waypointData[index];
    }
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
    // console.log(this.activeItem);
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
    // if (!this.sticky) return;
    return (this.scrollOffsetEl?.offsetHeight || 0) + (this.scrollOffset || 0);
  }

  setStickyOffset() {
    const offset = this.stickyOffset;

    if (offset) {
      // Set TOC offset
      // this.style.top = `${offset}px`;

      if (this.waypoint) {
        // Set Waypoint offset
        this.waypoint.options.stickyOffset = offset;
      }
    }
  }

  close() {
    this.dropdownIsOpen = false;

    this.el.removeAttribute('open');
    this.el.classList.add('is-closing');

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

  // render() {
  //   // const classes = cx('c-bolt-navbar', {
  //   //   [`c-bolt-navbar--${this.width}`]: this.width,
  //   //   [`t-bolt-${this.theme}`]: this.theme,
  //   //   [`c-bolt-navbar--center c-bolt-navbar--small`]: this.center,
  //   //   [`c-bolt-navbar--show-dropdown`]: this.dropdownIsOpen,
  //   // });

  //   // nav
  //   // aria-labelledby="js-bolt-navbar-${this.uuid}"

  //   // title
  //   // id="js-bolt-navbar-${this.uuid}"

  //   return html`
  //     ${this.slotify('default')}
  //   `;
  // }
}
