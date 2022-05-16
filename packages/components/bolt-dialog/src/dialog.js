export class BoltDialog {
  static dialogs = [];

  static getDialog(el) {
    if (el) {
      return BoltDialog.dialogs.find(dialog => el === dialog.el);
    }
  }

  static open = el => {
    const dialog = BoltDialog.getDialog(el);

    if (dialog) {
      dialog.open();
    }
  };

  static close = el => {
    const dialog = BoltDialog.getDialog(el);

    if (dialog) {
      dialog.close();
    }
  };

  constructor(el) {
    if (!el) return;

    this.el = el;
    this.isOpen = false;
    this.init();
  }

  init() {
    if (!BoltDialog.dialogs.includes(this)) {
      BoltDialog.dialogs.push(this);
    }

    this.isPersistent = this.el.hasAttribute('data-dialog-persistent');
    this.onCloseCleanup = this.onCloseCleanup.bind(this);
    this.handleAnimateEnd = this.handleAnimateEnd.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    // 'cancel' event is triggered by escape keypress and skips our custom click event handlers
    this.el.addEventListener('cancel', this.onCloseCleanup);

    this.setupTriggers();
    this.el.setAttribute('data-bolt-ready', '');
    this.el.dispatchEvent(new CustomEvent('dialog:ready', { bubbles: true }));
  }

  setupTriggers() {
    if (this.el.id) {
      const targetTriggers = document.querySelectorAll(
        `[data-bolt-dialog-target="${this.el.id}"]`,
      );

      targetTriggers.forEach(el => {
        el.addEventListener('click', () => {
          this.toggle();
        });
      });
    }

    const closeTriggers = this.el.querySelectorAll('[data-dialog-close]');

    closeTriggers.forEach(el => {
      el.addEventListener('click', () => {
        this.close();
      });
    });
  }

  open() {
    this.el.classList.remove('c-bolt-dialog--hidden');
    document.body.classList.add('u-bolt-overflow-hidden');

    if (!this.isPersistent) {
      this.el.addEventListener('click', this.handleOutsideClick);
    }

    this.isOpen = true;
    this.el.showModal();
  }

  close() {
    this.el.classList.add('c-bolt-dialog--hidden');
    this.el.addEventListener('animationend', this.handleAnimateEnd);
  }

  handleAnimateEnd() {
    this.el.classList.remove('c-bolt-dialog--hidden');
    this.el.close();
    this.onCloseCleanup();
    this.el.removeEventListener('animationend', this.handleAnimateEnd);
  }

  onCloseCleanup() {
    document.body.classList.add('u-bolt-overflow-hidden');

    if (!this.isPersistent) {
      this.el.removeEventListener('click', this.handleOutsideClick);
    }

    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  handleOutsideClick(e) {
    if (e.target.tagName === 'DIALOG') {
      this.close();
    }
  }
}
