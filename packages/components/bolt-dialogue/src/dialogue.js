// export class BoltDialogue {
//   constructor(el) {
//     if (!el) return;
//     this.el = el;
//     this.init();
//   }

//   init() {
//     console.log('This is a dialogue component.');
//   }
// }
const MicroDialogue = (() => {
  'use strict';

  const FOCUSABLE_ELEMENTS = [
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

  class Dialogue {
    constructor({
      targetDialogue,
      triggers = [],
      onShow = () => {},
      onClose = () => {},
      openTrigger = 'data-dialogue-trigger',
      closeTrigger = 'data-dialogue-close',
      openClass = 'is-open',
      disableScroll = false,
      disableFocus = false,
      awaitCloseAnimation = false,
      awaitOpenAnimation = false,
      debugMode = false,
    }) {
      // Save a reference of the dialogue
      this.dialogue = document.getElementById(targetDialogue);

      // Save a reference to the passed config
      this.config = {
        debugMode,
        disableScroll,
        openTrigger,
        closeTrigger,
        openClass,
        onShow,
        onClose,
        awaitCloseAnimation,
        awaitOpenAnimation,
        disableFocus,
      };

      // Register click events only if pre binding eventListeners
      if (triggers.length > 0) this.registerTriggers(...triggers);

      // pre bind functions for event listeners
      this.onClick = this.onClick.bind(this);
      this.onKeydown = this.onKeydown.bind(this);
    }

    /**
     * Loops through all openTriggers and binds click event
     * @param  {array} triggers [Array of node elements]
     * @return {void}
     */
    registerTriggers(...triggers) {
      triggers.filter(Boolean).forEach(trigger => {
        trigger.addEventListener('click', event => this.showDialogue(event));
      });
    }

    showDialogue(event = null) {
      this.activeElement = document.activeElement;
      this.dialogue.setAttribute('aria-hidden', 'false');
      this.dialogue.classList.add(this.config.openClass);
      this.scrollBehaviour('disable');
      this.addEventListeners();

      if (this.config.awaitOpenAnimation) {
        const handler = () => {
          this.dialogue.removeEventListener('animationend', handler, false);
          this.setFocusToFirstNode();
        };
        this.dialogue.addEventListener('animationend', handler, false);
      } else {
        this.setFocusToFirstNode();
      }

      this.config.onShow(this.dialogue, this.activeElement, event);
    }

    closeDialogue(event = null) {
      const dialogue = this.dialogue;
      this.dialogue.setAttribute('aria-hidden', 'true');
      this.removeEventListeners();
      this.scrollBehaviour('enable');
      if (this.activeElement && this.activeElement.focus) {
        this.activeElement.focus();
      }
      this.config.onClose(this.dialogue, this.activeElement, event);

      if (this.config.awaitCloseAnimation) {
        let openClass = this.config.openClass; // <- old school ftw
        this.dialogue.addEventListener(
          'animationend',
          function handler() {
            dialogue.classList.remove(openClass);
            dialogue.removeEventListener('animationend', handler, false);
          },
          false,
        );
      } else {
        dialogue.classList.remove(this.config.openClass);
      }
    }

    closeDialogueById(targetDialogue) {
      this.dialogue = document.getElementById(targetDialogue);
      if (this.dialogue) this.closeDialogue();
    }

    scrollBehaviour(toggle) {
      if (!this.config.disableScroll) return;
      const body = document.querySelector('body');
      switch (toggle) {
        case 'enable':
          Object.assign(body.style, { overflow: '' });
          break;
        case 'disable':
          Object.assign(body.style, { overflow: 'hidden' });
          break;
        default:
      }
    }

    addEventListeners() {
      this.dialogue.addEventListener('touchstart', this.onClick);
      this.dialogue.addEventListener('click', this.onClick);
      document.addEventListener('keydown', this.onKeydown);
    }

    removeEventListeners() {
      this.dialogue.removeEventListener('touchstart', this.onClick);
      this.dialogue.removeEventListener('click', this.onClick);
      document.removeEventListener('keydown', this.onKeydown);
    }

    onClick(event) {
      if (event.target.hasAttribute(this.config.closeTrigger)) {
        this.closeDialogue(event);
      }
    }

    onKeydown(event) {
      if (event.keyCode === 27) this.closeDialogue(event); // esc
      if (event.keyCode === 9) this.retainFocus(event); // tab
    }

    getFocusableNodes() {
      const nodes = this.dialogue.querySelectorAll(FOCUSABLE_ELEMENTS);
      return Array(...nodes);
    }

    /**
     * Tries to set focus on a node which is not a close trigger
     * if no other nodes exist then focuses on first close trigger
     */
    setFocusToFirstNode() {
      if (this.config.disableFocus) return;

      const focusableNodes = this.getFocusableNodes();

      // no focusable nodes
      if (focusableNodes.length === 0) return;

      // remove nodes on whose click, the dialogue closes
      // could not think of a better name :(
      const nodesWhichAreNotCloseTargets = focusableNodes.filter(node => {
        return !node.hasAttribute(this.config.closeTrigger);
      });

      if (nodesWhichAreNotCloseTargets.length > 0)
        nodesWhichAreNotCloseTargets[0].focus();
      if (nodesWhichAreNotCloseTargets.length === 0) focusableNodes[0].focus();
    }

    retainFocus(event) {
      let focusableNodes = this.getFocusableNodes();

      // no focusable nodes
      if (focusableNodes.length === 0) return;

      /**
       * Filters nodes which are hidden to prevent
       * focus leak outside dialogue
       */
      focusableNodes = focusableNodes.filter(node => {
        return node.offsetParent !== null;
      });

      // if disableFocus is true
      if (!this.dialogue.contains(document.activeElement)) {
        focusableNodes[0].focus();
      } else {
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
    }
  }

  /**
   * Dialogue prototype ends.
   * Here on code is responsible for detecting and
   * auto binding event handlers on dialogue triggers
   */

  // Keep a reference to the opened dialogue
  let activeDialogue = null;

  /**
   * Generates an associative array of dialogues and it's
   * respective triggers
   * @param  {array} triggers     An array of all triggers
   * @param  {string} triggerAttr The data-attribute which triggers the module
   * @return {array}
   */
  const generateTriggerMap = (triggers, triggerAttr) => {
    const triggerMap = [];

    triggers.forEach(trigger => {
      const targetDialogue = trigger.attributes[triggerAttr].value;
      if (triggerMap[targetDialogue] === undefined)
        triggerMap[targetDialogue] = [];
      triggerMap[targetDialogue].push(trigger);
    });

    return triggerMap;
  };

  /**
   * Validates whether a dialogue of the given id exists
   * in the DOM
   * @param  {number} id  The id of the dialogue
   * @return {boolean}
   */
  const validateDialoguePresence = id => {
    if (!document.getElementById(id)) {
      console.warn(
        `MicroDialogue: \u2757Seems like you have missed %c'${id}'`,
        'background-color: #f8f9fa;color: #50596c;font-weight: bold;',
        'ID somewhere in your code. Refer example below to resolve it.',
      );
      console.warn(
        `%cExample:`,
        'background-color: #f8f9fa;color: #50596c;font-weight: bold;',
        `<div class="dialogue" id="${id}"></div>`,
      );
      return false;
    }
  };

  /**
   * Validates if there are dialogue triggers present
   * in the DOM
   * @param  {array} triggers An array of data-triggers
   * @return {boolean}
   */
  const validateTriggerPresence = triggers => {
    if (triggers.length <= 0) {
      console.warn(
        `MicroDialogue: \u2757Please specify at least one %c'microdialogue-trigger'`,
        'background-color: #f8f9fa;color: #50596c;font-weight: bold;',
        'data attribute.',
      );
      console.warn(
        `%cExample:`,
        'background-color: #f8f9fa;color: #50596c;font-weight: bold;',
        `<a href="#" data-dialogue-trigger="my-dialogue"></a>`,
      );
      return false;
    }
  };

  /**
   * Checks if triggers and their corresponding dialogues
   * are present in the DOM
   * @param  {array} triggers   Array of DOM nodes which have data-triggers
   * @param  {array} triggerMap Associative array of dialogues and their triggers
   * @return {boolean}
   */
  const validateArgs = (triggers, triggerMap) => {
    validateTriggerPresence(triggers);
    if (!triggerMap) return true;
    for (var id in triggerMap) validateDialoguePresence(id);
    return true;
  };

  /**
   * Binds click handlers to all dialogue triggers
   * @param  {object} config [description]
   * @return void
   */
  const init = config => {
    // Create an config object with default openTrigger
    const options = Object.assign(
      {},
      { openTrigger: 'data-dialogue-trigger' },
      config,
    );

    // Collects all the nodes with the trigger
    const triggers = [...document.querySelectorAll(`[${options.openTrigger}]`)];

    // Makes a mappings of dialogues with their trigger nodes
    const triggerMap = generateTriggerMap(triggers, options.openTrigger);

    // Checks if dialogues and triggers exist in dom
    if (
      options.debugMode === true &&
      validateArgs(triggers, triggerMap) === false
    )
      return;

    // For every target dialogue creates a new instance
    for (var key in triggerMap) {
      let value = triggerMap[key];
      options.targetDialogue = key;
      options.triggers = [...value];
      activeDialogue = new Dialogue(options); // eslint-disable-line no-new
    }
  };

  /**
   * Shows a particular dialogue
   * @param  {string} targetDialogue [The id of the dialogue to display]
   * @param  {object} config [The configuration object to pass]
   * @return {void}
   */
  const show = (targetDialogue, config) => {
    const options = config || {};
    options.targetDialogue = targetDialogue;

    // Checks if dialogues and triggers exist in dom
    if (
      options.debugMode === true &&
      validateDialoguePresence(targetDialogue) === false
    )
      return;

    // clear events in case previous dialogue wasn't close
    if (activeDialogue) activeDialogue.removeEventListeners();

    // stores reference to active dialogue
    activeDialogue = new Dialogue(options); // eslint-disable-line no-new
    activeDialogue.showDialogue();
  };

  /**
   * Closes the active dialogue
   * @param  {string} targetDialogue [The id of the dialogue to close]
   * @return {void}
   */
  const close = targetDialogue => {
    targetDialogue
      ? activeDialogue.closeDialogueById(targetDialogue)
      : activeDialogue.closeDialogue();
  };

  return { init, show, close };
})();

MicroDialogue.init();
