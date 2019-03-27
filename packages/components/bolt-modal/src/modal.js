import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './modal.scss';
import schema from '../modal.schema.yml';

const FOCUSABLE_ELEMENTS = [
  'bolt-button:not([inert])',
  'bolt-link:not([inert])',
  'a[href]:not([tabindex^="-"]):not([inert])',
  'area[href]:not([tabindex^="-"]):not([inert])',
  'input:not([disabled]):not([inert])',
  'select:not([disabled]):not([inert])',
  'textarea:not([disabled]):not([inert])',
  'button:not([disabled]):not([inert])',
  'iframe:not([tabindex^="-"]):not([inert])',
  'audio:not([tabindex^="-"]):not([inert])',
  'video:not([tabindex^="-"]):not([inert])',
  '[contenteditable]:not([tabindex^="-"]):not([inert])',
  '[tabindex]:not([tabindex^="-"]):not([inert])',
];
const TAB_KEY = 9;
const ESCAPE_KEY = 27;
let focusedBeforeDialog;

let cx = classNames.bind(styles);

@define
class BoltModal extends withLitHtml() {
  static is = 'bolt-modal';

  static props = {
    shown: {
      ...props.boolean,
      ...{ default: false },
    },
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    disabled: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.show = self.show.bind(this);
    self.hide = self.hide.bind(this);
    self.maintainFocus = this.maintainFocus.bind(this);
    self.bindKeypress = this.bindKeypress.bind(this);
    return self;
  }

  connecting() {
    super.connecting && super.connecting();

    // Prebind the functions that will be bound in addEventListener and
    // removeEventListener to avoid losing references

    // Keep an object of listener types mapped to callback functions
    // this._listeners = {};

    // Set the `shown` property to match the status from the DOM
    // this.shown = this.dialog.hasAttribute('open');
    this.shown = false;

    // this.create(targets);
  }

  // Initialise everything needed for the dialog to work properly
  rendered() {
    super.rendered && super.rendered();

    // const targets = document.querySelector('main');

    // Keep a reference of the node and the actual dialog on the instance
    this.container = this.renderRoot.querySelector('#my-accessible-dialog');

    this.dialog = this.renderRoot.querySelector(
      'dialog, [role="dialog"], [role="alertdialog"]',
      );
      
      this.role = this.dialog.getAttribute('role') || 'dialog';
      this.useDialog =
      'show' in document.createElement('dialog') &&
      this.dialog.nodeName === 'DIALOG';
      
    // console.log(this.dialog);
    // Keep a collection of nodes to disable/enable when toggling the dialog
    // this._targets =
    //   this._targets || this.collect(targets) || this.getSiblings(this);
    this._targets = this._targets || this.getSiblings(this);

    // Despite using a `<dialog>` element, `role="dialog"` is not necessarily
    // implied by all screen-readers (yet)
    // See: https://github.com/edenspiekermann/a11y-dialog/commit/6ba711a777aed0dbda0719a18a02f742098c64d9#commitcomment-28694166
    // this.dialog.setAttribute('role', this.role);

    // if (!this.useDialog) {
    //   if (this.shown) {
    //     this.container.removeAttribute('aria-hidden');
    //   } else {
    //     this.container.setAttribute('aria-hidden', true);
    //   }
    // } else {
    //   this.container.setAttribute('data-a11y-dialog-native', '');
    // }

    // Keep a collection of dialog openers, each of which will be bound a click
    // event listener to open the dialog
    this._openers = this.$$(
      '[data-a11y-dialog-show="' + this.container.id + '"]',
    );
    this._openers.forEach(opener => {
      opener.addEventListener('click', this.show);
    });

    // Keep a collection of dialog closers, each of which will be bound a click
    // event listener to close the dialog
    this._closers = this.$$('[data-a11y-dialog-hide]', this.container).concat(
      this.$$('[data-a11y-dialog-hide="' + this.container.id + '"]'),
    );

    // console.log(this._closers);
    this._closers.forEach(closer => {
      // console.log(closer);
      closer.addEventListener('click', this.hide);
    });

    // Execute all callbacks registered for the `create` event
    // this._fire('create');
  }

  // rendered() {
  //   const el = this.renderRoot.querySelector('#my-accessible-dialog');
  //   // .renderRoot.querySelector('#my-accessible-dialog');

  //   // Instantiate a new A11yDialog module
  //   this.dialog = new A11yDialog(el);
  // }

  /**
   * Show the dialog element, disable all the targets (siblings), trap the
   * current focus within it, listen for some specific key presses and fire all
   * registered callbacks for `show` event
   *
   * @param {Event} event
   * @return {this}
   */
  show(event) {
    // If the dialog is already open, abort
    // if (this.shown) {
    //   return this;
    // }

    this.shown = true;

    // console.log(this.shown);

    // Keep a reference to the currently focused element to be able to restore
    // it later
    focusedBeforeDialog = document.activeElement;

    // console.log(focusedBeforeDialog);

    // if (this.useDialog) {
    //   this.dialog.showModal(event instanceof Event ? void 0 : event);
    // } else {
    // this.dialog.setAttribute('open', '');
    // this.container.removeAttribute('aria-hidden');

    // Iterate over the targets to disable them by setting their `aria-hidden`
    // attribute to `true`
    this._targets.forEach(function(target) {
      target.setAttribute('aria-hidden', 'true');
    });
    // }

    // Set the focus to the first focusable child of the dialog element
    this.setFocusToFirstItem(this);

    // Bind a focus event listener to the body element to make sure the focus
    // stays trapped inside the dialog while open, and start listening for some
    // specific key presses (TAB and ESC)
    document.body.addEventListener('focus', this.maintainFocus, true);
    document.addEventListener('keydown', this.bindKeypress);

    // Execute all callbacks registered for the `show` event
    // this._fire('show', event);

    // return this;
  }

  /**
   * Hide the dialog element, enable all the targets (siblings), restore the
   * focus to the previously active element, stop listening for some specific
   * key presses and fire all registered callbacks for `hide` event
   *
   * @param {Event} event
   * @return {this}
   */
  hide(event) {
    // console.log('hide');

    // If the dialog is already closed, abort
    // if (!this.shown) {
    //   return this;
    // }

    this.shown = false;

    // console.log(this.shown);

    if (this.useDialog) {
      this.dialog.close(event instanceof Event ? void 0 : event);
    } else {
      // this.dialog.removeAttribute('open');
      // this.container.setAttribute('aria-hidden', 'true');

      // Iterate over the targets to enable them by removing their `aria-hidden`
      // attribute
      this._targets.forEach(function(target) {
        target.removeAttribute('aria-hidden');
      });
    }

    // If there was a focused element before the dialog was opened, restore the
    // focus back to it
    if (focusedBeforeDialog) {
      if (focusedBeforeDialog.renderRoot) {
        if (focusedBeforeDialog.renderRoot.querySelector('button')) {
          focusedBeforeDialog.renderRoot.querySelector('button').focus();
        } else if (focusedBeforeDialog.renderRoot.querySelector('a')) {
          focusedBeforeDialog.renderRoot.querySelector('a').focus();
        } else {
          focusedBeforeDialog.focus();
        }
      } else {
        focusedBeforeDialog.focus();
      }
    }

    // Remove the focus event listener to the body element and stop listening
    // for specific key presses
    document.body.removeEventListener('focus', this.maintainFocus, true);
    document.removeEventListener('keydown', this.bindKeypress);

    // Execute all callbacks registered for the `hide` event
    // this._fire('hide', event);

    // return this;
  }

  /**
   * Private event handler used when listening to some specific key presses
   * (namely ESCAPE and TAB)
   *
   * @access private
   * @param {Event} event
   */
  bindKeypress = function(event) {
    // If the dialog is shown and the ESCAPE key is being pressed, prevent any
    // further effects from the ESCAPE key and hide the dialog, unless its role
    // is 'alertdialog', which should be modal
    if (
      this.shown &&
      event.which === ESCAPE_KEY &&
      this.role !== 'alertdialog'
    ) {
      event.preventDefault();
      this.hide();
    }

    // If the dialog is shown and the TAB key is being pressed, make sure the
    // focus stays trapped within the dialog element
    if (this.shown && event.which === TAB_KEY) {
      this.trapTabKey(this.dialog, event);
    }
  };

  /**
   * Private event handler used when making sure the focus stays within the
   * currently open dialog
   *
   * @access private
   * @param {Event} event
   */
  maintainFocus = function(event) {
    // If the dialog is shown and the focus is not within the dialog element,
    // move it back to its first focusable child
    if (this.shown && !this.container.contains(event.target)) {
      this.setFocusToFirstItem(this);
    }
  };

  /**
   * Convert a NodeList into an array
   *
   * @param {NodeList} collection
   * @return {Array<Element>}
   */
  toArray(collection) {
    return Array.prototype.slice.call(collection);
  }

  /**
   * Query the DOM for nodes matching the given selector, scoped to context (or
   * the whole document)
   *
   * @param {String} selector
   * @param {Element} [context = document]
   * @return {Array<Element>}
   */
  $$(selector, context) {
    return this.toArray((context || document).querySelectorAll(selector));
  }

  /**
   * Return an array of Element based on given argument (NodeList, Element or
   * string representing a selector)
   *
   * @param {(NodeList | Element | string)} target
   * @return {Array<Element>}
   */
  collect(target) {
    if (NodeList.prototype.isPrototypeOf(target)) {
      return this.toArray(target);
    }

    if (Element.prototype.isPrototypeOf(target)) {
      return [target];
    }

    if (typeof target === 'string') {
      return this.$$(target);
    }
  }

  /**
   * Set the focus to the first element with `autofocus` or the first focusable
   * child of the given element
   *
   * @param {Element} node
   */
  setFocusToFirstItem(node) {
    console.log(this.getFocusableChildren(this.renderRoot.querySelector('dialog')));
    console.log(this.getFocusableChildren(this));


    // if (this.shadowRoot){
    //   this
    // }
    // let slots = this.shadowRoot.querySelectorAll('slot');
    // slots[1].addEventListener('slotchange', function(e) {
    //   let nodes = slots[1].assignedNodes();
    //   console.log('Element in Slot "' + slots[1].name + '" changed to "' + nodes[0].outerHTML + '".');
    // });

    var focusableChildren = this.getFocusableChildren(node);
    var focused = node.querySelector('[autofocus]') || focusableChildren[0];

    if (focused) {
      focused.focus();
    }
  }

  /**
   * Get the focusable children of the given element
   *
   * @param {Element} node
   * @return {Array<Element>}
   */
  getFocusableChildren(node) {
    return this.$$(FOCUSABLE_ELEMENTS.join(','), node).filter(function(child) {
      // return !!(
      //   child.offsetWidth ||
      //   child.offsetHeight ||
      //   child.getClientRects().length
      // );
      return child;
    });
  }

  /**
   * Trap the focus inside the given element
   *
   * @param {Element} node
   * @param {Event} event
   */
  trapTabKey(node, event) {
    var focusableChildren = this.getFocusableChildren(node);
    var focusedItemIndex = focusableChildren.indexOf(document.activeElement);

    // If the SHIFT key is being pressed while tabbing (moving backwards) and
    // the currently focused item is the first one, move the focus to the last
    // focusable item from the dialog element
    if (event.shiftKey && focusedItemIndex === 0) {
      focusableChildren[focusableChildren.length - 1].focus();
      event.preventDefault();
      // If the SHIFT key is not being pressed (moving forwards) and the currently
      // focused item is the last one, move the focus to the first focusable item
      // from the dialog element
    } else if (
      !event.shiftKey &&
      focusedItemIndex === focusableChildren.length - 1
    ) {
      focusableChildren[0].focus();
      event.preventDefault();
    }
  }

  /**
   * Retrieve siblings from given element
   *
   * @param {Element} node
   * @return {Array<Element>}
   */
  getSiblings(node) {
    var nodes = this.toArray(node.parentNode.childNodes);
    var siblings = nodes.filter(function(node) {
      return node.nodeType === 1;
    });

    siblings.splice(siblings.indexOf(node), 1);

    return siblings;
  }

  /**
   * Destroy the current instance (after making sure the dialog has been hidden)
   * and remove all associated listeners from dialog openers and closers
   *
   * @return {this}
   */
  disconnecting() {
    super.disconnecting && super.disconnecting();

    // Hide the dialog to avoid destroying an open instance
    this.hide();

    // Remove the click event listener from all dialog openers
    this._openers.forEach(opener => {
      opener.removeEventListener('click', this.show);
    });

    // Remove the click event listener from all dialog closers
    this._closers.forEach(closer => {
      closer.removeEventListener('click', this.hide);
    });

    // Execute all callbacks registered for the `destroy` event
    // this._fire('destroy');

    // Keep an object of listener types mapped to callback functions
    // this._listeners = {};
  }

  /**
   * Register a new callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  // on = function(type, handler) {
  //   if (typeof this._listeners[type] === 'undefined') {
  //     this._listeners[type] = [];
  //   }

  //   this._listeners[type].push(handler);

  //   return this;
  // };

  /**
   * Unregister an existing callback for the given event type
   *
   * @param {string} type
   * @param {Function} handler
   */
  // off = function(type, handler) {
  //   var index = this._listeners[type].indexOf(handler);

  //   if (index > -1) {
  //     this._listeners[type].splice(index, 1);
  //   }

  //   return this;
  // };

  /**
   * Iterate over all registered handlers for given type and call them all with
   * the dialog element as first argument, event as second argument (if any).
   *
   * @access private
   * @param {string} type
   * @param {Event} event
   */
  // _fire = function(type, event) {
  //   var listeners = this._listeners[type] || [];

  //   listeners.forEach(
  //     function(listener) {
  //       listener(this.container, event);
  //     }.bind(this),
  //   );
  // };

  open() {
    // console.log('open');
    this.show();
  }

  close() {
    // console.log('close');
    this.hide();
  }

  render() {
    // validate the original prop data passed along -- returns back the validated data w/ added default values
    const { disabled } = this.validateProps(this.props);
    const { shown } = this.props;

    const classes = cx('c-bolt-modal', {
      [`c-bolt-modal--disabled`]: disabled,
    });

    // console.log(shown);

    return html`
      ${this.addStyles([styles])}
      <!--
        Dialog container related notes:
        - It is not the actual dialog window, just the container with which the script interacts.
        - It can have a different id than 'my-accessible-dialog', but it needs an 'id'
        anyway.
      -->
      <div id="my-accessible-dialog" class="${classes}">
        ${this.slot('trigger')}
        <!--
          Overlay related notes:
          - It has to have the 'tabindex="-1"' attribute.
          - It doesn’t have to have the 'data-a11y-dialog-hide' attribute, however this is recommended. It hides the dialog when clicking outside of it.
        -->
        <!-- <div tabindex="-1" data-a11y-dialog-hide class=""></div> -->

        <!--
          Dialog window content related notes:
          - It is the actual visual dialog element.
          - It may have the 'alertdialog' role to make it behave like a “modal”. See the “Usage as a modal” section of the docs.
          - It doesn’t have to be a '<dialog>' element, it can be a '<div>' element with the 'dialog' or 'alertdialog' role (e.g. '<div role="dialog">').
          - It doesn’t have to have the 'aria-labelledby' attribute however this is recommended. It should match the 'id' of the dialog title.
        -->
        <dialog
          aria-hidden=${shown === true ? 'false' : 'true'}
          aria-labelledby="dialog-title"
          ?open=${shown}
          class="c-bolt-modal__content"
        >
          <!--
            Closing button related notes:
            - It does have to have the 'type="button"' attribute.
            - It does have to have the 'data-a11y-dialog-hide' attribute.
            - It does have to have an aria-label attribute if you use an icon as content.
          -->
          <button
            type="button"
            data-a11y-dialog-hide
            aria-label="Close this dialog window"
          >
            &times;
          </button>

          <!--
            Dialog title related notes:
            - It should have a different content than 'Dialog Title'.
            - It can have a different id than 'dialog-title'.
          -->
          <h1 id="dialog-title">Dialog Title</h1>

          ${this.slot('default')}

          <!--
            Here lives the main content of the dialog.
          -->
        </dialog>
      </div>
    `;
  }
}

export { BoltModal };
