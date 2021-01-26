import { customElement, BoltElement, html, unsafeCSS } from '@bolt/element';
import { getUniqueId } from '@bolt/core-v3.x/utils';
import { withContext } from 'wc-context/lit-element';
import { Waypoint } from '@bolt/core-v3.x/utils/waypoint';
import classNames from 'classnames/bind';
import styles from './nav-priority.scss';
import schema from './nav-priority.schema';

let cx = classNames.bind(styles);

/*
 * 2. role="list": declares that an element is a list.
 * 3. Aria lists reference: https://www.scottohara.me/blog/2018/05/26/aria-lists.html
 */

import {
  whichTransitionEvent,
  waitForTransitionEnd,
} from '@bolt/core-v3.x/utils';

import '@bolt/core-v3.x/utils/optimized-resize';

@customElement('bolt-nav-priority')
class BoltNavPriority extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      activeItem: {
        type: Object,
      },
    };
  }

  static useShadow = false;

  constructor() {
    super();

    this.activeLink = false;
    this.isReady = false;
    this.transitionEvent = whichTransitionEvent();
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

    this.scrollOffsetEl = document.querySelector(this.scrollOffsetSelector);

    Promise.all([customElements.whenDefined('bolt-navlink')]).then(_ => {
      this.isOpen = false;

      this.containerTabs = this.querySelector('.c-bolt-nav-priority');
      this.primaryNav = this.querySelector('.c-bolt-nav-priority__primary');
      this.primaryItems = this.querySelectorAll(
        '.c-bolt-nav-priority__primary > .c-bolt-nav-priority__item:not(.c-bolt-nav-priority__item--show-more)',
      );

      this.primaryNav.insertAdjacentHTML(
        'beforeend',
        `
        <li class="c-bolt-nav-priority__item c-bolt-nav-priority__show-more">
          <button type="button" aria-haspopup="true" aria-expanded="false" class="c-bolt-nav-priority__button c-bolt-nav-priority__show-button">
            <span class="c-bolt-nav-priority__show-text">
              ${this.moreText ? this.moreText : 'More'}
            </span>
            <span class="c-bolt-nav-priority__show-icon">
              <bolt-icon name="chevron-down"></bolt-icon>
            </span>
          </button>
          <div class="c-bolt-nav-priority__dropdown">
            <ul class="c-bolt-nav-priority__list c-bolt-nav-priority__dropdown-list">
              ${this.primaryNav.innerHTML}
            </ul>
          </div>
        </li>
      `,
      );

      // trigger `isReady` setup work
      this.isReady = true;

      this.priorityDropdown = this.querySelector(
        '.c-bolt-nav-priority__dropdown',
      );
      this.dropdownItems = this.priorityDropdown.querySelectorAll('li');
      this.dropdownLinks = this.priorityDropdown.querySelectorAll(
        'bolt-navlink',
      );

      this.dropdownLinks.forEach(navlink => {
        navlink.setAttribute('is-dropdown-link', '');
      });

      this.allListItems = this.querySelectorAll('li');
      this.moreListItem = this.primaryNav.querySelector(
        '.c-bolt-nav-priority__show-more',
      );
      this.dropdownButton = this.moreListItem.querySelector(
        '.c-bolt-nav-priority__show-button',
      );

      this._adaptPriorityNav();
      this._handleExternalClicks();

      this._waitForDropdownToFinishAnimating = this._waitForDropdownToFinishAnimating.bind(
        this,
      );
      this._adaptPriorityNav = this._adaptPriorityNav.bind(this);
      this._handleDropdownToggle = this._handleDropdownToggle.bind(this);
      this.dropdownButton.addEventListener('click', this._handleDropdownToggle);
      this.addEventListener('navlink:click', this._onActivateLink);
      window.addEventListener('throttledResize', this._adaptPriorityNav);
    });
  }

  get items() {
    return this.querySelectorAll('bolt-navlink:not([is-dropdown-link])');
  }

  getWaypointData() {
    const data = [];

    this.items.forEach(item => {
      if (item.target) {
        data.push({
          trigger: item,
          target: item.target,
        });
      }
    });

    return data;
  }

  render() {
    return html`
      ${this.slotify('default')}
    `;
  }

  _adaptPriorityNav() {
    // console.log(this);
    this.classList.add('is-resizing');

    // reveal all items for the calculation
    this.allListItems.forEach(item => {
      item.classList.remove('is-hidden');
    });

    // Note: below we use `getBoundingClientRect()` because it returns a decimal.
    // Whereas `offsetWidth` returns an integer, leading to rounding errors in
    // Safari and older Edge < 80.

    // hide items that won't fit in the Primary
    let stopWidth = this.dropdownButton.getBoundingClientRect().width;
    let hiddenItems = [];
    const primaryWidth = this.primaryNav.getBoundingClientRect().width;

    let hideTheRest = false; // keep track when the items in the nav stop fitting
    this.primaryItems.forEach((item, i) => {
      // Subtract 1 from the width of each item to fix a bug in Edge version < 80 where
      // it miscalculates the size of the items and/or container and always adds at least
      // 1 item to the "More" dropdown menu.
      const itemWidth = item.getBoundingClientRect().width - 1;

      // make sure the items fit + we haven't already started to encounter items that don't
      if (primaryWidth >= stopWidth + itemWidth && hideTheRest !== true) {
        stopWidth += itemWidth;
      } else {
        hideTheRest = true;
        item.classList.add('is-hidden');
        hiddenItems.push(i);
      }
    });

    // toggle the visibility of More button and items in Secondary
    if (!hiddenItems.length) {
      this.isOpen = false;
      this.removeAttribute('open');
      this.moreListItem.classList.add('is-hidden');
      this.containerTabs.classList.remove('c-bolt-nav-priority--show-dropdown');
      this.dropdownButton.classList.remove('is-active');
      this.dropdownButton.setAttribute('aria-expanded', false);
    } else {
      this.dropdownItems.forEach((item, i) => {
        if (!hiddenItems.includes(i)) {
          item.classList.add('is-hidden');
        }
      });
    }

    this.classList.remove('is-resizing');
  }

  _handleExternalClicks() {
    document.addEventListener('click', e => {
      let el = e.target;
      while (el) {
        if (el === this.priorityDropdown || el === this.dropdownButton) {
          return;
        }
        el = el.parentNode;
      }

      this.close();
    });
  }

  // `_onActivateLink` handles the `navlink:active` event emitted by the children
  _onActivateLink(event) {
    if (event?.detail?.activeItem) {
      this.activeItem = event.detail.activeItem;
    }

    this.close();
  }

  _handleDropdownToggle(e) {
    e.preventDefault();
    this.isOpen = !this.isOpen;
    this._toggleDropdown();
  }

  _toggleDropdown() {
    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this.isOpen = true;
    this.setAttribute('open', true);
    this.containerTabs.classList.add('c-bolt-nav-priority--show-dropdown');
    this.classList.add('is-opening');
    this.dropdownButton.classList.add('is-active');
    this.dropdownButton.setAttribute('aria-expanded', true);

    this.priorityDropdown.addEventListener(
      this.transitionEvent,
      this._waitForDropdownToFinishAnimating,
      true,
    );
  }

  // Wait for the longest transition to finish before cleaning up animation-specific classes
  _waitForDropdownToFinishAnimating(event) {
    waitForTransitionEnd(
      this,
      this.priorityDropdown,
      this._afterDropdownHasFinishedAnimating,
    )(event);
  }

  // Post-animation cleanup -- removes event listeners added, once they're no longer needed
  _afterDropdownHasFinishedAnimating(self, element, event) {
    self.classList.remove('is-opening');
    self.classList.remove('is-closing');

    self.priorityDropdown.removeEventListener(
      self.transitionEvent,
      self._waitForDropdownToFinishAnimating,
      true,
    );
  }

  close() {
    this.isOpen = false;
    this.removeAttribute('open');
    this.classList.add('is-closing');
    this.containerTabs.classList.remove('c-bolt-nav-priority--show-dropdown');
    this.dropdownButton.classList.remove('is-active');
    this.dropdownButton.setAttribute('aria-expanded', false);

    this.priorityDropdown.addEventListener(
      this.transitionEvent,
      this._waitForDropdownToFinishAnimating,
    );
  }

  get isReady() {
    return this.hasAttribute('is-ready');
  }

  set isReady(value) {
    value = Boolean(value);
    if (value) {
      this.setAttribute('is-ready', '');
      this.classList.add('is-ready');

      this.dispatchEvent(
        new CustomEvent('nav-priority:ready', {
          detail: {
            isReady: true,
          },
          bubbles: true,
        }),
      );

      // make sure containerTabs exists first
      if (this.containerTabs) {
        this.containerTabs.classList.add('is-ready');
      }
    } else {
      this.removeAttribute('is-ready');
      this.classList.remove('is-ready');

      // make sure containerTabs exists first
      if (this.containerTabs) {
        this.containerTabs.classList.remove('is-ready');
      }
    }
  }

  // Clean up event listeners when being removed from the page
  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();

    this.removeEventListener('navlink:click', this._onActivateLink);
    window.removeEventListener('throttledResize', this._adaptPriorityNav);
  }

  getItemByTarget(target, shift = 0) {
    const match = this.waypointData.find(item => item.target === target);
    const index = this.waypointData.indexOf(match) + shift;

    if (index !== -1) {
      return this.waypointData[index];
    }
  }

  onEnter({ trigger }) {
    // console.log(trigger);
    // Fires when waypoint enters the boundary
    if (trigger && trigger !== this.activeItem) {
      this.activeItem = trigger;
    }
  }

  onPositionChange({ target, currentPosition }) {
    this.setStickyOffset();

    // If `activeItem` is undefined (could be first load), use the first item
    // with position 'below' to get the previous item, which is assumed to be
    // the most visible section
    if (!this.activeItem) {
      if (currentPosition === 'below') {
        let item = this.getItemByTarget(target, -1);
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
      // set TOC offset
      // @todo temp:
      // this.closest('bolt-navbar').style.top = `${offset}px`;

      if (this.waypoint) {
        // set Waypoint offset
        this.waypoint.options.stickyOffset = offset;
      }
    }
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();

    setTimeout(() => {
      // console.log(this.stickyOffset);
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
        debug: true,
      });
    }, 500);
  }
}

export { BoltNavPriority };
