import { html, customElement } from '@bolt/element';
import {
  props,
  whichTransitionEvent,
  waitForTransitionEnd,
} from '@bolt/core/utils';
import { withLitHtml } from '@bolt/core/renderers/renderer-lit-html';

import '@bolt/core/utils/optimized-resize';

/*
  Consider using these polyfills to broaden browser support:
    — https://www.npmjs.com/package/classlist-polyfill
    — https://www.npmjs.com/package/nodelist-foreach-polyfill
*/

@customElement('bolt-nav-priority')
class BoltNavPriority extends withLitHtml {
  constructor(self) {
    self = super(self);
    this.activeLink = false;
    this.useShadow = false;
    this.isReady = false;
    this.transitionEvent = whichTransitionEvent();

    this._adaptPriorityNav = this._adaptPriorityNav.bind(this);
    this._handleDropdownToggle = this._handleDropdownToggle.bind(this);

    return self;
  }

  static props = {
    moreText: props.string, // Text that displays when navlinks can't all display at once
  };

  connecting() {
    Promise.all([customElements.whenDefined('bolt-navlink')]).then(_ => {
      this.isOpen = false;
      this.offsettolerance = 5; // Extra wiggle room when calculating how many items can fit

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
              ${this.props.moreText ? this.props.moreText : 'More'}
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
      this.dropdownButton.addEventListener('click', this._handleDropdownToggle);
      this.addEventListener('navlink:click', this._onActivateLink);
      window.addEventListener('throttledResize', this._adaptPriorityNav);
    });
  }

  render() {
    return html`
      ${this.slot('default')}
    `;
  }

  _adaptPriorityNav() {
    this.classList.add('is-resizing');

    // reveal all items for the calculation
    this.allListItems.forEach(item => {
      item.classList.remove('is-hidden');
    });

    // hide items that won't fit in the Primary
    let stopWidth = this.dropdownButton.offsetWidth;
    let hiddenItems = [];
    const primaryWidth = this.primaryNav.offsetWidth;

    let hideTheRest = false; // keep track when the items in the nav stop fitting
    this.primaryItems.forEach((item, i) => {
      // make sure the items fit + we haven't already started to encounter items that don't
      if (
        primaryWidth + this.offsettolerance >= stopWidth + item.offsetWidth &&
        hideTheRest !== true
      ) {
        stopWidth += item.offsetWidth;
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
  disconnecting() {
    this.removeEventListener('navlink:click', this._onActivateLink);
    window.removeEventListener('throttledResize', this._adaptPriorityNav);
  }
}

export { BoltNavPriority };
