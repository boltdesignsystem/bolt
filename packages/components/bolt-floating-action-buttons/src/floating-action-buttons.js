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
    this.toggleButton = this.primaryList.querySelector('.js-bolt-floating-action-buttons-toggle',);
    this.showOnScroll = this.el.dataset.showOnScroll;
    this.hideOnLoad = this.el.dataset.hideOnLoad;
    this.isOpen = false;

    this.secondaryList.classList.add('c-bolt-floating-action-buttons__list--hidden');
    Array.from(this.secondaryList.children).forEach((el) => {
      el.classList.add('c-bolt-floating-action-buttons__list-item--hidden');
    });

    if (this.showOnScroll) {
      this.handleShowOnScroll();
    } else if (this.hideOnLoad == null) {
      this.show();
    }

    if (this.toggleButton) {
      this.toggleButton.onclick = () => {
        this.toggleExpanded();
      };
    }

    this.el.setAttribute('data-bolt-ready', '');
  }

  show() {
    this.el.classList.remove('c-bolt-floating-action-buttons--hidden');
  }

  toggleExpanded() {
    if (this.isOpen) {
      // close this
      this.isOpen = false;
      this.toggleButton.setAttribute('aria-expanded', 'false');
      this.secondaryList.classList.add('c-bolt-floating-action-buttons__list--hidden');
      Array.from(this.secondaryList.children).forEach((el) => {
        setTimeout(() => {
          el.classList.add('c-bolt-floating-action-buttons__list-item--hidden');
        }, 200);
      });
    } else {
      // open this
      this.isOpen = true;
      this.toggleButton.setAttribute('aria-expanded', 'true');
      this.secondaryList.classList.remove('c-bolt-floating-action-buttons__list--hidden');
      Array.from(this.secondaryList.children).forEach((el, index) => {
        setTimeout(() => {
          el.classList.remove('c-bolt-floating-action-buttons__list-item--hidden');
        }, index * 50);
      });
    }
  }

  getScrollPositionFromProp() {
    let revealPosition = 0;
    const scrollInt = parseInt(this.showOnScroll, 10);
    const pageHeight = window.innerHeight;

    if (this.showOnScroll.includes('px')) {
      revealPosition = scrollInt;
    } else if (this.showOnScroll.includes('%')) {
      // set a pixel value based on the percentage value.
      revealPosition = pageHeight * (scrollInt / 100);
    }
    return revealPosition;
  }

  handleShowOnScroll() {
    let scrollPosition = window.scrollY;
    const revealPosition = this.getScrollPositionFromProp();

    const scrollHandler = () => {
      scrollPosition = window.scrollY;
      if (revealPosition > 0 && scrollPosition >= revealPosition) {
        this.show();
        window.removeEventListener('scroll', scrollHandler);
      }
    };

    window.addEventListener('scroll', scrollHandler);
  }
}
