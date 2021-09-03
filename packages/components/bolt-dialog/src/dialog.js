export class BoltDialog {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.dialog = document.getElementById(this.el.id);
    this.init();
  }

  getFocusableNodes() {
    const focusableElements = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      'select:not([disabled]):not([aria-hidden])',
      'textarea:not([disabled]):not([aria-hidden])',
      'button:not([disabled]):not([aria-hidden])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])',
    ];

    const nodes = this.el.querySelectorAll(focusableElements);
    return Array(...nodes);
  }

  setFocusToFirstNode() {
    const focusableNodes = this.getFocusableNodes();

    // no focusable nodes
    if (focusableNodes.length === 0) return;

    // remove nodes on whose click, the dialog closes
    const nonCloseNodes = focusableNodes.filter(node => {
      return !node.hasAttribute('data-dialog-close');
    });

    if (nonCloseNodes.length > 0) nonCloseNodes[0].focus();
    if (nonCloseNodes.length === 0) focusableNodes[0].focus();
  }

  retainFocus(event) {
    let focusableNodes = this.getFocusableNodes();

    // no focusable nodes
    if (focusableNodes.length === 0) return;

    // Filters nodes which are hidden to prevent focus leak outside dialog
    focusableNodes = focusableNodes.filter(node => {
      return node.offsetParent !== null;
    });

    const focusedItemIndex = focusableNodes.indexOf(document.activeElement);

    if (event.shiftKey && focusedItemIndex === 0) {
      focusableNodes[focusableNodes.length - 1].focus();
      event.preventDefault();
    }

    if (
      !event.shiftKey &&
      focusableNodes.length > 0 &&
      focusedItemIndex === focusableNodes.length - 1
    ) {
      focusableNodes[0].focus();
      event.preventDefault();
    }
  }

  showDialog() {
    this.el.setAttribute('aria-hidden', 'false');
    this.el.classList.add('is-open');
    this.addEventListeners();
    document.body.classList.add('u-bolt-overflow-hidden');
    this.setFocusToFirstNode();
    // scroll to the top of the scrollable section of the dialog
    if (this.el.classList.contains('c-bolt-dialog__scroll-overall')) {
      this.el.querySelector('.c-bolt-dialog__overlay').scrollTop = 0;
    } else {
      this.el.querySelector('.c-bolt-dialog__body').scrollTop = 0;
    }
  }

  closeDialog() {
    this.el.setAttribute('aria-hidden', 'true');
    this.el.classList.remove('is-open');
    this.removeEventListeners();
    document.body.classList.remove('u-bolt-overflow-hidden');
    if (this.activeElement && this.activeElement.focus) {
      this.activeElement.focus();
    }
  }

  addEventListeners() {
    this.dialog.addEventListener('touchstart', event => this.onClick(event));
    this.dialog.addEventListener('click', event => this.onClick(event));
    document.addEventListener('keydown', event => this.onKeydown(event));
  }

  removeEventListeners() {
    this.dialog.removeEventListener('touchstart', this.onClick);
    this.dialog.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKeydown);
  }

  onClick(event) {
    if (event.target.hasAttribute('data-dialog-close')) {
      this.closeDialog();
    }
    // @TODO: make this more generic?
    // add support for the icon child of the close button
    if (event.target.closest('.c-bolt-dialog__close-button')) {
      this.closeDialog();
    }
  }

  onKeydown(event) {
    // tab
    if (event.keyCode === 9) this.retainFocus(event);
    // esc
    if (event.keyCode === 27) {
      if (typeof this.el.dataset.dialogPersistent === 'undefined') {
        this.closeDialog(event);
      } else {
        console.log('Cannot close a persistent dialog.');
      }
    }
  }

  init() {
    const trigger = document.querySelector(
      '[data-dialog-trigger="' + this.el.id + '"]',
    );
    trigger.addEventListener('click', event => this.showDialog());
  }
}

//     closeDialogById(targetDialog) {
//       this.dialog = document.getElementById(targetDialog);
//       if (this.dialog) this.closeDialog();
//     }

//   /**
//    * Shows a particular dialog
//    * @param  {string} targetDialog [The id of the dialog to display]
//    * @param  {object} config [The configuration object to pass]
//    * @return {void}
//    */
//   const show = (targetDialog, config) => {
//     const options = config || {};
//     options.targetDialog = targetDialog;

//     // Checks if dialogs and triggers exist in dom
//     if (
//       options.debugMode === true &&
//       validateDialogPresence(targetDialog) === false
//     )
//       return;

//     // clear events in case previous dialog wasn't close
//     if (activeDialog) activeDialog.removeEventListeners();

//     // stores reference to active dialog
//     activeDialog = new Dialog(options); // eslint-disable-line no-new
//     activeDialog.showDialog();
//   };

//   /**
//    * Closes the active dialog
//    * @param  {string} targetDialog [The id of the dialog to close]
//    * @return {void}
//    */
//   const close = targetDialog => {
//     targetDialog
//       ? activeDialog.closeDialogById(targetDialog)
//       : activeDialog.closeDialog();
//   };
