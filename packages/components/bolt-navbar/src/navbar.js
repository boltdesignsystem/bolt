import { Waypoint } from '@bolt/core-v3.x/utils/waypoint';
import {
  smoothScroll,
  scrollOptions,
} from '@bolt/components-smooth-scroll/src/smooth-scroll';
import { BoltOverflowMenu } from './overflow-menu';
import '@bolt/core-v3.x/utils/optimized-resize';

export class BoltNavbar {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  get activeItem() {
    return this.state.activeItem;
  }

  set activeItem(item) {
    if (!this.state.activeItem) {
      item.setAttribute('data-bolt-current', '');
      this.state.activeItem = item;
    } else if (this.state.activeItem !== item) {
      this.state.activeItem.removeAttribute('data-bolt-current');
      item.setAttribute('data-bolt-current', '');
      this.state.activeItem = item;
    }

    if (this.overflowMenu) {
      this.overflowMenu.updateActiveItem(item);
    }
  }

  get visibleElements() {
    return this.state.visibleElements;
  }

  set visibleElements(elements) {
    this.state.visibleElements = elements;

    if (this.visibleElements.length) {
      const lastActiveElement = this.visibleElements[
        this.visibleElements.length - 1
      ];
      const { trigger } = this.waypointData.find(
        item => item.element === lastActiveElement,
      );

      if (trigger && trigger !== this.activeItem) {
        this.activeItem = trigger;
      }
    }
  }

  get stickyOffset() {
    return (
      this.getCumulativeHeight(this.stickyOffsetElements) + this.stickyOffsetPx
    );
  }

  init() {
    this.state = {
      activeItem: null,
      isOpen: false,
      visibleElements: [],
    };

    this.static = this.el.hasAttribute('data-bolt-static');

    this.setupOffsets();

    this.setStickyOffset = this.setStickyOffset.bind(this);
    window.addEventListener('throttledResize', this.setStickyOffset);
    this.setStickyOffset();

    // Setup Navbar List
    this.navbarList = this.el.querySelector('.js-bolt-navbar__list');
    this.navbarItems = this.el.querySelectorAll(
      '.js-bolt-navbar__list > .js-bolt-navbar-item',
    );
    this.navbarLinks = [...this.navbarItems].reduce((arr, item) => {
      const link = item.querySelector('a');
      if (link) {
        return arr.concat({ item, link });
      } else {
        return arr;
      }
    }, []);

    if (this.navbarList && this.navbarLinks.length) {
      this.setupNavbarItems();
      this.setupWaypoints();
      this.setupOverflowMenu();

      // On initial load, if scrolled to top and two sections are visible, force the first to be active until user scrolls
      if (window.scrollY === 0 && this.visibleElements.length) {
        this.activeItem = this.navbarLinks[0].item;
      }
    }

    this.el.setAttribute('data-bolt-ready', '');

    // After everything is ready, trigger overflow menu once more to
    this.overflowMenu?.handleResize();
  }

  setupNavbarItems() {
    this.handleNavItemClick = this.handleNavItemClick.bind(this);

    this.navbarLinks.forEach(itemSet => {
      // item = <div class="c-bolt-navbar-item"> // we store waypoint data on this element, receives the active class
      // link = <a class="c-bolt-navbar-item__link"> // click events are bound to this element
      const { item, link } = itemSet;
      const isActive = item.hasAttribute('data-bolt-current');
      let activeHashMatchesElement;

      if (link.hash) {
        try {
          const matchingElement = document.querySelector(link.hash);
          activeHashMatchesElement =
            link.hash === window.location.hash && matchingElement;
          item.waypointElement = matchingElement;
        } catch (err) {
          // Catches invalid selectors
          console.log(err);
        }
        link.addEventListener('click', this.handleNavItemClick);
      }

      // Set an initially active link if appropriate.
      if (isActive || activeHashMatchesElement) {
        this.activeItem = item;
      }
    });
  }

  setupWaypoints() {
    this.waypointData = this.navbarLinks.reduce((arr, set) => {
      // each set contains an `item` and `link`, waypoint data is stored on the `item`
      const { item } = set;
      if (item.waypointElement) {
        return arr.concat({
          trigger: item,
          element: item.waypointElement,
        });
      } else {
        return arr;
      }
    }, []);

    if (!this.waypointData) return;

    this.waypoint = new Waypoint({
      items: this.waypointData,
      topOffset: 0,
      bottomOffset: '75%',
      stickyOffset: this.stickyOffset + this.el.offsetHeight || 0,
      onEnter: args => {
        this.onEnter(args);
      },
      onLeave: args => {
        this.onLeave(args);
      },
      // Show waypoint boundary on-screen
      // debug: true,
    });
  }

  setupOverflowMenu() {
    const menu = document.createElement('li');
    this.navbarList.append(menu);

    this.overflowMenu = new BoltOverflowMenu(menu, {
      items: [...this.navbarItems],
      container: this.el.querySelector('.js-bolt-navbar__list-wrapper'),
      baseClass: 'c-bolt-navbar-menu',
      moreText: this.el.dataset.boltMoreText,
    });
  }

  handleNavItemClick(event) {
    // sometimes target is the inner span
    const link = event.target.closest('a');
    const { item } = this.navbarLinks.find(item => item.link === link);

    try {
      if (item.waypointElement) {
        event.preventDefault();

        // Don't add the :focus state to the link in this scenario.  The focus state is about to get removed anyway as
        // we move down the page, and a flash of the focused state just adds confusion.
        document.activeElement.blur();

        const scrollOpts = scrollOptions;
        scrollOpts.offset =
          this.stickyOffset + this.scrollOffset + this.el.offsetHeight || 0;
        // Delete the default `header` value: https://github.com/cferdinandi/smooth-scroll#fixed-headers
        // It works with fixed but not sticky elements. For consistency, handle scroll position entirely through `offset`.
        delete scrollOpts.header;

        smoothScroll.animateScroll(item.waypointElement, link, scrollOpts);

        this.activeItem = item;
      }
    } catch (err) {
      console.log(err);
    }
  }

  onEnter({ element }) {
    // Fires when waypoint enters the boundary
    this.visibleElements = [...this.visibleElements, element];
  }

  onLeave({ element }) {
    // Fires when waypoint leaves the boundary
    this.visibleElements = this.visibleElements.filter(
      value => value !== element,
    );
  }

  trySelector(selector) {
    // Prevent invalid user-provided selector from throwing an error
    try {
      return document.querySelectorAll(selector);
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  getCumulativeHeight(els = []) {
    let height = 0;

    els.forEach(el => {
      // This can be a floating point
      height += el.getBoundingClientRect().height;
    });

    // Always round down, subpixel rendering can leave an unwanted gap above navbar
    return Math.floor(height);
  }

  setupOffsets() {
    // Default sticky elements
    const defaultStickyElements = document.querySelectorAll(
      '[data-bolt-sticky-header], .js-global-header.is-fixed',
    ); // First selector covers new header, second covers old header

    // Sticky offsets
    this.stickyOffsetPx = parseInt(this.el.dataset.boltStickyOffset) || 0;
    const stickyOffsetSelector = this.el.dataset.boltStickyOffsetSelector;
    this.stickyOffsetElements = [
      ...defaultStickyElements,
      ...this.trySelector(stickyOffsetSelector),
    ];

    // Scroll offset
    this.scrollOffset = parseInt(this.el.dataset.boltScrollOffset) || 0;
  }

  setStickyOffset() {
    const offset = this.stickyOffset;

    if (offset) {
      if (!this.static) {
        this.el.style.top = `${offset}px`;
      }

      if (this.waypoint) {
        // Set Waypoint offset
        this.waypoint.options.stickyOffset = offset + this.el.offsetHeight;
      }
    }
  }
}
