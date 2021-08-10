import '@bolt/core-v3.x/utils/optimized-resize';

export class BoltHolyGrail {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.toggleTrigger = this.el.querySelector(
      '.js-bolt-holy-grail__toggle-trigger',
    );

    this.breakpoint = this.el.dataset.boltHolyGrailBp;

    this.state = {
      activeElement: null,
      isMobile: null,
      isExpanded: null,
    };

    this.handleEscapeKeypress = this.handleEscapeKeypress.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.init();
  }

  init() {
    if (!this.toggleTrigger) return;

    this.toggleTrigger.addEventListener('click', e => {
      if (this.isExpanded) {
        this.hide();
      } else {
        this.show();
      }
    });

    this.setOffsetTop();
    this.checkScreenSize();

    window.addEventListener('throttledResize', this.handleResize);
  }

  show() {
    this.toggleTrigger.setAttribute('aria-expanded', 'true');
    this.isExpanded = true;
    if (this.isMobile) {
      document.body.classList.add('u-bolt-overflow-hidden');
    }
    document.addEventListener('keydown', this.handleEscapeKeypress);
  }

  hide() {
    this.toggleTrigger.setAttribute('aria-expanded', 'false');
    this.isExpanded = false;
    if (this.isMobile) {
      document.body.classList.remove('u-bolt-overflow-hidden');
    }
    this.toggleTrigger.focus();
    document.removeEventListener('keydown', this.handleEscapeKeypress);
  }

  getKey(e) {
    if (e.key !== undefined) {
      return e.key;
    } else if (e.keyCode !== undefined) {
      return e.keyCode;
    }
  }

  handleEscapeKeypress(e) {
    if (this.getKey(e) === 'Escape' || this.getKey(e) === 27) {
      this.hide();
    }
  }

  getHeaderHeight() {
    const pageHeader = document.querySelectorAll(
      '.js-bolt-sticky-page-header, .js-global-header.is-fixed',
    ); // First selector covers new header, second covers old header

    if (pageHeader.length) {
      // Always round down, subpixel rendering can leave an unwanted gap below page header
      return Math.floor(pageHeader[0].getBoundingClientRect().height);
    }
  }

  checkScreenSize() {
    if (window.matchMedia(`(max-width: ${this.breakpoint})`).matches) {
      if (!this.isMobile && this.isExpanded) {
        // Going from desktop to mobile, hide the expanded sidebar as it will be full-screen on mobile
        this.hide();
      }
      this.isMobile = true;
    } else {
      if (this.isMobile && this.isExpanded) {
        // Going from mobile to desktop, just remove the overflow hidden, allow sidebar to stay expanded
        document.body.classList.remove('u-bolt-overflow-hidden');
      }
      this.isMobile = false;
    }
  }

  handleResize() {
    this.setOffsetTop();
    this.checkScreenSize();
  }

  setOffsetTop() {
    const offset = this.getHeaderHeight();

    if (offset) {
      this.el.style.setProperty('--bolt-page-header-height', `${offset}px`);
    }
  }
}
