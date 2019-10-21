import {
  defineContext,
  withContext,
  define,
  props,
  containsTagName,
  getUniqueId,
  whichTransitionEvent,
  waitForTransitionEnd,
} from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';

import classNames from 'classnames/bind';
import styles from './tabs.scss';
import schema from '../tabs.schema.yml';

// define which specific props to provide to children that subscribe
export const TabsContext = defineContext({
  inset: 'auto',
  panelSpacing: 'small', // no need to pass `labelSpacing`, only used in this template
  uuid: '',
  selectedIndex: 0,
});

let cx = classNames.bind(styles);

@define
class BoltTabs extends withContext(withLitHtml()) {
  static is = 'bolt-tabs';

  static props = {
    align: props.string,
    inset: props.string,
    labelSpacing: props.string,
    panelSpacing: props.string,
    variant: props.string,
    // uuid: props.string, @todo: make `uuid` a prop, for now internal only
    // `selectedTab` is a 1-based index, everywhere else is 0-based
    selectedTab: {
      ...props.number,
      ...{ default: schema.properties.selected_tab.default },
    },
    menuIsOpen: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  constructor(self) {
    self = super(self);
    self.schema = this.getModifiedSchema(schema);

    this.transitionEvent = whichTransitionEvent();
    this._resizeMenu = this._resizeMenu.bind(this);
    this._handleExternalClicks = this._handleExternalClicks.bind(this);
    this._handleDropdownToggle = this._handleDropdownToggle.bind(this);
    this._waitForDropdownToFinishAnimating = this._waitForDropdownToFinishAnimating.bind(
      this,
    );

    return self;
  }

  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get provides() {
    return [TabsContext];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    const { selectedTab } = this.validateProps(this.props);

    const panels = this.tabPanels;

    // Set a unique identifier for each tab instance. Will be different on each load. For constant and/or readable `id`s, this must be exposed as a prop.
    this.tabsId = bolt.config.env === 'test' ? '12345' : getUniqueId();

    // Convert tab index to 0-based numbering with some additional validation
    this.selectedIndex = this.validateIndex(selectedTab - 1);

    // Check if any panels have `selected` prop set, return index
    // const preselectedIndex = Array.from(panels).findIndex(element => {
    //   return element.hasAttribute('selected');
    // });

    // @todo: replace this with the block above once `findIndex` can be safely polyfilled
    const panelsArray = Array.from(panels);
    const preselectedIndex = panelsArray.indexOf(
      panelsArray.find(element => element.hasAttribute('selected')),
    );

    // If there is a preselected panel, it overrides `selectedTab` prop
    const initialSelectedTab =
      preselectedIndex !== -1 ? preselectedIndex : this.selectedIndex;

    this.setSelectedTab(initialSelectedTab);

    // @todo: Only need this if we want to listen for `selected` attribute changes on children. For now, just do a one-time check on setup.
    // this.addEventListener('tabs:setSelectedTab', e => {
    //   const newIndex = e.detail.selectedIndex;
    //   if (this.selectedIndex !== newIndex) {
    //     if (Array.from(panels).includes(e.target)) {
    //       this.setSelectedTab(newIndex);
    //     }
    //   }
    // });
  }

  // @todo: move to BoltBase and/or move into a standalone addon function components can opt into
  ssrHydrationPrep() {
    if (this._ssrHydrationPrep) return;
    const parentElem = this;
    const initialNodesToKeep = Array.from(
      this.querySelectorAll('[ssr-hydrate]'),
    );
    const nodesToClean = [];

    initialNodesToKeep.forEach(item => {
      const hydrationType = item.getAttribute('ssr-hydrate');

      switch (hydrationType) {
        case 'keep-children':
          while (item.firstChild) {
            parentElem.appendChild(item.firstChild);
          }
          break;
        case 'keep':
        default:
          parentElem.appendChild(item);
          nodesToClean.push(item); // track the [ssr-hydrate] nodes to clean up later
      }
    });

    // grab an array of the pre-rendered DOM nodes to potentially remove
    const nodesToRemove = Array.from(
      parentElem.querySelectorAll('[class*="c-bolt-tabs"]:not([ssr-hydrate])'),
    );

    // remove pre-rendered DOM nodes not containing children with [ssr-hydrate] attributes
    nodesToRemove.forEach(node => {
      if (!node.closest(['[ssr-hydrate]'])) {
        node.parentElement.removeChild(node);
      }
    });

    // cleanup any [ssr-hydrate] nodes afterward
    nodesToClean.forEach(node => {
      node.removeAttribute('ssr-hydrate');
    });

    this._ssrHydrationPrep = true;
  }

  // account for nested tabs when rendering to the Shadow DOM + Light DOM
  get tabPanels() {
    if (this.useShadow) {
      return Array.from(this.children).filter(
        child => child.tagName === 'BOLT-TAB-PANEL',
      );
    } else if (this.slots && this.slots.default !== undefined) {
      return Array.from(this.slots.default).filter(
        child => child.tagName === 'BOLT-TAB-PANEL',
      );
    } else {
      return this.getElementsByTagName('bolt-tab-panel');
    }
  }

  // Get tab labels, excluding duplicate labels in the "show more" menu
  get tabLabels() {
    return this.renderRoot.querySelectorAll(
      '.c-bolt-tabs__label:not(.c-bolt-tabs__label--is-duplicate)',
    );
  }

  validateIndex(index) {
    const panels = this.tabPanels;

    return index < 0 ? 0 : index >= panels.length ? panels.length - 1 : index;
  }

  addMutationObserver() {
    const self = this;

    // todo: this.useShadow is a temporary workaround until mutation observer works better with light DOM
    if (window.MutationObserver && this.useShadow) {
      // Re-generate slots + re-render when mutations are observed
      const mutationCallback = (mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            // @todo: add, remove, reorder
            if (containsTagName(mutation.addedNodes, 'BOLT-TAB-PANEL')) {
              self.triggerUpdate();
            }
          } else if (mutation.type === 'attributes') {
            // @todo: see `bolt-accordion` as reference for WIP attribute mutation handler
          }
        }
      };

      // Create an observer instance linked to the callback function
      self.observer = new MutationObserver(mutationCallback);

      // Start observing the target node for configured mutations
      self.observer.observe(this, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
  }

  // 0-based
  setSelectedTab(index) {
    const newIndex = this.validateIndex(index);

    if (newIndex !== this.selectedIndex) {
      this.selectedIndex = newIndex;

      this.setAttribute('selected-tab', newIndex + 1); // Convert `selectedTab` back to 1-based scale
      this.contexts.get(TabsContext).selectedIndex = newIndex; // Keep context 0-based

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
            el.update && el.update();
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
    const panels = this.tabPanels;
    let newIndex;

    switch (e.keyCode) {
      case 35: // end key
        newIndex = panels.length - 1;
        break;
      case 36: // home key
        newIndex = 0;
        break;
      case 37: // left arrow
        newIndex = this.selectedIndex > 0 ? this.selectedIndex - 1 : 0;
        break;
      case 39: // right arrow
        newIndex =
          this.selectedIndex < panels.length - 1
            ? this.selectedIndex + 1
            : panels.length - 1;
        break;
    }

    // If any of the above keys were pressed, update selected tab and set focus
    if (newIndex !== undefined) {
      this.renderRoot.querySelectorAll('[role="tab"]')[newIndex].focus();
      this.setSelectedTab(newIndex);

      // If menu button is displayed, handle keying in and out of the dropdown
      if (!this.menuButtonIsHidden) {
        if (this.tabLabels[newIndex].classList.contains('is-hidden')) {
          !this.menuIsOpen && this.openDropdown();
        } else {
          this.menuIsOpen && this.closeDropdown();
        }
      }
    }
  }

  template() {
    const { align, labelSpacing, panelSpacing, inset } = this.validateProps(
      this.props,
    );

    const classes = cx('c-bolt-tabs', {
      [`c-bolt-tabs--align-${align}`]: align,
      [`c-bolt-tabs--inset`]: inset === 'auto' || inset === 'on',
      [`c-bolt-tabs--show-dropdown`]: this.menuIsOpen,
    });
    const labelInnerClasses = cx('c-bolt-tabs__label-inner');
    const labelTextClasses = cx('c-bolt-tabs__label-text');
    const listClasses = cx('c-bolt-tabs__nav', {});
    const panelsClasses = cx('c-bolt-tabs__panels-container');

    const tabButtons = isDropdown => {
      let buttons = [];

      Array.from(this.tabPanels).forEach((item, index) => {
        const isSelected = index === this.selectedIndex;
        const label = item.querySelector('[slot="label"]');
        const labelClasses = cx('c-bolt-tabs__label', 'c-bolt-tabs__item', {
          [`c-bolt-tabs__label--spacing-${labelSpacing}`]: labelSpacing,
          [`c-bolt-tabs__label--is-duplicate`]: isDropdown,
          [`c-bolt-tabs__label--vertical-border`]: isDropdown,
        });
        const labelText = label ? label.textContent : `Tab label ${index + 1}`; // @todo: add icon support? how to handle missing labels?
        const labelId = isDropdown
          ? `tab-dropdown-${this.tabsId}-${index + 1}`
          : `tab-${this.tabsId}-${index + 1}`; // Use 1-based Id's
        const panelId = `tab-panel-${this.tabsId}-${index + 1}`; // Use 1-based Id's

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
            @click=${e => this.setSelectedTab(index)}
            @keydown=${e => this.handleOnKeydown(e)}
            @keyup=${e => this.handleOnKeyup(e)}
          >
            <span class="${labelInnerClasses}"
              ><span class="${labelTextClasses}">${labelText}</span></span
            >
          </bolt-trigger>
        `;

        buttons.push(button);
      });

      return buttons;
    };

    const dropdown = () => {
      return html`
        <div
          class="${cx(
            'c-bolt-tabs__item',
            'c-bolt-tabs__show-more',
            'is-invisible',
          )}"
        >
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded="${this.menuIsOpen}"
            class="${cx('c-bolt-tabs__button', 'c-bolt-tabs__show-button')}"
          >
            <span class="${cx('c-bolt-tabs__show-text')}">
              ${this.props.moreText ? this.props.moreText : 'More'}
            </span>
            <span class="${cx('c-bolt-tabs__show-icon')}">
              <bolt-icon name="chevron-down"></bolt-icon>
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
        <div class="${listClasses}" role="tablist">
          ${tabButtons()} ${dropdown()}
        </div>
        <div class="${panelsClasses}">
          ${this.slots.default ? this.slot('default') : ''}
        </div>
      </div>
    `;
  }

  _hideLabel(el) {
    el.classList.add('is-hidden');
    el.setAttribute('aria-hidden', 'true');
  }

  _showLabel(el) {
    el.classList.remove('is-hidden');
    el.setAttribute('aria-hidden', 'false');
  }

  _resizeMenu() {
    this.classList.add('is-resizing');

    const navWidth = this.primaryMenu.offsetWidth;
    const buttonWidth = this.dropdownButton.offsetWidth;
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

    // is invisible on render so we can get width without flashing it onscreen
    this.showMoreItem.classList.remove('is-invisible');
    this.classList.remove('is-resizing');
  }

  _handleExternalClicks(e) {
    // use path not target, target won't work in shadow dom
    const el = this.useShadow ? e.path[0] : e.target;

    // If not inside "show more" container OR you clicked on a different set of tabs
    if (
      el.closest('.c-bolt-tabs__show-more') === null ||
      !this.renderRoot.contains(el)
    ) {
      this.closeDropdown();
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

  rendered() {
    super.rendered && super.rendered();

    if (!this.ready) {
      // Now that the template has rendered, we can query the page for the parts we need to update after the fact
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

      Promise.all([customElements.whenDefined('bolt-trigger')]).then(_ => {
        this._resizeMenu();
      });

      window.addEventListener('optimizedResize', this._resizeMenu);
      this.dropdownButton.addEventListener('click', this._handleDropdownToggle);

      this.ready = true;
      this.setAttribute('ready', '');
      this.dispatchEvent(new CustomEvent('tabs:ready'));
    }

    if (!this.observer) {
      this.addMutationObserver();
    }
  }

  disconnected() {
    super.disconnected && super.disconnected();

    this.ready = false;
    this.removeAttribute('ready');

    window.removeEventListener('optimizedResize', this._resizeMenu);
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
    const { inset, panelSpacing, selectedTab } = this.validateProps(this.props);

    this.selectedIndex = this.validateIndex(selectedTab - 1);

    this.contexts.get(TabsContext).inset = inset;
    this.contexts.get(TabsContext).panelSpacing = panelSpacing;
    this.contexts.get(TabsContext).uuid = this.tabsId;
    this.contexts.get(TabsContext).selectedIndex = this.selectedIndex;
    this.contexts.get(TabsContext).tabPanels = this.tabPanels;

    return html`
      ${this.addStyles([styles])} ${this.template()}
    `;
  }
}

// Create a custom 'optimizedResize' event that works just like window.resize but is more performant because it
// won't fire before a previous event is complete.
// This was adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function() {
  function throttle(type, name, obj) {
    obj = obj || window;
    let running = false;

    function func() {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    }
    obj.addEventListener(type, func);
  }

  // Initialize on window.resize event.  Note that throttle can also be initialized on any type of event,
  // such as scroll.
  throttle('resize', 'optimizedResize');
})();

export { BoltTabs };
