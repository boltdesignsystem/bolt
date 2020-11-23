import '@bolt/core-v3.x/utils/optimized-resize';
import hoverintent from 'hoverintent';

export class BoltPageHeaderNav {
  constructor(menu, options = {}) {
    this.options = {
      breakpoint: '1000px',
      mobile: true,
      desktop: true,
      isNested: false,
      onNestedNavToggle: null,
      closeOnEscape: false,
      ...options,
    };

    this.state = {
      activeMenu: {
        trigger: null,
        menu: null,
      },
      activeTrail: [],
      isMobile: null,
      mobileIsSetup: null,
      desktopIsSetup: null,
    };

    this.menu = menu;

    this.init();
  }

  static allMenus = [];

  addToAllMenus() {
    const activeMenus = BoltPageHeaderNav.allMenus;
    if (!activeMenus.includes(this)) {
      activeMenus.push(this);
    }
  }

  getAllActiveMenus() {
    return BoltPageHeaderNav.allMenus.filter(
      menu => menu.state.activeTrail.trigger || menu.state.activeMenu.trigger,
    );
  }

  init() {
    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleEscapeKeypress = this.handleEscapeKeypress.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleExternalClick = this.handleExternalClick.bind(this);
    this.updateResponsiveMenu = this.updateResponsiveMenu.bind(this);

    this.updateResponsiveMenu();
    this.addToAllMenus();
    window.addEventListener('throttledResize', this.updateResponsiveMenu);
  }

  getMenu(trigger) {
    return this.menu.find(item => item.trigger === trigger);
  }

  updateResponsiveMenu() {
    if (window.matchMedia(`(max-width: ${this.options.breakpoint})`).matches) {
      if (this.state.desktopIsSetup) {
        this.resetDesktopMenu();
      }
      if (this.options.mobile && !this.state.mobileIsSetup) {
        this.setupMobileMenu();
      }
      this.state.isMobile = true;
    } else {
      if (this.state.mobileIsSetup) {
        this.resetMobileMenu();
      }
      if (this.options.desktop && !this.state.desktopIsSetup) {
        this.setupDesktopMenu();
      }
      this.state.isMobile = false;
    }
  }

  setupMobileMenu() {
    this.addClickHandler(this.menu);
    this.state.mobileIsSetup = true;
  }

  resetMobileMenu() {
    this.resetActiveMenus();
    this.removeClickHandler(this.menu);
    this.state.mobileIsSetup = false;
  }

  setupDesktopMenu() {
    this.addHoverHandler(this.menu);
    this.addKeypressHandler(this.menu);
    this.state.desktopIsSetup = true;
  }

  resetDesktopMenu() {
    this.resetActiveMenus();
    this.hoverListeners.forEach(listener => listener.remove());
    this.removeKeypressHandler(this.menu);
    this.state.desktopIsSetup = false;
  }

  resetActiveMenus() {
    if (this.state.activeTrail.length) {
      this.state.activeTrail.forEach(el => this.hideMenu(el));
    } else if (this.state.activeMenu.trigger) {
      this.hideMenu(this.state.activeMenu.trigger);
    }
  }

  addClickHandler(menus = []) {
    menus.forEach(menu => {
      menu.trigger.addEventListener('click', this.clickHandler);
    });
  }

  removeClickHandler(menus = []) {
    menus.forEach(menu => {
      menu.trigger.removeEventListener('click', this.clickHandler);
    });
  }

  clickHandler(e) {
    const el = e.target.closest('button[aria-haspopup]');
    this.toggleMenu(el);
  }

  addKeypressHandler(menus = []) {
    menus.forEach(menu => {
      menu.trigger.addEventListener('keydown', this.handleKeypress);
    });
  }

  removeKeypressHandler(menus = []) {
    menus.forEach(menu => {
      menu.trigger.removeEventListener('keydown', this.handleKeypress);
    });
  }

  getKey(e) {
    if (e.key !== undefined) {
      return e.key;
    } else if (e.keyCode !== undefined) {
      return e.keyCode;
    }
  }

  handleKeypress(e) {
    switch (this.getKey(e)) {
      case 'Enter' || 13: // enter key
        this.toggleMenu(e.target);
        break;
      case ' ' || 32: // space key
        this.toggleMenu(e.target);
        break;
      case 'Escape' || 27: // escape key
        this.hideMenu(e.target);
        break;
    }
  }

  handleEscapeKeypress(e) {
    if (this.getKey(e) === 'Escape' || this.getKey(e) === 27) {
      this.state.activeMenu.trigger.focus();
      this.hideMenu(this.state.activeMenu.trigger);
      if (!this.state.activeTrail.length) {
        document.removeEventListener('keyup', this.handleEscapeKeypress);
      }
    }
  }

  addHoverHandler(menus = []) {
    // https://github.com/tristen/hoverintent#custom-options
    const opts = {
      timeout: 250,
    };

    this.hoverListeners = this.hoverListeners || [];

    menus.forEach(menu => {
      const { trigger, li } = menu;
      if (!li) return;
      const listener = hoverintent(
        li,
        e => {
          if (trigger.getAttribute('aria-expanded') !== 'true') {
            this.showMenu(trigger);
          }
        },
        e => {
          this.hideMenu(trigger);
        },
      ).options(opts);

      this.hoverListeners.push(listener);
    });
  }

  toggleMenu(el) {
    if (el.getAttribute('aria-expanded') !== 'true') {
      this.showMenu(el);
    } else {
      this.hideMenu(el);
    }
  }

  showMenu(el) {
    if (this.state.activeMenu.trigger && this.state.activeMenu.trigger !== el) {
      if (this.options.isNested) {
        this.state.activeMenu.menu.classList.remove('is-active');
      } else {
        this.hideMenu(this.state.activeMenu.trigger);
      }
    }

    el.setAttribute('aria-expanded', 'true');
    this.setState(el);
    this.options.isNested && this.setActiveMenu(el);

    if (!this.state.isMobile) {
      document.addEventListener('click', this.handleExternalClick);
    }

    if (this.options.closeOnEscape) {
      document.addEventListener('keyup', this.handleEscapeKeypress);
    }
  }

  hideMenu(el) {
    el.setAttribute('aria-expanded', 'false');
    this.setState(el, false);
    this.options.isNested && this.setActiveMenu(el, false);

    if (!this.state.isMobile) {
      document.removeEventListener('click', this.handleExternalClick);
    }
  }

  setState(target, isActive = true) {
    if (isActive) {
      this.state.activeMenu = this.getMenu(target);
    } else {
      if (this.state.activeMenu.trigger === target) {
        this.state.activeMenu = {
          trigger: null,
          menu: null,
        };
      }
    }
  }

  setActiveMenu(target, isActive = true) {
    const { trigger, menu, ul, isTopLevel } = this.getMenu(target);

    if (isActive) {
      menu.classList.add('is-active');
      !isTopLevel && ul?.classList.add('is-covered');
      this.setActiveTrail(trigger);
    } else {
      menu.classList.remove('is-active');
      !isTopLevel && ul?.classList.remove('is-covered');
      this.setActiveTrail(trigger, false);
    }
  }

  setActiveTrail(target, isActive = true) {
    const { trigger, ul, li, menu } = this.getMenu(target);
    const trail = [trigger, menu, ul, li];

    if (isActive) {
      if (!this.state.activeTrail.includes(trigger)) {
        this.state.activeTrail.push(trigger);
      }
      if (this.state.activeTrail.length) {
        this.handleNestedNavToggle();

        trail.forEach(el => el?.classList.add('is-active-trail'));
      }
    } else {
      this.state.activeTrail = this.state.activeTrail.filter(
        el => el !== target,
      );

      trail.forEach(el => el?.classList.remove('is-active-trail'));

      if (this.state.activeTrail.length) {
        this.showMenu(
          this.state.activeTrail[this.state.activeTrail.length - 1],
        );
      } else {
        this.handleNestedNavToggle(false);
      }
    }
  }

  handleNestedNavToggle(open = true) {
    if (typeof this.options.onNestedNavToggle === 'function') {
      this.options.onNestedNavToggle(open);
    }
  }

  handleExternalClick(e) {
    let el = e.target;

    if (
      this.state.activeMenu.trigger?.contains(el) ||
      this.state.activeMenu.menu?.contains(el)
    ) {
      return;
    }

    this.hideMenu(this.state.activeMenu.trigger);
  }
}

export class BoltPageHeaderActionNav extends BoltPageHeaderNav {
  setupDesktopMenu() {
    this.addClickHandler(this.menu);
    this.state.desktopIsSetup = true;
  }

  resetDesktopMenu() {
    this.removeClickHandler(this.menu);
    this.state.desktopIsSetup = false;
  }

  showMenu(el) {
    super.showMenu(el);

    const searchInput = this.state.activeMenu.menu.querySelector(
      '.js-c-typeahead__input',
    );

    if (searchInput) {
      setTimeout(() => {
        searchInput.focus();
      }, 250);
    }
  }

  canHideSearch() {
    const typeahead = this.state.activeMenu.menu.querySelector(
      'bolt-typeahead',
    );
    const searchInput = this.state.activeMenu.menu.querySelector(
      '.js-c-typeahead__input',
    );

    let canHideSearch = true;

    if (!(typeahead && searchInput)) {
      return canHideSearch;
    }

    const currentLength = searchInput.value.length;

    if (this.searchLength > 0 && !currentLength) {
      this.searchWasCleared = true;
    }

    this.searchLength = currentLength;

    canHideSearch =
      (!currentLength && !this.searchWasCleared) ||
      !typeahead.contains(document.activeElement);

    if (this.searchWasCleared) {
      this.searchWasCleared = false;
    }

    return canHideSearch;
  }

  handleEscapeKeypress(e) {
    const allActiveMenus = this.getAllActiveMenus();
    const canHideActionMenu =
      allActiveMenus.length === 1 && allActiveMenus[0] === this;

    if (!canHideActionMenu || !this.canHideSearch()) return;

    if (this.getKey(e) === 'Escape' || this.getKey(e) === 27) {
      this.state.activeMenu.trigger.focus();
      this.hideMenu(this.state.activeMenu.trigger);
      if (!this.state.activeTrail.length) {
        document.removeEventListener('keyup', this.handleEscapeKeypress);
      }
    }
  }
}
