import '@bolt/core-v3.x/utils/optimized-resize';

export class BoltHolyGrail {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.handleEscapeKeypress = this.handleEscapeKeypress.bind(this);
    this.state = {
      activeElement: null,
    };
    this.init();
  }

  init() {
    const toggleTrigger = this.el.querySelectorAll(
      '.js-bolt-holy-grail__toggle-trigger',
    );
    toggleTrigger.forEach(el => {
      el.addEventListener('click', event => {
        if (el.getAttribute('aria-expanded') === 'true') {
          this.hide(el);
        } else {
          this.show(el);
        }
      });
    });

    this.setOffsetTop = this.setOffsetTop.bind(this);
    window.addEventListener('throttledResize', this.setOffsetTop);
    this.setOffsetTop();
  }

  show(el) {
    this.state.activeElement = el;
    el.setAttribute('aria-expanded', 'true');
    document.body.classList.add('u-bolt-overflow-hidden');
    document.addEventListener('keydown', this.handleEscapeKeypress);
  }

  hide(el) {
    el.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('u-bolt-overflow-hidden');
    this.state.activeElement.focus();
    this.state.activeElement = null;
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
      this.hide(this.state.activeElement);
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

  setOffsetTop() {
    const offset = this.getHeaderHeight();

    if (offset) {
      this.el.style.setProperty('--bolt-page-header-height', `${offset}px`);
    }
  }
}
