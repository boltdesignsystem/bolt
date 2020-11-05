// A base class is defined using the new reserved 'class' keyword
class BoltPageHeader {
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
  //   should also open on click
  //   on hover and click open utility dropdown
  //   add click-off to close
  //   only one main menu open at a time

  // hover intent

  // tab order

  // aria-hidden on mobile stay in current section, closest parent and siblings should be hidden

  constructor(el) {
    this.el = el;
    this.activeTrigger = null;
    this.activeNav = null;
    this.activeHeaderTrigger = null;

    this.init();
  }

  init() {
    this.navTriggers = this.el.querySelectorAll(
      '.c-bolt-page-header__nav-list button[aria-haspopup]',
    );

    this.navTriggers.forEach(el => {
      el.addEventListener('click', e => {
        this.toggleNav(el);
        this.updateAriaHiddenAttrs(this.activeTrigger);
      });
    });

    this.menuTriggers = this.el.querySelectorAll(
      '.c-bolt-page-header__toolbar > button[aria-haspopup]',
    );

    this.menuTriggers.forEach(el => {
      el.addEventListener('click', e => {
        this.toggleMenu(el);
      });
    });

    this.allListItems = this.el.querySelectorAll(
      '.js-bolt-page-header-nav-list-item',
    );

    // this.searchTrigger = this.el.querySelector(
    //   '#js-bolt-page-header-search-toggle',
    // );
    // this.searchMenu = this.el.querySelector('c-bolt-page-header__search');
    // this.primaryNavTrigger = this.el.querySelector(
    //   '#js-bolt-page-header-primary-nav-toggle',
    // );
    // this.primaryNavMenu = this.el.querySelector('.c-bolt-page-header__nav');

    // this.searchTrigger.addEventListener('click', e => {

    // })

    this.handleExternalClick = this.handleExternalClick.bind(this);
  }

  updateAriaHiddenAttrs(el) {
    const allItems = Array.from(this.allListItems);
    const expandedListItems = this.el.querySelectorAll(
      '.js-bolt-page-header-nav-list-item.is-expanded',
    );
    const siblingListItems = el?.parentNode.querySelector(
      '.js-bolt-page-header-nested-nav-list',
    ).children;

    if (siblingListItems) {
      const visibleItems = [...expandedListItems, ...siblingListItems];
      const allItemsMinusVisible = allItems.filter(
        item => !visibleItems.includes(item),
      );
      visibleItems.map(el => el.removeAttribute('aria-hidden'));
      allItemsMinusVisible.map(el => el.setAttribute('aria-hidden', true));
    } else {
      allItems.map(el => el.removeAttribute('aria-hidden'));
    }
  }

  toggleNav(el) {
    const parentIsExpanded = el.closest('.is-expanded');

    if (el.getAttribute('aria-expanded') !== 'true') {
      if (this.activeTrigger && !parentIsExpanded) {
        this.hideNav(this.activeTrigger);
      }
      this.showNav(el);
      this.showParent(el);
      document.addEventListener('click', this.handleExternalClick);
      this.activeTrigger = el;
      console.log(el);
      this.activeNav = el.parentNode.querySelector(
        '.js-bolt-page-header-nested-nav-list',
      );
    } else {
      let nextActiveTrigger;
      if (parentIsExpanded) {
        nextActiveTrigger = parentIsExpanded?.closest('.is-covered')
          ?.previousElementSibling;
        console.log(nextActiveTrigger);
      }
      this.hideNav(el);
      document.removeEventListener('click', this.handleExternalClick);

      this.hideParent(el);
      this.activeTrigger = nextActiveTrigger || null;
      this.activeNav = null;
    }
  }

  toggleMenu(el) {
    if (el.getAttribute('aria-expanded') !== 'true') {
      if (this.activeHeaderTrigger) {
        this.hideMenu(this.activeHeaderTrigger);
      }
      this.showMenu(el);
      document.querySelector('body').classList.add('u-bolt-overflow-hidden');
      this.activeHeaderTrigger = el;
      // this.activeMenu = el.parentNode.querySelector(
      //   '.js-bolt-page-header-nested-nav-list',
      // );
    } else {
      this.hideMenu(el);
      document.querySelector('body').classList.remove('u-bolt-overflow-hidden');
      this.activeHeaderTrigger = null;
      this.activeMenu = null;
    }
  }

  showNav(el) {
    console.log('@show');
    el.setAttribute('aria-expanded', 'true');
  }

  hideNav(el) {
    el.setAttribute('aria-expanded', 'false');
  }

  showMenu(el) {
    el.setAttribute('aria-expanded', 'true');
    // document.addEventListener('click', this.handleExternalClick);
  }

  hideMenu(el) {
    el.setAttribute('aria-expanded', 'false');
    // document.removeEventListener('click', this.handleExternalClick);
  }

  showParent(el) {
    const closestList = el.closest('.js-bolt-page-header-nested-nav-list');
    const closestListItem = el.closest('.js-bolt-page-header-nav-list-item');
    closestList?.classList.add('is-covered');
    closestListItem?.classList.add('is-expanded');
  }

  hideParent(el) {
    const closestList = el.closest('.js-bolt-page-header-nested-nav-list');
    const closestListItem = el.closest('.js-bolt-page-header-nav-list-item');
    closestList?.classList.remove('is-covered');
    closestListItem?.classList.remove('is-expanded');
  }

  handleExternalClick(e) {
    console.log('external click');
    let el = e.target;

    // @todo: check that these exist?
    if (
      this.activeTrigger?.contains(el) ||
      this.activeNav?.contains(el) ||
      this.activeHeaderTrigger?.contains(el)
    ) {
      return;
    }
    this.hideNav(this.activeTrigger);
  }
}

// Classes are used just like ES5 constructor functions:
let p = new BoltPageHeader(document.querySelector('bolt-page-header'));
