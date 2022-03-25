export class BoltFloatingActionButtons {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    this.primaryList = this.el.querySelector(
      '.js-bolt-floating-action-buttons-list',
    );
    this.secondaryList = this.primaryList.querySelector(
      '.js-bolt-floating-action-buttons-list',
    );
    this.toggleButton = this.primaryList.querySelector(
      '.js-bolt-floating-action-buttons-toggle',
    );
    this.hiddenListItems = this.el.querySelectorAll(
      '.js-bolt-floating-action-buttons-list-item--hidden',
    );
    this.hideOnLoad = this.el.hasAttribute('data-hide-on-load');
    this.isOpen = false;

    if (this.secondaryList) {
      this.secondaryListItems = this.secondaryList.querySelectorAll(
        '.js-bolt-floating-action-buttons-list-item',
      );

      // hide secondary list items
      Array.from(this.secondaryListItems).forEach(el => {
        el.classList.add('c-bolt-floating-action-buttons__list-item--hidden');
      });
    }

    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => {
        this.toggleSecondaryList();
      });
    }

    if (this.hiddenListItems) {
      Array.from(this.hiddenListItems).forEach(el => {
        this.addScrollHandler(el);
      });
    }

    if (!this.hideOnLoad) {
      this.show();
    }

    this.el.setAttribute('data-bolt-ready', '');
  }

  show() {
    this.el.classList.remove('c-bolt-floating-action-buttons--hidden');
  }

  hide() {
    this.el.classList.add('c-bolt-floating-action-buttons--hidden');
  }

  toggleSecondaryList() {
    if (this.isOpen) {
      // close this
      this.isOpen = false;
      this.toggleButton.setAttribute('aria-expanded', 'false');
      if (this.secondaryList) {
        this.secondaryList.classList.add(
          'c-bolt-floating-action-buttons__list--hidden',
        );
        Array.from(this.secondaryListItems).forEach(el => {
          setTimeout(() => {
            el.classList.add(
              'c-bolt-floating-action-buttons__list-item--hidden',
            );
          }, 200);
        });
      }
    } else {
      // open this
      this.isOpen = true;
      this.toggleButton.setAttribute('aria-expanded', 'true');
      if (this.secondaryList) {
        this.secondaryList.classList.remove(
          'c-bolt-floating-action-buttons__list--hidden',
        );
        Array.from(this.secondaryListItems).forEach((el, index) => {
          setTimeout(() => {
            el.classList.remove(
              'c-bolt-floating-action-buttons__list-item--hidden',
            );
          }, index * 50);
        });
      }
    }
  }

  getScrollPositionFromProp(el) {
    let revealPosition = 0;
    const scrollInt = parseInt(el.dataset.showOnScrollPosition, 10);
    const pageHeight = window.innerHeight;

    if (el.dataset.showOnScrollPosition.includes('px')) {
      revealPosition = scrollInt;
    } else if (el.dataset.showOnScrollPosition.includes('%')) {
      // set a pixel value based on the percentage value.
      revealPosition = pageHeight * (scrollInt / 100);
    }
    return revealPosition;
  }

  addScrollHandler(el) {
    let scrollPosition = window.scrollY;
    const revealPosition = this.getScrollPositionFromProp(el);

    const scrollHandler = () => {
      scrollPosition = window.scrollY;
      if (revealPosition > 0 && scrollPosition >= revealPosition) {
        el.classList.remove(
          'c-bolt-floating-action-buttons__list-item--hidden',
        );
      } else {
        el.classList.add('c-bolt-floating-action-buttons__list-item--hidden');
      }
    };

    window.addEventListener('scroll', scrollHandler);
  }
}
