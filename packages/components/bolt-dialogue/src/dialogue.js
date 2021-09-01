export class BoltDialogue {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.dialogue = document.getElementById(this.el.id);
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

    // remove nodes on whose click, the dialogue closes
    const nonCloseNodes = focusableNodes.filter(node => {
      return !node.hasAttribute('data-dialogue-close');
    });

    if (nonCloseNodes.length > 0) nonCloseNodes[0].focus();
    if (nonCloseNodes.length === 0) focusableNodes[0].focus();
  }

  retainFocus(event) {
    let focusableNodes = this.getFocusableNodes();

    // no focusable nodes
    if (focusableNodes.length === 0) return;

    // Filters nodes which are hidden to prevent focus leak outside dialogue
    focusableNodes = focusableNodes.filter(node => {
      return node.offsetParent !== null;
    });
  }

  showDialogue() {
    this.el.setAttribute('aria-hidden', 'false');
    this.el.classList.add('is-open');
    this.addEventListeners();
    document.body.classList.add('u-bolt-overflow-hidden');
    this.setFocusToFirstNode();
    // scroll to the top of the scrollable section of the dialogue
    if (this.el.classList.contains('c-bolt-dialogue__scroll-overall')) {
      this.el.querySelector('.c-bolt-dialogue__overlay').scrollTop = 0;
    } else {
      this.el.querySelector('.c-bolt-dialogue__body').scrollTop = 0;
    }
  }

  closeDialogue() {
    this.el.setAttribute('aria-hidden', 'true');
    this.el.classList.remove('is-open');
    this.removeEventListeners();
    document.body.classList.remove('u-bolt-overflow-hidden');
    if (this.activeElement && this.activeElement.focus) {
      this.activeElement.focus();
    }
  }

  addEventListeners() {
    this.dialogue.addEventListener('touchstart', event => this.onClick(event));
    this.dialogue.addEventListener('click', event => this.onClick(event));
    document.addEventListener('keydown', this.onKeydown);
  }

  removeEventListeners() {
    this.dialogue.removeEventListener('touchstart', this.onClick);
    this.dialogue.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKeydown);
  }

  onClick(event) {
    if (event.target.hasAttribute('data-dialogue-close')) {
      this.closeDialogue();
    }
    // @TODO: make this more generic?s
    // add support for the icon child of the close button
    if (event.target.closest('.c-bolt-dialogue__close-button')) {
      this.closeDialogue();
    }
  }

  onKeydown(event) {
    if (event.keyCode === 9) this.retainFocus(event); // tab
    if (typeof this.el.dataset.dialoguePersistent === 'undefined') {
      if (event.keyCode === 27) this.closeDialogue(event); // esc
    } else {
      console.log('Cannot close a persistent dialogue.');
    }
  }

  init() {
    const trigger = document.querySelector(
      '[data-dialogue-trigger="' + this.el.id + '"]',
    );
    trigger.addEventListener('click', event => this.showDialogue());
  }
}

//     closeDialogueById(targetDialogue) {
//       this.dialogue = document.getElementById(targetDialogue);
//       if (this.dialogue) this.closeDialogue();
//     }

//   /**
//    * Shows a particular dialogue
//    * @param  {string} targetDialogue [The id of the dialogue to display]
//    * @param  {object} config [The configuration object to pass]
//    * @return {void}
//    */
//   const show = (targetDialogue, config) => {
//     const options = config || {};
//     options.targetDialogue = targetDialogue;

//     // Checks if dialogues and triggers exist in dom
//     if (
//       options.debugMode === true &&
//       validateDialoguePresence(targetDialogue) === false
//     )
//       return;

//     // clear events in case previous dialogue wasn't close
//     if (activeDialogue) activeDialogue.removeEventListeners();

//     // stores reference to active dialogue
//     activeDialogue = new Dialogue(options); // eslint-disable-line no-new
//     activeDialogue.showDialogue();
//   };

//   /**
//    * Closes the active dialogue
//    * @param  {string} targetDialogue [The id of the dialogue to close]
//    * @return {void}
//    */
//   const close = targetDialogue => {
//     targetDialogue
//       ? activeDialogue.closeDialogueById(targetDialogue)
//       : activeDialogue.closeDialogue();
//   };
