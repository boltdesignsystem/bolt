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
      item.classList.add(this.activeClass);
      this.state.activeItem = item;
    } else if (this.state.activeItem !== item) {
      this.state.activeItem.classList.remove(this.activeClass);
      item.classList.add(this.activeClass);
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
    let scrollOffsetElementsHeight = 0;
    this.scrollOffsetElements.forEach(el => {
      scrollOffsetElementsHeight += el.offsetHeight;
    });

    return scrollOffsetElementsHeight + (this.scrollOffset || 0);
  }

  init() {
    this.activeClass = 'js-bolt-navbar-item--current';
    this.state = {
      activeItem: null,
      isOpen: false,
      visibleElements: [],
    };
    // this.visibleElements = []; // @todo do we need to set this here?

    // Setup Sticky
    const selectors = ['[data-bolt-sticky-header]'];
    const scrollOffsetSelector = this.el.dataset.boltScrollOffsetSelector;
    if (scrollOffsetSelector) {
      selectors.push(scrollOffsetSelector);
    }
    this.scrollOffsetElements = document.querySelectorAll(selectors.join(','));
    this.scrollOffset = parseInt(this.el.dataset.boltScrollOffset);
    this.static = this.el.hasAttribute('data-bolt-static');

    this.setStickyOffset = this.setStickyOffset.bind(this);
    window.addEventListener('throttledResize', this.setStickyOffset);
    this.setStickyOffset();

    // Setup Navbar List
    this.navbarList = this.el.querySelector('.js-bolt-navbar__list');
    this.navbarItems = this.el.querySelectorAll(
      '.js-bolt-navbar-item:not(.is-dropdown-link)',
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
    this.itemActiveClass = 'js-bolt-navbar-item--current';
    this.handleNavItemClick = this.handleNavItemClick.bind(this);

    this.navbarLinks.forEach(itemSet => {
      // item = <div class="c-bolt-navbar-item"> // we store waypoint data on this element, receives the active class
      // link = <a class="c-bolt-navbar-item__link"> // click events are bound to this element
      const { item, link } = itemSet;
      const hasActiveClass = item.classList.contains(this.itemActiveClass);
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
      if (hasActiveClass || activeHashMatchesElement) {
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
      baseClass: 'js-bolt-navbar-menu',
      activeClass: this.activeClass,
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
        scrollOpts.offset = this.stickyOffset + this.el.offsetHeight || 0;
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
