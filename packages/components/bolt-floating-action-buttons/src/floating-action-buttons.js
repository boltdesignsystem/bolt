export class BoltFloatingActionButtons {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.init();
  }

  init() {
    this.visibleItems = this.el.getAttribute('data-visible-items');
    this.contentElement = this.el.querySelector(
      '.c-bolt-floating-action-buttons__content',
    );
    this.showOnScroll = this.el.getAttribute('show-on-scroll');
    this.showOnLoad = this.el.getAttribute('data-show-on-load');
    this.expandButton = this.el.querySelector(
      '.c-bolt-floating-action-buttons__more',
    );

    if (this.visibleItems > 0) {
      this.setDefaultVisibility();
    }

    if (this.showOnScroll) {
      this.handleshowOnScroll();
    } else if (this.showOnLoad != null) {
      this.show();
    }

    if (this.expandButton) {
      this.expandButton.onclick = () => {
        this.toggleShowMore();
      };
    }

    // add the ready attribute at the end of init
    // delay it just long enough to avoid CSS animation lag
    setTimeout(() => {
      this.el.setAttribute('data-bolt-ready', '');
    }, 200);
  }

  show() {
    this.el.setAttribute('aria-hidden', false);
  }

  getScrollPositionFromProp() {
    var revealPosition = 0;
    var scrollInt = parseInt(this.showOnScroll, 10);
    var pageHeight = window.innerHeight;

    if (this.showOnScroll.includes('px')) {
      revealPosition = scrollInt;
    } else if (this.showOnScroll.includes('%')) {
      // set a pixel value based on the percentage value.
      revealPosition = pageHeight * (scrollInt / 100);
    }
    return revealPosition;
  }

  handleshowOnScroll() {
    var scrollPosition = window.scrollY;
    var revealPosition = this.getScrollPositionFromProp();

    const superFunction = () => {
      scrollPosition = window.scrollY;
      if (revealPosition > 0 && scrollPosition >= revealPosition) {
        this.show();
        window.removeEventListener('scroll', superFunction);
      }
    };

    window.addEventListener('scroll', superFunction);
  }

  toggleShowMore() {
    if (this.el.getAttribute('aria-expanded') === 'false') {
      this.el.setAttribute('aria-expanded', 'true');
      // show all contentItems
      for (const contentItem of this.contentElement.children) {
        contentItem.setAttribute('aria-hidden', false);
      }
    } else {
      this.el.setAttribute('aria-expanded', 'false');
      this.setDefaultVisibility();
    }
  }

  setDefaultVisibility() {
    let index = 1;
    for (const contentItem of this.contentElement.children) {
      if (index > this.visibleItems) {
        contentItem.setAttribute('aria-hidden', true);
      } else {
        contentItem.setAttribute('aria-hidden', false);
      }
      index++;
    }
  }
}
