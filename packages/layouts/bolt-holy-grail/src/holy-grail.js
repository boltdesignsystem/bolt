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
}
