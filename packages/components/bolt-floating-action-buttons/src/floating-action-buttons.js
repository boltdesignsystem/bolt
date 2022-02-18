export class BoltFloatingActionButtons {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    this.list = this.el.querySelector('.js-bolt-floating-action-buttons-list');
    this.secondaryList = this.list.querySelector(
      '.js-bolt-floating-action-buttons-list ',
    );
    this.showOnScroll = this.el.dataset.showOnScroll;
    this.showOnLoad = this.el.dataset.showOnLoad;
    this.showToggleButton = this.list.querySelector(
      '.js-bolt-floating-action-buttons-toggle',
    );
    this.showToggleButtonIcon = this.list.querySelector(
      '.js-bolt-floating-action-buttons-toggle-icon',
    );
    this.showToggleButtonIconClose = this.list.querySelector(
      '.js-bolt-floating-action-buttons-toggle-icon-close',
    );

    if (this.secondaryList) {
      this.secondaryList.setAttribute('aria-hidden', 'true');
    }

    if (this.showOnScroll) {
      this.handleShowOnScroll();
    } else if (this.showOnLoad != null) {
      this.show();
    }

    if (this.showToggleButton) {
      this.showToggleButton.onclick = () => {
        this.toggleShowToggle();
      };
    }

    // add the ready attribute at the end of init
    // delay it just long enough to avoid CSS animation lag
    setTimeout(() => {
      this.el.setAttribute('data-bolt-ready', '');
    }, 200);
  }

  show() {
    this.el.removeAttribute('aria-hidden');
  }

  toggleShowToggle() {
    if (this.showToggleButton.getAttribute('aria-expanded') === 'false') {
      // open
      this.secondaryList.setAttribute('aria-hidden', 'false');
      this.showToggleButton.setAttribute('aria-expanded', 'true');
      this.showToggleButtonIcon.setAttribute('aria-hidden', 'true');
      this.showToggleButtonIconClose.setAttribute('aria-hidden', 'false');
    } else {
      //close
      this.secondaryList.setAttribute('aria-hidden', 'true');
      this.showToggleButton.setAttribute('aria-expanded', 'false');
      this.showToggleButtonIcon.setAttribute('aria-hidden', 'false');
      this.showToggleButtonIconClose.setAttribute('aria-hidden', 'true');
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
