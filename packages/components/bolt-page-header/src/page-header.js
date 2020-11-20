import {
  BoltPageHeaderNav,
  BoltPageHeaderActionNav,
} from './page-header-nav.js';

export class BoltPageHeader {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    const siteMenuTriggers = this.el.querySelectorAll(
      '.js-bolt-page-header-nav--site > .js-bolt-page-header-nav-item > .js-bolt-page-header-trigger',
    );
    const siteNestedMenuTriggers = this.el.querySelectorAll(
      '.js-bolt-page-header-nav-item.has-children .js-bolt-page-header-trigger',
    );
    const utilityTriggers = this.el.querySelectorAll(
      '.js-bolt-page-header-nav--user .js-bolt-page-header-trigger, .js-bolt-page-header-nav--related-sites .js-bolt-page-header-nav .js-bolt-page-header-trigger',
    );
    const siteMenuArray = this.getMenusArray(siteMenuTriggers);
    const siteNestedMenuArray = this.getMenusArray(siteNestedMenuTriggers);
    const utilityMenuArray = this.getMenusArray(utilityTriggers);
    const actionMenuArray = this.getActionMenuArray();

    // Site Nav
    this.siteMenu = new BoltPageHeaderNav(siteMenuArray, {
      mobile: false,
    });

    // Nested Site Nav
    this.siteNestedMenu = new BoltPageHeaderNav(siteNestedMenuArray, {
      desktop: false,
      isNested: true,
      onNestedNavToggle: open => {
        const primaryNav = this.el.querySelector(
          '#js-bolt-page-header-primary-nav',
        );
        if (open) {
          primaryNav.classList.add('is-open');
        } else {
          primaryNav.classList.remove('is-open');
        }
      },
    });

    // Utility Nav
    this.utilityMenu = new BoltPageHeaderNav(utilityMenuArray, {
      mobile: false,
    });

    // Action Nav
    this.actionMenu = new BoltPageHeaderActionNav(actionMenuArray, {
      escapeKey: true,
    });
  }

  getMenusArray(triggers = []) {
    const menuArray = [];

    triggers.forEach(el => {
      const trigger = el;
      const menu = this.nextElementWithClass(el, 'js-bolt-page-header-nav');
      const ul = el.closest('.js-bolt-page-header-nav');
      const li = el.closest('.js-bolt-page-header-nav-item');
      const isTopLevel = ul.parentNode.tagName !== 'LI';

      if (menu) {
        menuArray.push({ trigger, menu, ul, li, isTopLevel });
      }
    });

    return menuArray;
  }

  getActionMenuArray = () => {
    const searchToggle = this.el.querySelector(
      '#js-bolt-page-header-search-toggle',
    );
    const search = this.el.querySelector('#js-bolt-page-header-search');
    const primaryNavToggle = this.el.querySelector(
      '#js-bolt-page-header-primary-nav-toggle',
    );
    const primaryNav = this.el.querySelector(
      '#js-bolt-page-header-primary-nav',
    );
    const menu = [];

    if (searchToggle && search) {
      menu.push({
        trigger: searchToggle,
        menu: search,
      });
    }

    if (primaryNavToggle && primaryNav) {
      menu.push({
        trigger: primaryNavToggle,
        menu: primaryNav,
      });
    }

    return menu;
  };

  nextElementWithClass = (el, className) => {
    if (!el || !className) return;
    let nextSibling = el.nextElementSibling;
    while (nextSibling && !nextSibling.classList.contains(className)) {
      nextSibling = nextSibling.nextElementSibling;
    }
    return nextSibling;
  };
}
