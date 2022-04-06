import {
  customElement,
  BoltElement,
  html,
  unsafeCSS,
  unsafeHTML,
} from '@bolt/element';
import {
  containsTagName,
  getUniqueId,
  whichTransitionEvent,
  waitForTransitionEnd,
} from '@bolt/core-v3.x/utils';
import { withContext } from 'wc-context/lit-element';

import { smoothScroll } from '@bolt/components-smooth-scroll/src/smooth-scroll';
import URLSearchParams from '@ungap/url-search-params'; // URLSearchParams poly for older browsers
import { iconChevronDown } from '@bolt/elements-icon/src/icons/js/chevron-down';
import classNames from 'classnames/bind';
import iconStyles from '@bolt/elements-icon/index.scss';
import styles from './tabs.scss';
import schema from '../tabs.schema';

import '@bolt/core-v3.x/utils/optimized-resize';

let cx = classNames.bind(styles);

@customElement('bolt-tabs')
class BoltTabs extends withContext(BoltElement) {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      menuIsOpen: { type: Boolean },
      panels: { type: Object },
      uuid: { type: String },
    };
  }

  constructor() {
    super();
    this.uuid = bolt.config.env === 'test' ? '12345' : getUniqueId(); // Set a unique identifier for each Tabs instance
    this.menuIsOpen = false;
    this.panels = [];
    this.transitionEvent = whichTransitionEvent();
  }

  static get providedContexts() {
    return {
      inset: { property: 'inset' },
      panels: { property: 'panels' },
      panelSpacing: { property: 'panelSpacing' }, // no need to pass `labelSpacing`, only used in this template
      selectedTab: { property: 'selectedTab' }, // 1-based
      uuid: { property: 'uuid' },
    };
  }

  static get styles() {
    return [unsafeCSS(styles), unsafeCSS(iconStyles)];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    this._resizeMenu = this._resizeMenu.bind(this);
    this._handleExternalClicks = this._handleExternalClicks.bind(this);
    this._handleDropdownToggle = this._handleDropdownToggle.bind(this);
    this._waitForDropdownToFinishAnimating = this._waitForDropdownToFinishAnimating.bind(
      this,
    );
  }

  setInitialTab() {
    // Check if any panels have `selected` prop set, return index
    // const preselectedIndex = Array.from(panels).findIndex(element => {
    //   return element.hasAttribute('selected');
    // });

    // @todo: replace this with the block above once `findIndex` can be safely polyfilled
    const preselectedIndex = this.panels.indexOf(
      this.panels.find(element => element.hasAttribute('selected')),
    );

    // If there is a preselected panel, it overrides `selectedTab` prop
    const initialSelectedTab =
      preselectedIndex !== -1
        ? preselectedIndex
        : this.validateIndex(this.selectedTab - 1);

    // If there is a deep link in the URL (i.e. a query param with `tab` as name, `TAB_ID` as value), it overrides`initialSelectedTab`
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTabParam = urlParams.get('selected-tab');
    const selectedTabParamIndex = this.panels.indexOf(
      this.panels.find(element => element.id === selectedTabParam),
    );

    if (selectedTabParamIndex !== -1) {
      this.setSelectedTab(selectedTabParamIndex);
      this.shouldScrollIntoView = true;
    } else {
      this.setSelectedTab(initialSelectedTab);
    }
  }

  validateIndex(index) {
    return index < 0
      ? 0
      : index >= this.panels.length
      ? this.panels.length - 1
      : index;
  }

  addMutationObserver() {
    // todo: this.useShadow is a temporary workaround until mutation observer works better with light DOM
    if (window.MutationObserver && this.useShadow) {
      // Re-generate slots + re-render when mutations are observed
      const mutationCallback = (mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            // @todo: add, remove, reorder
            if (containsTagName(mutation.addedNodes, 'BOLT-TAB-PANEL')) {
              this.triggerUpdate();
            }
          } else if (mutation.type === 'attributes') {
            // @todo: see `bolt-accordion` as reference for WIP attribute mutation handler
          }
        }
      };

      // Create an observer instance linked to the callback function
      this.observer = new MutationObserver(mutationCallback);

      // Start observing the target node for configured mutations
      this.observer.observe(this, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
  }

  // 0-based
  setSelectedTab(index) {
    const newIndex = this.validateIndex(index);

    if (newIndex !== this.selectedTab - 1) {
      this.setAttribute('selected-tab', newIndex + 1); // Convert `selectedTab` back to 1-based scale

      // set timeout allows time for sub component to re-render, better that than putting this on the sub component where it'll be fired many more times than needed
      setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent('bolt:layout-size-changed', {
            bubbles: true,
          }),
        );
        const elementsToUpdate = this.querySelectorAll('[will-update]');
        if (elementsToUpdate.length) {
          elementsToUpdate.forEach(el => {
            el.updateLayout && el.updateLayout();
          });
        }
      }, 0);
    }
  }

  handleOnKeydown(e) {
    switch (e.keyCode) {
      case 35: // end key
      case 36: // home key
      case 37: // left arrow
      case 39: // right arrow
        // Prevent default horizontal scrollbar from shifting before `this.scrollIntoView()` kicks in
        e.preventDefault();
        break;
    }
  }

  handleOnKeyup(e) {
    const index = this.selectedTab - 1;
    let newIndex;

    switch (e.keyCode) {
      case 35: // end key
        newIndex = this.panels.length - 1;
        break;
      case 36: // home key
        newIndex = 0;
        break;
      case 37: // left arrow
        newIndex = index > 0 ? index - 1 : 0;
        break;
      case 39: // right arrow
        newIndex =
          index < this.panels.length - 1 ? index + 1 : this.panels.length - 1;
        break;
    }

    // If any of the above keys were pressed, toggle the menu (if needed), update selected tab, and set focus.
    if (newIndex !== undefined) {
      // Get tab labels, excluding duplicate labels in the "show more" menu
      const tabLabels = this.renderRoot.querySelectorAll(
        '.c-bolt-tabs__label:not(.c-bolt-tabs__label--is-duplicate)',
      );
      // Get tab labels in the "show more" menu
      const dropdownTabLabels = this.renderRoot.querySelectorAll(
        '.c-bolt-tabs__label.c-bolt-tabs__label--is-duplicate',
      );

      // If menu button is displayed, handle keying in and out of the dropdown. Do this before setting focus, or target will be hidden and focus may not be set.
      if (!this.menuButtonIsHidden) {
        if (tabLabels[newIndex].classList.contains('is-hidden')) {
          !this.menuIsOpen && this.openDropdown();
        } else {
          this.menuIsOpen && this.closeDropdown();
        }
      }

      tabLabels[newIndex].classList.contains('is-hidden')
        ? dropdownTabLabels[newIndex].focus()
        : tabLabels[newIndex].focus();

      this.setSelectedTab(newIndex);
    }
  }

  _hideLabel(el) {
    el.classList.add('is-hidden');
    el.setAttribute('aria-hidden', 'true');
  }

  _showLabel(el) {
    el.classList.remove('is-hidden');
    el.setAttribute('aria-hidden', 'false');
  }

  _getShowMoreButtonWidth() {
    let width = this.dropdownButton.offsetWidth;

    // If button is hidden, we need to show it before we get the width.
    // Explicitly check for 'is-hidden', as we'll be re-adding the class when we're done.
    if (this.showMoreItem.classList.contains('is-hidden')) {
      this.showMoreItem.classList.add('is-invisible');
      this.showMoreItem.classList.remove('is-hidden');
      width = this.dropdownButton.offsetWidth;
      this.showMoreItem.classList.add('is-hidden');
      this.showMoreItem.classList.remove('is-invisible');
    }

    return width;
  }

  _resizeMenu() {
    const navWidth = this.primaryMenu.offsetWidth;

    // If nav has no width, assume it is hidden and must be resized when it is shown, e.g. it is in an accordion
    if (navWidth === 0) {
      // If not visible, add attribute so that it can be found by other components and updated manually
      this.setAttribute('will-update', '');
      return;
    }

    // Remove attribute so that tabs will not be resized unnecessarily
    this.removeAttribute('will-update', '');

    this.classList.add('is-resizing');
    const buttonWidth = this._getShowMoreButtonWidth();
    const tolerance = 5; // Extra wiggle room when calculating how many items can fit
    const maxWidth = navWidth - tolerance - buttonWidth;

    // hide items that won't fit in the Primary
    let currentWidth = 0;
    let hiddenItems = [];
    let isOverflowing = false; // keep track when the items in the nav stop fitting

    // reveal all items for the calculation
    this.allItems.forEach(item => {
      this._showLabel(item);
    });

    this.primaryItems.forEach((item, i) => {
      const itemFits = currentWidth + item.offsetWidth <= maxWidth;
      // make sure the items fit + we haven't already started to encounter items that don't
      if (itemFits && !isOverflowing) {
        currentWidth += item.offsetWidth;
      } else {
        isOverflowing = true;
        this._hideLabel(item);
        hiddenItems.push(i);
      }
    });

    // toggle the visibility of More button and items in Secondary
    if (hiddenItems.length) {
      this.dropdownItems.forEach((item, i) => {
        if (!hiddenItems.includes(i)) {
          this._hideLabel(item);
        }
      });
      this.menuButtonIsHidden = false;
    } else {
      this.menuIsOpen = false;
      this.removeAttribute('open');
      this.showMoreItem.classList.add('is-hidden');
      this.showMoreItem.setAttribute('aria-hidden', 'true');
      this.menuButtonIsHidden = true;

      this.container.classList.remove('c-bolt-tabs--show-dropdown');
      this.dropdownButton.classList.remove('is-active');
      this.dropdownButton.setAttribute('aria-expanded', false);
    }

    this.classList.remove('is-resizing');
  }

  _handleExternalClicks(e) {
    // use composedPath not target, target won't work in shadow dom
    const el = this.useShadow ? e.composedPath()[0] : e.target;

    // If not inside "show more" container OR you clicked on a different set of tabs
    if (
      el.closest('.c-bolt-tabs__show-more') === null ||
      !this.renderRoot.contains(el)
    ) {
      this.menuIsOpen && this.closeDropdown();
      document.removeEventListener('click', this._handleExternalClicks);
    }
  }

  _handleDropdownToggle(e) {
    e.preventDefault();
    this.menuIsOpen = !this.menuIsOpen;
    this.menuIsOpen ? this.openDropdown() : this.closeDropdown();
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

    // Wait until now to add event listener, otherwise we have to stop propagation to avoid immediate open/close
    if (self.menuIsOpen) {
      document.addEventListener('click', self._handleExternalClicks);
    }

    self.priorityDropdown.removeEventListener(
      self.transitionEvent,
      self._waitForDropdownToFinishAnimating,
      true,
    );
  }

  openDropdown() {
    this.menuIsOpen = true;
    this.setAttribute('open', true);
    this.container.classList.add('c-bolt-tabs--show-dropdown');
    this.classList.add('is-opening');
    this.dropdownButton.classList.add('is-active');
    this.dropdownButton.setAttribute('aria-expanded', true);

    this.priorityDropdown.addEventListener(
      this.transitionEvent,
      this._waitForDropdownToFinishAnimating,
      true,
    );
  }

  closeDropdown() {
    this.menuIsOpen = false;
    this.removeAttribute('open');
    this.classList.add('is-closing');
    this.container.classList.remove('c-bolt-tabs--show-dropdown');
    this.dropdownButton.classList.remove('is-active');
    this.dropdownButton.setAttribute('aria-expanded', false);

    this.priorityDropdown.addEventListener(
      this.transitionEvent,
      this._waitForDropdownToFinishAnimating,
    );
  }

  // Public method called by Accordion when DOM changes and Tabs needs to update
  updateLayout() {
    this._resizeMenu();
  }

  setupDropdown() {
    this.container = this.renderRoot.querySelector('.c-bolt-tabs');
    this.primaryMenu = this.renderRoot.querySelector('.c-bolt-tabs__nav');
    this.allItems = this.renderRoot.querySelectorAll('.c-bolt-tabs__item');
    this.primaryItems = this.renderRoot.querySelectorAll(
      '.c-bolt-tabs__nav > .c-bolt-tabs__item:not(.c-bolt-tabs__show-more)',
    );
    this.dropdownItems = this.renderRoot.querySelectorAll(
      '.c-bolt-tabs__dropdown .c-bolt-tabs__item',
    );
    this.showMoreItem = this.renderRoot.querySelector(
      '.c-bolt-tabs__show-more',
    );
    this.dropdownButton = this.renderRoot.querySelector(
      '.c-bolt-tabs__show-button',
    );
    this.priorityDropdown = this.renderRoot.querySelector(
      '.c-bolt-tabs__dropdown',
    );
    customElements.whenDefined('bolt-trigger').then(async () => {
      const tabLabels = this.renderRoot.querySelectorAll('.c-bolt-tabs__label');

      // Tab Labels are bolt-trigger elements. Wait for them to be ready or _resizeMenu() will miscalculate widths.
      await Promise.all(
        [...tabLabels].map(async el => await el.updateComplete),
      );

      this._resizeMenu();
    });

    // This typically fires only once, but it's possible for it to fire twice. Remove event handlers just in case.
    window.removeEventListener('throttledResize', this._resizeMenu);
    document.removeEventListener('click', this._handleExternalClicks);

    // Then, add resize event handlers
    window.addEventListener('throttledResize', this._resizeMenu);
    this.dropdownButton.addEventListener('click', this._handleDropdownToggle);
  }

  setupAutoscroll() {
    if (this.shouldScrollIntoView) {
      let shouldResetScroll;

      if (window.history?.scrollRestoration === 'auto') {
        // If you are refreshing the page and using a browser with `scrollRestoration`,
        // temporarily disable `scrollRestoration` while we scroll to the element, avoids janky scroll.
        // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
        window.history.scrollRestoration = 'manual';
        shouldResetScroll = true;
      }

      setTimeout(() => {
        // Must scroll to focusable element or smoothScroll will set tabindex="-1" on target element.
        // @see https://github.com/cferdinandi/smooth-scroll/blob/master/src/core.js#L320
        const targetTab = this.renderRoot.querySelector(
          'bolt-trigger[aria-selected="true"]',
        );

        smoothScroll.animateScroll(targetTab, 0, {
          header: this.scrollOffsetSelector,
          offset: this.scrollOffset || 0,
          speed: 750,
          easing: 'easeInOutCubic',
          updateURL: false,
        });

        this.shouldScrollIntoView = false;

        if (shouldResetScroll) {
          setTimeout(() => {
            window.history.scrollRestoration = 'auto';
          }, 1000); // wait another second to turn 'scrollRestoration' back on, just to be safe
        }
      }, 750); // Must let the page load or scroll is not at all "smooth", can reduce to 500ms but not much less
    }
  }

  updated(changedProperties) {
    super.updated && super.updated(changedProperties);

    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'panels') {
        if (this.panels.length) {
          // Wait for panels to be set (and have length) before proceeding with the rest of the Tabs setup.
          this.setupDropdown();
          this.setupAutoscroll();

          if (!this.observer) {
            this.addMutationObserver();
          }

          if (!this.ready) {
            this.ready = true;
            this.setAttribute('ready', '');
            this.dispatchEvent(new CustomEvent('tabs:ready'));
          }
        }
      }
    });
  }

  async firstUpdated() {
    // Use `slotMap` not `querySelectorAll` so that we don't get nested panels
    this.panels = this.slotMap
      .get('default')
      .filter(child => child.tagName === 'BOLT-TAB-PANEL');

    // Wait to set initial tab until after `this.panels` has been properly set
    this.setInitialTab();

    // Wait until after `this.panels` is set and component re-renders before calling super which dispaches "ready" event
    await this.updateComplete;
    super.firstUpdated && super.firstUpdated();
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();

    this.ready = false;
    this.removeAttribute('ready');

    window.removeEventListener('throttledResize', this._resizeMenu);
    document.removeEventListener('click', this._handleExternalClicks);
    this.dropdownButton &&
      this.dropdownButton.removeEventListener(
        'click',
        this._handleDropdownToggle,
      );

    // remove MutationObserver if supported + exists
    if (window.MutationObserver && this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    const classes = cx('c-bolt-tabs', {
      [`c-bolt-tabs--align-${this.align}`]: this.align,
      [`c-bolt-tabs--inset`]: this.inset === 'auto' || this.inset === 'on',
      [`c-bolt-tabs--show-dropdown`]: this.menuIsOpen,
    });

    const handleLabelClick = (e, index) => {
      this.setSelectedTab(index);
      this.menuIsOpen && this.closeDropdown();
    };

    const tabButtons = isDropdown => {
      let buttons = [];

      this.panels.forEach((item, index) => {
        const isSelected = index === this.selectedTab - 1;
        const label = item.querySelector('[slot="label"]');
        const labelClasses = cx('c-bolt-tabs__label', 'c-bolt-tabs__item', {
          [`c-bolt-tabs__label--spacing-${this.labelSpacing}`]: this
            .labelSpacing,
          [`c-bolt-tabs__label--is-duplicate`]: isDropdown,
          [`c-bolt-tabs__label--vertical-border`]: isDropdown,
        });
        const labelText = label ? label.textContent : `Tab label ${index + 1}`; // @todo: add icon support? how to handle missing labels?

        // Dropdowns are duplicate labels and get different ID prefix
        const labelPrefix = isDropdown ? 'tab-dropdown' : 'tab-label';

        const labelId = item.id
          ? `${labelPrefix}-${item.id}`
          : `${labelPrefix}-${this.uuid}-${index + 1}`; // Use 1-based Id's

        const panelId = item.id || `tab-panel-${this.uuid}-${index + 1}`; // Use 1-based Id's

        let button = html`
          <bolt-trigger
            class="${labelClasses}"
            no-outline
            display="${isDropdown ? 'block' : 'inline'}"
            role="tab"
            aria-selected="${isSelected}"
            aria-controls="${panelId}"
            id="${labelId}"
            tabindex="${isSelected ? 0 : -1}"
            @click=${e => handleLabelClick(e, index)}
            @keydown=${e => this.handleOnKeydown(e)}
            @keyup=${e => this.handleOnKeyup(e)}
          >
            <span class="${cx('c-bolt-tabs__label-inner')}"
              ><span class="${cx('c-bolt-tabs__label-text')}"
                >${labelText}</span
              ></span
            >
          </bolt-trigger>
        `;

        buttons.push(button);
      });

      return buttons;
    };

    const dropdown = () => {
      return html`
        <div class="${cx('c-bolt-tabs__item', 'c-bolt-tabs__show-more')}">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded="${this.menuIsOpen}"
            class="${cx('c-bolt-tabs__button', 'c-bolt-tabs__show-button')}"
            @keydown=${e => this.handleOnKeydown(e)}
            @keyup=${e => this.handleOnKeyup(e)}
          >
            <span class="${cx('c-bolt-tabs__show-text')}">
              ${this.dataset.boltMoreText || 'More'}
            </span>
            <span class="${cx('c-bolt-tabs__show-icon')}">
              ${unsafeHTML(iconChevronDown())}
            </span>
          </button>
          <div class="${cx('c-bolt-tabs__dropdown')}">
            <div class="${cx('c-bolt-tabs__dropdown-list')}">
              ${tabButtons(true)}
            </div>
          </div>
        </div>
      `;
    };

    return html`
      <div class="${classes}">
        <div class="${cx('c-bolt-tabs__nav')}" role="tablist">
          ${tabButtons()} ${dropdown()}
        </div>
        <div class="${cx('c-bolt-tabs__panels-container')}">
          ${this.slotMap.get('default') && this.slotify('default')}
        </div>
      </div>
    `;
  }
}

export { BoltTabs };
