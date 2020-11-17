import { BoltPageHeaderMenu } from './page-header-menu.js';

class BoltPageHeaderMenuTertiary extends BoltPageHeaderMenu {
  setupDesktopMenu() {
    this.addClickHandlers(this.menu);
    this.state.desktopIsSetup = true;
  }

  resetDesktopMenu() {
    this.removeClickHandlers(this.menu);
    this.state.desktopIsSetup = false;
  }
}

//   search and hamburger
//   aria-expanded only on click on mobile
//   only one at a time

// main menu
//   click on button, button get aria-expanded
//   parent LI gets is-expanded class
//   parent UL gets is-covered
//   only one can be expanded at a time

// on desktop
//   on hover show by setting aria-expanded not :hover pseudo class
//   should also open on keyboard press enter/space
//   on hover and click open utility dropdown
//   add click-off to close
//   only one main menu open at a time

// hover intent

// tab order

// aria-hidden on mobile stay in current section, closest parent and siblings should be hidden

class BoltPageHeader {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    this.primaryButtons = this.el.querySelectorAll(
      '.js-bolt-page-header-primary-button',
    );
    this.secondaryButtons = this.el.querySelectorAll(
      '.js-bolt-page-header-hover-trigger',
    );

    this.navListTriggers = this.el.querySelectorAll(
      '.c-bolt-page-header__nav-list button[aria-haspopup]',
    );

    this.primaryMenus = new BoltPageHeaderMenu(this.primaryButtons, {
      mobile: false,
    });
    this.secondaryMenus = new BoltPageHeaderMenu(this.secondaryButtons, {
      mobile: false,
    });
    this.navListMenus = new BoltPageHeaderMenu(this.navListTriggers, {
      desktop: false,
      isNested: true,
    });

    this.tertiaryButtons = this.el.querySelectorAll(
      '.c-bolt-page-header__toolbar > button[aria-haspopup]',
    );

    this.tertiaryMenus = new BoltPageHeaderMenuTertiary(this.tertiaryButtons, {
      externalClick: true,
      // desktop: false,
    });

    this.el.querySelector('.c-bolt-page-header__action-trigger--nav').click();
  }
}

const boltPageHeader = new BoltPageHeader(
  document.querySelector('bolt-page-header'),
);
