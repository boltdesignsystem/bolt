// based originally off of https://github.com/edenspiekermann/a11y-dialog before heavy modifications and customizations

import { props, define } from '@bolt/core/utils';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from './modal.scss';
import schema from '../modal.schema.yml';

const tabbable = require('tabbable');
import '../focus-trap';

const ESCAPE_KEY = 27;
let cx = classNames.bind(styles);

@define
class BoltModal extends withLitHtml() {
  static is = 'bolt-modal';

  static props = {
    width: props.string,
    spacing: props.string,
    theme: props.string,
    scroll: props.string,
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
    self.schema = schema;
    self.show = self.show.bind(this);
    self.hide = self.hide.bind(this);
    self._handleExternalClicks = self._handleExternalClicks.bind(this);
    self._handleKeyPresseskeypress = this._handleKeyPresseskeypress.bind(this);

    return self;
  }

  // @todo: refactor to handle multiple modals on the same page
  _handleExternalClicks() {
    const self = this;

    document.addEventListener('click', e => {
      let el = e.target;
      if (self.open === false) {
        return;
        // have we rendered yet?
      } else if (self.ready !== true) {
        return;
      } else if (self.persistent === true) {
        return;
      } else {
        // if we are already open + click on the trigger slot, auto-hide the modal
        if (el.getAttribute('slot') === 'trigger') {
          console.log('clicked on trigger');
          self.hide();
        }

        while (el) {
          if (el === self) {
            return;
          }
          el = el.parentNode;
        }
      }

      self.hide();
    });
  }

  connecting() {
    super.connecting && super.connecting();
    document.addEventListener('keydown', this._handleKeyPresseskeypress);
    this._handleExternalClicks();
    this.setAttribute('ready', '');
  }

  // Initialise everything needed for the dialog to work properly
  rendered() {
    super.rendered && super.rendered();
    this.focusTrap = this.renderRoot.querySelector('focus-trap'); // reference to the focus trap element inside -- handles focus binding when enabled

    if (this.open) {
      this.focusTrap.active = true;
      this.setFocusToFirstItem(this.renderRoot);

      // delay "ready" so _handleExternalClicks() doesn't close the modal immediately
      setTimeout(() => {
        this.ready = true;
      }, 1);
    }

    this.dialog = this.renderRoot.querySelector(
      'dialog, [role="dialog"], [role="alertdialog"]',
    );

    this.useDialog =
      'show' in document.createElement('dialog') &&
      this.dialog.nodeName === 'DIALOG';
  }

  // aliases for the `show` and `hide` methods
  // open() {
  //   this.show();
  // }

  // close() {
  //   this.hide();
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
    if (this.open) return;

    // Keep a reference to the currently focused element to be able to restore it later
    this.focusedBeforeDialog = document.activeElement;

    // triggers re-render
    this.open = true;

    // @todo: re-evaluate if the trigger element used needs to have it's tabindex messed with
    // this.querySelector('[slot="trigger"]').setAttribute('tabindex', '-1');

    // @todo: confirm if we still need to include this default native dialog behavior
    // if (this.useDialog) {
    //   this.dialog.showModal(event instanceof Event ? void 0 : event);
    // } else {
    // this.dialog.setAttribute('open', '');
    // this.container.removeAttribute('aria-hidden');

    // @todo: emit custom event when modal is shown
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

    // @todo: emit custom event when modal is hidden
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
   * Private event handler called when overlay, the semi-transparent background behind the moda, is clicked
   *
   * @access private
   * @param {Event} event
   */
  _handleOverlayClick(e) {
    if (!this.persistent) {
      this.hide();
    }
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

    const classes = cx('c-bolt-modal', {
      [`is-open`]: open,
      [`c-bolt-modal--scroll-${scroll}`]: scroll,
    });

    const overlayClasses = cx('c-bolt-modal__overlay', {
      [`c-bolt-modal__overlay--persistent`]: persistent,
      [`c-bolt-modal__overlay--light`]:
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
    });

    // <button> element is included here to set a required style inside the Shadow DOM.
    // Button's default transition 'all' property delays 'visibility: visible'
    // and thus prevents it from getting focus on 'rendered'.
    // @todo: Can we safely fix this from within the button component itself?
    const defaultCloseButton = html`
      <bolt-button
        class="js-close-button-fallback"
        @click=${e => this.hide(e)}
        color="text"
        icon-only
        autofocus
        tabindex="0"
      >
        <button
          style="transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);"
        >
          Close this dialog window
          <bolt-icon name="close" slot="after"></bolt-icon>
        </button>
      </bolt-button>
    `;

    const handleOverlayClick = e => this._handleOverlayClick(e);

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

    return html`
      ${this.addStyles([styles])}
      <!--
        Dialog container related notes:
        - It is not the actual dialog window, just the container with which the script interacts.
        - It can have a different id than 'my-accessible-dialog', but it needs an 'id'
        anyway.
      -->
      <div class="${classes}" aria-hidden=${open === true ? 'false' : 'true'}>
        ${this.slot('trigger')}
        <!--
          Overlay related notes:
          - It has to have the 'tabindex="-1"' attribute.
        -->
        <div
          class="${overlayClasses}"
          @click="${handleOverlayClick}"
          tabindex="-1"
        ></div>

        <!--
          Dialog window content related notes:
          - It is the actual visual dialog element.
          - It may have the 'alertdialog' role to make it behave like a “modal”. See the “Usage as a modal” section of the docs.
          - It doesn’t have to be a '<dialog>' element, it can be a '<div>' element with the 'dialog' or 'alertdialog' role (e.g. '<div role="dialog">').
          - It doesn’t have to have the 'aria-labelledby' attribute however this is recommended. It should match the 'id' of the dialog title.
        -->
        <focus-trap>
          <dialog
            aria-labelledby="dialog-title"
            ?open=${open}
            aria-hidden=${open === true ? 'false' : 'true'}
            class="${contentClasses}"
          >
            <article class="${containerClasses}">
              <!--
                Closing button related notes:
                - It does have to have the 'type="button"' attribute.
                - It does have to have an aria-label attribute if you use an icon as content.
              -->

              <div class="${closeButtonClasses}">
                ${this.slots.close ? this.slot('close') : defaultCloseButton}
              </div>

              <!-- @todo: placeholder slot for slotted header content -->
              <!-- @todo: work through how we want to handle the default dialog modal title (associated with an ID) vs a customized modal title vs providing a title but hiding it. -->
              <header class="${headerClasses}">
                <!--
                  Dialog title related notes:
                  - It should have a different content than 'Dialog Title'.
                  - It can have a different id than 'dialog-title'.
                -->

                <!-- @todo: does this need to be a unique id? Mai: Yes. -->
                <!-- @todo: do we need an option to hideTitle? Mai: Yes. Only user generated content should show up in header and footer. -->
                <h1 id="dialog-title" class="c-bolt-modal__dialog-title">
                  Dialog content
                </h1>
                ${this.slot('header')}
              </header>

              <!--
                Here lives the main content of the dialog.
              -->
              <!-- main slotted body content -->
              <div class="c-bolt-modal__container-body">
                ${this.slot('default')}
              </div>

              <!-- @todo: placeholder slot for slotted footer content -->
              ${footerTemplate()}
            </article>
          </dialog>
        </focus-trap>
      </div>
    `;
  }
}

export { BoltModal };
