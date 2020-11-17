import '@bolt/core-v3.x/utils/optimized-resize';
import hoverintent from 'hoverintent';

export class BoltPageHeaderMenu {
  constructor(buttons, options = {}) {
    this.options = {
      mobile: true,
      desktop: true,
      externalClick: false,
      isNested: false,
      ...options,
    };

    this.state = {
      activeMenu: {
        button: null,
        menu: null,
      },
      activeTrail: [],
      isMobile: null,
      mobileIsSetup: null,
      desktopIsSetup: null,
    };

    this.menu = this.getMenusArray(buttons);

    this.init();
  }

  init() {
    this.handleKeypress = this.handleKeypress.bind(this);
    this.updateResponsiveMenu = this.updateResponsiveMenu.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleExternalClick = this.handleExternalClick.bind(this);
    this.updateResponsiveMenu();
    window.addEventListener('throttledResize', this.updateResponsiveMenu);
  }

  getMenusArray(buttons = []) {
    const menus = [];
    let menu, container;
    buttons.forEach(button => {
      menu = button.nextElementSibling;
      // menu = button.parentNode.querySelector(
      //   '.js-bolt-page-header-nested-nav-list',
      // );
      container = button.closest('.c-bolt-page-header__nav-list-item');
      if (menu) {
        menus.push({ button, menu, container });
      }
    });
    return menus;
  }

  getMenu(button) {
    return this.menu.find(item => item.button === button);
  }

  updateResponsiveMenu() {
    if (window.matchMedia('(max-width: 62.499em)').matches) {
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
    this.addClickHandlers(this.menu);
    this.state.mobileIsSetup = true;
  }

  resetMobileMenu() {
    this.removeClickHandlers(this.menu);
    this.state.mobileIsSetup = false;
  }

  setupDesktopMenu() {
    this.addHoverHandler(this.menu);
    this.addKeypressHandler(this.menu);
    this.state.desktopIsSetup = true;
  }

  resetDesktopMenu() {
    this.hoverListeners.forEach(listener => listener.remove());
    this.removeKeypressHandler(this.menu);
    this.state.desktopIsSetup = false;
  }

  handleKeypress(e) {
    console.log('here?');
    const getKey = e => {
      if (e.key !== undefined) {
        return e.key;
      } else if (e.keyCode !== undefined) {
        return e.keyCode;
      }
    };

    switch (getKey(e)) {
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

  addKeypressHandler(menus = []) {
    menus.forEach(menu => {
      const { button } = menu;
      if (!button) return;
      button.addEventListener('keydown', this.handleKeypress);
    });
  }

  removeKeypressHandler(menus = []) {
    menus.forEach(menu => {
      const { button } = menu;
      if (!button) return;
      button.addEventListener('keydown', this.handleKeypress);
    });
  }

  addHoverHandler(menus = []) {
    const opts = {
      // sensitivity: 7,
      // interval: 100,
      timeout: 250,
      // handleFocus: true,
    };

    this.hoverListeners = this.hoverListeners || [];

    menus.forEach(menu => {
      const { button, container } = menu;
      if (!container) return;
      const listener = hoverintent(
        container,
        e => {
          if (button.getAttribute('aria-expanded') !== 'true') {
            this.showMenu(button);
          }
        },
        e => {
          this.hideMenu(button);
        },
      ).options(opts);

      this.hoverListeners.push(listener);
    });
  }

  addClickHandlers(menus = []) {
    menus.forEach(menu => {
      menu.button.addEventListener('click', this.clickHandler);
    });
  }

  removeClickHandlers(menus = []) {
    menus.forEach(menu => {
      menu.button.removeEventListener('click', this.clickHandler);
    });
  }

  clickHandler(e) {
    console.log(e);
    const el =
      e.target.closest('.js-bolt-page-header-expanded-button') ||
      e.target.closest('.js-bolt-page-header-nested-nav-list-trigger');
    this.toggleMenu(el);
  }

  toggleMenu(el) {
    if (el.getAttribute('aria-expanded') !== 'true') {
      this.showMenu(el);
    } else {
      this.hideMenu(el);
    }
  }

  showMenu(el) {
    if (this.state.activeMenu.button && this.state.activeMenu.button !== el) {
      this.hideMenu(this.state.activeMenu.button);
    }

    el.setAttribute('aria-expanded', 'true');
    this.setActiveMenu(el);
    if (this.options.isNested) {
      this.setParentClass(el);
      this.setActiveNavList(el);
    }

    // if (this.options.externalClick) {
    document.addEventListener('click', this.handleExternalClick);
    // }
  }

  hideMenu(el) {
    el.setAttribute('aria-expanded', 'false');
    this.setActiveMenu(el, false);
    if (this.options.isNested) {
      this.setParentClass(el, false);
      this.setActiveNavList(el, false);
    }
    // if (this.options.externalClick) {
    document.removeEventListener('click', this.handleExternalClick);
    // }
  }

  setActiveMenu(target, isActive = true) {
    // console.log(target);
    if (isActive) {
      this.state.activeMenu = this.getMenu(target);
    } else if (this.state.activeMenu.button === target) {
      this.state.activeMenu = {
        button: null,
        menu: null,
      };
    }
  }

  // handleNestedMenus
  setParentClass(el, coverParent = true) {
    const closestList = el.closest('.js-bolt-page-header-nested-nav-list');
    const closestListItem = el.closest('.js-bolt-page-header-nav-list-item');
    console.log(closestList);
    if (coverParent) {
      closestList?.classList.add('is-covered');
    } else {
      closestList?.classList.remove('is-covered');
    }
  }

  setActiveNavList(target, isActive = true) {
    if (isActive) {
      if (this.activeNavListTrigger && this.activeNavListTrigger !== target) {
        this.activeNavList.classList.remove('is-active');
      }
      this.activeNavListTrigger = target;
      this.activeNavList = target.parentNode.querySelector(
        '.js-bolt-page-header-nested-nav-list',
      );

      this.activeNavList.classList.add('is-active');

      if (!this.activeNavListTrail.includes(target)) {
        this.activeNavListTrail.push(target);
      }

      if (this.activeNavListTrail.length) {
        this.navContainer.classList.add('is-open');
      }

      this.setActiveTrail(target);
    } else {
      this.activeNavList.classList.remove('is-active');
      this.setActiveTrail(this.activeNavListTrigger, false);
      this.activeNavListTrigger = null;
      this.activeNavList = null;
      this.activeNavListTrail = this.activeNavListTrail.filter(
        el => el !== target,
      );

      if (this.activeNavListTrail.length) {
        this.setActiveNavList(
          this.activeNavListTrail[this.activeNavListTrail.length - 1],
        );
      } else {
        this.navContainer.classList.remove('is-open');
      }
    }
  }

  setActiveTrail(target, isActive = true) {
    const closestList = target.closest('.c-bolt-page-header__nav-list');
    const closestListItem = target.closest(
      '.c-bolt-page-header__nav-list-item',
    );
    if (isActive) {
      target.classList.add('is-active-trail');
      closestList.classList.add('is-active-trail');
      closestListItem.classList.add('is-active-trail');
    } else {
      target.classList.remove('is-active-trail');
      closestList.classList.remove('is-active-trail');
      closestListItem.classList.remove('is-active-trail');
    }
  }

  handleExternalClick(e) {
    console.log('@external click');
    let el = e.target;
    const clickIsAllowed =
      this.state.activeMenu.button?.contains(el) ||
      this.state.activeMenu.menu?.contains(el);
    if (clickIsAllowed) {
      return;
    }
    console.log('@external return');
    this.hideMenu(this.state.activeMenu.button);
  }
}
