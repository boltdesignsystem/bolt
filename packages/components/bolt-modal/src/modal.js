// based originally off of https://github.com/edenspiekermann/a11y-dialog before heavy modifications and customizations

import { html, customElement, BoltElement, unsafeCSS } from '@bolt/element';
import {
  hasNativeShadowDomSupport,
  getTransitionDuration,
  bodyHasScrollbar,
  getScrollbarWidth,
  setScrollbarPadding,
  resetScrollbarPadding,
} from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import styles from './modal.scss';
import schema from '../modal.schema.js';
import '../focus-trap';

const tabbable = require('tabbable');
const ESCAPE_KEY = 27;
let cx = classNames.bind(styles);

@customElement('bolt-modal')
class BoltModal extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      open: { type: Boolean },
      hideCloseButton: { type: Boolean },
    };
  }

  constructor() {
    super();

    // Internal switch to enable 'no-body-scroll' feature which is not ready for release
    this._noBodyScroll = false;
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  static scrollbarWidth = getScrollbarWidth();

  static get bodyHasScrollbar() {
    return bodyHasScrollbar();
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    this._handleKeyPresseskeypress = this._handleKeyPresseskeypress.bind(this);
    document.addEventListener('keydown', this._handleKeyPresseskeypress);

    this.setAttribute('ready', '');
  }

  updated(changedProperties) {
    super.updated && super.updated(changedProperties);

    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'open') {
        if (this.open) {
          this.focusTrap.active = true;
          this.setFocusToFirstItem();
          this.ready = true;
        }
      }
    });
  }

  // Initialise everything needed for the dialog to work properly
  firstUpdated() {
    super.firstUpdated && super.firstUpdated();

    // reference to the focus trap element inside -- handles focus binding when enabled
    this.focusTrap = this.renderRoot.querySelector('focus-trap');

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
      // Alter the behavior on a persistent modal to redirect to the return link value
      if (this.persistent) {
        if (this.persistentReturnUrl.length) {
          window.location = this.persistentReturnUrl;
        }
      } else {
        this.hide();
      }
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
   * Set focus on the close button, the first element with `data-bolt-autofocus`,
   * `autofocus`, or the first focusable element in the modal (in that order)
   */
  async setFocusToFirstItem() {
    const closeButton = this.renderRoot.querySelector(
      '.js-close-button-fallback',
    );
    const boltAutofocusEl = this.querySelector('[data-bolt-autofocus]');
    const autofocusEl = this.querySelector('[autofocus]');

    const initialEl =
      closeButton || boltAutofocusEl || autofocusEl || tabbable(this)[0];

    if (!initialEl) return;

    const tagName = initialEl.tagName.toLowerCase();

    if (tagName.includes('bolt-') && customElements.get(tagName)) {
      // Wait for component to update or renderRoot can be undefined.
      await initialEl.updateComplete;
      tabbable(initialEl.renderRoot)[0].focus();
    } else {
      initialEl.focus();
    }
  }

  /**
   * Automatically adds classes for the first and last slotted item (in the default slot) to help with tricky ::slotted selectors
   * @todo: refactor, move into base class
   */
  addClassesToSlottedChildren() {
    if (this.slotMap) {
      const applyClasses = slotName => {
        const currentSlot = [];

        this.slotMap.get(slotName).forEach(item => {
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

      this.slotMap.get('default') && applyClasses('default');
      this.slotMap.get('header') && applyClasses('header');
      this.slotMap.get('footer') && applyClasses('footer');
    }
  }

  /**
   * Destroy the current instance (after making sure the dialog has been hidden)
   * and remove all associated listeners from dialog openers and closers
   *
   * @return {this}
   */
  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    // Remove the focus event listener to the body element and stop listening for specific key presses
    document.removeEventListener('keydown', this._handleKeyPresseskeypress);
    this.removeAttribute('ready');
    // Hide the dialog to avoid destroying an open instance
    this.hide();
  }

  render() {
    const uuid = this.uuid || Math.floor(10000 + Math.random() * 90000);

    const classes = cx('c-bolt-modal', {
      [`is-open`]: this.open,
      [`is-persistent`]: this.persistent,
      [`c-bolt-modal--scroll-${this.scroll}`]: this.scroll,
      [`c-bolt-modal--overlay-dark`]:
        this.theme && (this.theme === 'light' || this.theme === 'xlight'),
      [`c-bolt-modal--overlay-light`]:
        this.theme && (this.theme === 'dark' || this.theme === 'xdark'),
    });

    const headerClasses = cx('c-bolt-modal__container-header', {
      [`c-bolt-modal__container-header--hidden`]:
        this.slotMap.get('header') === undefined ||
        !this.slotMap.get('header').length,
    });

    const contentClasses = cx('c-bolt-modal__content', {
      [`c-bolt-modal__content--width-${this.width}`]:
        this.width && this.width !== 'auto',
    });

    const containerClasses = cx('c-bolt-modal__container', {
      [`c-bolt-modal__container--spacing-${this.spacing}`]:
        this.spacing && this.spacing !== 'none',
      [`t-bolt-${this.theme}`]: this.theme && this.theme !== 'none',
    });

    const closeButtonClasses = cx('c-bolt-modal__close-button', {
      [`c-bolt-modal__close-button--hidden`]: this.hideCloseButton,
      [`c-bolt-modal__close-button--dark`]:
        this.theme && (this.theme === 'dark' || this.theme === 'xdark'),
      [`c-bolt-modal__close-button--light`]:
        this.theme && (this.theme === 'light' || this.theme === 'xlight'),
    });

    const defaultCloseButton = html`
      <bolt-trigger
        class="js-close-button-fallback"
        @click=${e => this.hide(e)}
        display="block"
        no-outline
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
      if (this.slotMap.get('footer')) {
        return html`
          <footer class="c-bolt-modal__container-footer">
            ${this.slotify('footer')}
          </footer>
        `;
      }
    };

    this.addClassesToSlottedChildren();

    // @todo: work through how we want to handle the default dialog modal title
    //  vs a customized modal title vs providing a title but hiding it.
    return html`
      <div
        class="${classes}"
        aria-hidden=${this.open === true ? 'false' : 'true'}
        @click="${handleModalClick}"
      >
        ${this.slotify('trigger')}
        <focus-trap>
          <dialog
            aria-labelledby="dialog-title-${uuid}"
            ?open=${this.open}
            aria-hidden=${this.open === true ? 'false' : 'true'}
            class="${contentClasses}"
          >
            <article class="${containerClasses}">
              ${!this.persistent
                ? html`
                    <div class="${closeButtonClasses}">
                      ${this.slotMap.get('close')
                        ? this.slotify('close')
                        : defaultCloseButton}
                    </div>
                  `
                : ''}
              <header class="${headerClasses}">
                <h1
                  id="dialog-title-${uuid}"
                  class="c-bolt-modal__dialog-title"
                >
                  Dialog content
                </h1>
                ${this.slotify('header')}
              </header>
              <div class="c-bolt-modal__container-body">
                ${this.slotify('default')}
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
