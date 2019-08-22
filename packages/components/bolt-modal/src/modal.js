// based originally off of https://github.com/edenspiekermann/a11y-dialog before heavy modifications and customizations

import {
  props,
  define,
  hasNativeShadowDomSupport,
  getTransitionDuration,
  bodyHasScrollbar,
  getScrollbarWidth,
  setScrollbarPadding,
  resetScrollbarPadding,
} from '@bolt/core/utils';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './modal.scss';
import schema from '../modal.schema.yml';

const tabbable = require('tabbable');
import '../focus-trap';

const ESCAPE_KEY = 27;
let cx = classNames.bind(styles);

@define
class BoltModal extends withLitHtml {
  static is = 'bolt-modal';

  static props = {
    width: props.string,
    spacing: props.string,
    theme: props.string,
    scroll: props.string,
    uuid: props.string,
    // @todo: persistent - this is here to set up the future prop, which is commented out in the schema right now. For now, this will always be false until it's introduced. The same applies for all the other persistent logics below.
    persistent: {
      ...props.boolean,
      ...{ default: false },
    },
    open: {
      ...props.boolean,
      ...{ default: false },
    },
    hideCloseButton: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    self.schema = schema;
    self.show = self.show.bind(this);
    self.hide = self.hide.bind(this);
    self._handleKeyPresseskeypress = this._handleKeyPresseskeypress.bind(this);
    self._noBodyScroll = false; // Internal switch to enable 'no-body-scroll' feature which is not ready for release

    return self;
  }

  static scrollbarWidth = getScrollbarWidth();

  static get bodyHasScrollbar() {
    return bodyHasScrollbar();
  }

  connecting() {
    super.connecting && super.connecting();
    document.addEventListener('keydown', this._handleKeyPresseskeypress);
    this.setAttribute('ready', '');
  }

  // Initialise everything needed for the dialog to work properly
  rendered() {
    super.rendered && super.rendered();
    this.focusTrap = this.renderRoot.querySelector('focus-trap'); // reference to the focus trap element inside -- handles focus binding when enabled

    if (this.open) {
      this.focusTrap.active = true;
      this.setFocusToFirstItem(this.renderRoot);
      this.ready = true;
    }

    this.dialog = this.renderRoot.querySelector(
      'dialog, [role="dialog"], [role="alertdialog"]',
    );

    this.useDialog =
      'show' in document.createElement('dialog') &&
      this.dialog.nodeName === 'DIALOG';

    this.dispatchEvent(new CustomEvent('modal:ready'));
  }

  get _toggleEventOptions() {
    return this._noBodyScroll
      ? {
          detail: {
            hasScrollbar: BoltModal.bodyHasScrollbar,
            scrollbarWidth: BoltModal.scrollbarWidth,
          },
          bubbles: true,
        }
      : {};
  }

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
    if (this.open) return;

    // Keep a reference to the currently focused element to be able to restore it later
    this.focusedBeforeDialog = document.activeElement;

    // triggers re-render
    this.open = true;

    this.dispatchEvent(new CustomEvent('modal:show', this._toggleEventOptions));

    this._noBodyScroll && this._setScrollbar();

    // @todo: re-evaluate if the trigger element used needs to have it's tabindex messed with
    // this.querySelector('[slot="trigger"]').setAttribute('tabindex', '-1');

    // @todo: confirm if we still need to include this default native dialog behavior
    // if (this.useDialog) {
    //   this.dialog.showModal(event instanceof Event ? void 0 : event);
    // } else {
    // this.dialog.setAttribute('open', '');
    // this.container.removeAttribute('aria-hidden');

    this.dispatchEvent(
      new CustomEvent('modal:shown', this._toggleEventOptions),
    );
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
    // If the dialog is already closed, abort
    if (!this.open) {
      return this;
    }

    this.focusTrap.active = false;
    this.open = false;
    this.ready = false;

    this.dispatchEvent(new CustomEvent('modal:hide', this._toggleEventOptions));

    this.transitionDuration = getTransitionDuration(
      this.renderRoot.querySelector('.c-bolt-modal'),
    );

    // Wait until after transition or modal will shift
    setTimeout(() => {
      this._noBodyScroll && this._resetScrollbar();
      this.dispatchEvent(
        new CustomEvent('modal:hidden', this._toggleEventOptions),
      );
    }, this.transitionDuration);

    // @todo: refactor this to be more component / element agnostic
    if (this.focusedBeforeDialog) {
      if (this.focusedBeforeDialog.renderRoot) {
        if (this.focusedBeforeDialog.renderRoot.querySelector('button')) {
          this.focusedBeforeDialog.renderRoot.querySelector('button').focus();
        } else if (this.focusedBeforeDialog.renderRoot.querySelector('a')) {
          this.focusedBeforeDialog.renderRoot.querySelector('a').focus();
        } else {
          this.focusedBeforeDialog.focus();
        }
      } else {
        this.focusedBeforeDialog.focus();
      }
    }

    // @todo: look into if we still need to include this bit of original "native vs non-native" dialog handling (esp. for accessibility support)
    if (this.useDialog) {
      // eslint-disable-next-line no-void
      this.dialog.close(event instanceof Event ? void 0 : event);
    } else {
      // this.dialog.removeAttribute('open');
      // this.container.setAttribute('aria-hidden', 'true');
      // Iterate over the targets to enable them by removing their `aria-hidden`
      // attribute
      // this._targets.forEach(function(target) {
      //   target.removeAttribute('aria-hidden');
      // });
    }
  }

  /**
   * Toggle the dialog element. If dialog is open, close it. If closed, open it.
   *
   * @param {Event} event
   * @return {this}
   */
  toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Private event handler used when listening to some specific key presses
   * (namely ESCAPE and TAB)
   *
   * @access private
   * @param {Event} event
   */
  _handleKeyPresseskeypress = function(event) {
    // If the dialog is shown and the ESCAPE key is being pressed, prevent any
    // further effects from the ESCAPE key and hide the modal
    if (this.open && event.which === ESCAPE_KEY) {
      event.preventDefault();
      this.hide();
    }
  };

  /**
   * Private event handler called when overlay, the semi-transparent background behind the modal, is clicked
   *
   * @access private
   * @param {Event} event
   */
  _handleModalClick(e) {
    const modalContent = this.renderRoot.querySelector(
      '.c-bolt-modal__content',
    );

    // If event target contains modal content, assume it is an "outside" click and close
    if (e.target.contains(modalContent) && !this.persistent) {
      this.hide();
    }
  }

  _handleTriggerFocus(e) {
    const closeButton = e.target.closest('.c-bolt-modal__close-button');
    closeButton.classList.add('c-bolt-modal__close-button--focus-within');
  }

  _handleTriggerBlur(e) {
    const closeButton = e.target.closest('.c-bolt-modal__close-button');
    closeButton.classList.remove('c-bolt-modal__close-button--focus-within');
  }

  _setScrollbar() {
    BoltModal.bodyHasScrollbar &&
      setScrollbarPadding(document.body, BoltModal.scrollbarWidth);

    document.body.classList.add('u-bolt-overflow-hidden');
  }

  _resetScrollbar() {
    resetScrollbarPadding(document.body);

    document.body.classList.remove('u-bolt-overflow-hidden');
  }

  /**
   * Set the focus to the first element with `autofocus` or the first focusable
   * child of the given element
   *
   * @param {Element} node
   */
  setFocusToFirstItem(node) {
    const focusableChildren = this.getFocusableChildren(node);
    const childToBeFocused =
      node.querySelector('[autofocus]') || focusableChildren[0];

    if (childToBeFocused) {
      childToBeFocused.focus();
    }
  }

  /**
   * Get the focusable children of the given element
   *
   * @param {Element} node
   * @return {Array<Element>}
   */
  getFocusableChildren(node) {
    return tabbable(node);
  }

  /**
   * Automatically adds classes for the first and last slotted item (in the default slot) to help with tricky ::slotted selectors
   * @todo: refactor, move into base class
   */
  addClassesToSlottedChildren() {
    if (this.slots) {
      const applyClasses = slotName => {
        const currentSlot = [];

        this.slots[slotName].forEach(item => {
          if (item.tagName) {
            item.classList.remove('is-first-child');
            item.classList.remove('is-last-child'); // clean up existing classes
            currentSlot.push(item);
          }
        });

        if (currentSlot[0]) {
          currentSlot[0].classList.add('is-first-child');

          if (currentSlot.length === 1) {
            currentSlot[0].classList.add('is-last-child');
          }
        }

        if (currentSlot[currentSlot.length - 1]) {
          currentSlot[currentSlot.length - 1].classList.add('is-last-child');
        }
      };

      this.slots.default && applyClasses('default');
      this.slots.header && applyClasses('header');
      this.slots.footer && applyClasses('footer');
    }
  }

  /**
   * Destroy the current instance (after making sure the dialog has been hidden)
   * and remove all associated listeners from dialog openers and closers
   *
   * @return {this}
   */
  disconnecting() {
    super.disconnecting && super.disconnecting();
    // Remove the focus event listener to the body element and stop listening for specific key presses
    document.removeEventListener('keydown', this._handleKeyPresseskeypress);
    this.removeAttribute('ready');
    // Hide the dialog to avoid destroying an open instance
    this.hide();
  }

  render() {
    const {
      width,
      spacing,
      theme,
      scroll,
      open,
      persistent,
      hideCloseButton,
    } = this.validateProps(this.props);

    const uuid = this.props.uuid || Math.floor(10000 + Math.random() * 90000);

    const classes = cx('c-bolt-modal', {
      [`is-open`]: open,
      [`c-bolt-modal--scroll-${scroll}`]: scroll,
      [`c-bolt-modal--overlay-dark`]:
        theme && (theme === 'light' || theme === 'xlight'),
      [`c-bolt-modal--overlay-light`]:
        theme && (theme === 'dark' || theme === 'xdark'),
    });

    const headerClasses = cx('c-bolt-modal__container-header', {
      [`c-bolt-modal__container-header--hidden`]:
        this.slots.header === undefined || !this.slots.header.length,
    });

    const contentClasses = cx('c-bolt-modal__content', {
      [`c-bolt-modal__content--width-${width}`]: width && width !== 'auto',
    });

    const containerClasses = cx('c-bolt-modal__container', {
      [`c-bolt-modal__container--spacing-${spacing}`]:
        spacing && spacing !== 'none',
      [`t-bolt-${theme}`]: theme && theme !== 'none',
    });

    const closeButtonClasses = cx('c-bolt-modal__close-button', {
      [`c-bolt-modal__close-button--hidden`]: hideCloseButton,
      [`c-bolt-modal__close-button--dark`]:
        theme && (theme === 'dark' || theme === 'xdark'),
      [`c-bolt-modal__close-button--light`]:
        theme && (theme === 'light' || theme === 'xlight'),
    });

    const delegateFocus = e => {
      if (!this.useShadow) {
        const button = e.target.renderRoot.querySelector('button');
        button && button.focus();
      }
    };

    // <button> element is included here to set a required style inside the Shadow DOM.
    // Button's default transition 'all' property delays 'visibility: visible'
    // and thus prevents it from getting focus on 'rendered'.
    // @todo: Can we safely fix this from within the button component itself?
    const defaultCloseButton = html`
      <bolt-trigger
        class="js-close-button-fallback"
        @click=${e => this.hide(e)}
        @focus=${e => delegateFocus(e)}
        @trigger:focus=${e => this._handleTriggerFocus(e)}
        @trigger:blur=${e => this._handleTriggerBlur(e)}
        display="block"
        no-outline
        autofocus
        tabindex="0"
      >
        <span class="c-bolt-modal__close-button__text"
          >Close this dialog window</span
        >
        <span class="c-bolt-modal__close-button__icon"></span>
      </bolt-trigger>
    `;

    const handleModalClick = e => this._handleModalClick(e);

    // Cannot inline this logic so moved it outside of html template
    const footerTemplate = () => {
      if (this.slots.footer) {
        return html`
          <footer class="c-bolt-modal__container-footer">
            ${this.slot('footer')}
          </footer>
        `;
      }
    };

    this.addClassesToSlottedChildren();

    // @todo: work through how we want to handle the default dialog modal title
    //  vs a customized modal title vs providing a title but hiding it.
    return html`
      ${this.addStyles([styles])}
      <div
        class="${classes}"
        aria-hidden=${open === true ? 'false' : 'true'}
        @click="${handleModalClick}"
      >
        ${this.slot('trigger')}
        <focus-trap>
          <dialog
            aria-labelledby="dialog-title-${uuid}"
            ?open=${open}
            aria-hidden=${open === true ? 'false' : 'true'}
            class="${contentClasses}"
          >
            <article class="${containerClasses}">
              <div class="${closeButtonClasses}">
                ${this.slots.close ? this.slot('close') : defaultCloseButton}
              </div>
              <header class="${headerClasses}">
                <h1
                  id="dialog-title-${uuid}"
                  class="c-bolt-modal__dialog-title"
                >
                  Dialog content
                </h1>
                ${this.slot('header')}
              </header>
              <div class="c-bolt-modal__container-body">
                ${this.slot('default')}
              </div>
              ${footerTemplate()}
            </article>
          </dialog>
        </focus-trap>
      </div>
    `;
  }
}

export { BoltModal };
