import { getUniqueId } from '@bolt/core-v3.x/utils';
import { Waypoint } from '@bolt/core-v3.x/utils/waypoint';
import {
  smoothScroll,
  scrollOptions,
  getScrollTarget,
} from '@bolt/components-smooth-scroll/src/smooth-scroll';
import { BoltAdaptiveMenu } from './adaptive-menu';
// import schema from '../navbar.schema';

/*
 * 2. role="list": declares that an element is a list.
 * 3. Aria lists reference: https://www.scottohara.me/blog/2018/05/26/aria-lists.html
 */

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
    if (this.adaptiveMenu) {
      this.adaptiveMenu.updateActiveItem(item);
    }
  }

  init() {
    this.uuid =
      this.uuid || bolt.config.env === 'test' ? '12345' : getUniqueId();

    this.activeClass = 'c-bolt-navbar-item--active';
    this.scrollOffsetSelector = this.el.getAttribute('scroll-offset-selector'); // @todo: handle multiple
    this.scrollOffsetEl = document.querySelector(this.scrollOffsetSelector);
    this.scrollOffset = this.el.getAttribute('scroll-offset');

    this.state = {
      activeItem: null,
      isOpen: false,
    };

    this.navbarItems = this.el.querySelectorAll(
      '.c-bolt-navbar-item:not(.is-duplicate)',
    );

    this.navbarData = this.getNavbarItemData([...this.navbarItems]);

    this.setupNavbarItems();
    this.setupWaypoints();
    this.setupAdaptiveMenu();

    this.el.classList.add('is-ready');

    // this.addEventListener('navbar:activate', this.onActivate);
  }

  setupNavbarItems() {
    if (!this.navbarData.length) return;

    this.itemActiveClass = 'c-bolt-navbar-item--active';
    this.handleNavItemClick = this.handleNavItemClick.bind(this);

    this.navbarData.forEach(itemSet => {
      // item = <div class="c-bolt-navbar-item"> // we store waypoint data on this element, gets the active class
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

  handleNavItemClick(event) {
    const link = event.target;
    const { item } = this.getNavbarItemByLink(link);

    try {
      if (item.waypointElement) {
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

        smoothScroll.animateScroll(item.waypointElement, link, scrollOpts);

        this.activeItem = item;
        // @todo close adaptiveMenu
      }
    } catch (err) {
      console.log(err);
    }
  }

  getNavbarItemData(items = []) {
    return items.reduce((arr, item) => {
      const link = item.querySelector('a');
      if (link) {
        return arr.concat({ item, link });
      }
    }, []);
  }

  // @todo, remove this?
  getMatchingItem(el, keyName, arr = []) {
    if (!el) return;

    const match = arr.find(item => item[keyName] === el); // @todo find by key
    const index = arr.indexOf(match);

    if (index !== -1) {
      return arr[index];
    }
  }

  getNavbarItemByLink(link, shift = 0) {
    const match = this.navbarData.find(itemSet => itemSet.link === link); // @todo find by key
    const index = this.navbarData.indexOf(match) + shift;

    if (index !== -1) {
      return this.navbarData[index];
    }
  }

  getWaypointData(items = []) {
    return items.reduce((arr, set) => {
      // each set contains an `item` and `link`, waypoint data is stored on the `item`
      const { item } = set;
      if (item.waypointElement) {
        return arr.concat({
          trigger: item,
          element: item.waypointElement,
        });
      }
    }, []);
  }

  setupWaypoints() {
    this.waypointData = this.getWaypointData(this.navbarData);
    if (!this.waypointData) return;

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

  setupAdaptiveMenu() {
    const menu = document.createElement('div');
    this.el.querySelector('.c-bolt-navbar__list-inner').append(menu);

    const options = {
      items: this.navbarItems,
      container: this.el.querySelector('.c-bolt-navbar__list'),
      baseClass: 'c-bolt-navbar-menu',
    };

    this.adaptiveMenu = new BoltAdaptiveMenu(menu, options);
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

  // nav
  // aria-labelledby="js-bolt-navbar-${this.uuid}"

  // title
  // id="js-bolt-navbar-${this.uuid}"
}
