import { html, customElement } from '@bolt/element';
import { props } from '@bolt/core/utils';
import { withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import { isFocusable, isHidden } from './focusable';
import { queryShadowRoot } from './shadow';

/**
 * Focus trap web component.
 * @slot - Default content.
 */

@customElement('focus-trap')
class FocusTrap extends withLitHtml {
  static props = {
    readonly: props.boolean,
    focused: props.boolean,
    active: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // The backup element is only used if there are no other focusable children
  $backup;

  $start;

  $end;

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    return self;
  }

  connecting() {
    super.connecting && super.connecting();

    this.focusLastElement = this.focusLastElement.bind(this);
    this.focusFirstElement = this.focusFirstElement.bind(this);
    this.onFocusIn = this.onFocusIn.bind(this);
    this.onFocusOut = this.onFocusOut.bind(this);
    this.addEventListener('focusin', this.onFocusIn);
    this.addEventListener('focusout', this.onFocusOut);
  }

  /**
   * Hooks up the element.
   */
  rendered() {
    super.rendered && super.rendered();
    this.$backup = this.renderRoot.querySelector('#backup');
    this.$start = this.renderRoot.querySelector('#start');
    this.$end = this.renderRoot.querySelector('#end');
  }

  /**
   * Tears down the element.
   */
  disconnecting() {
    super.disconnecting && super.disconnecting();
    // Check that $start and $end are defined. In IE, disconnecting() can be called while $start and $end are still undefined, which throws an error.
    this.$start &&
      this.$start.removeEventListener('focus', this.focusLastElement);
    this.$end && this.$end.removeEventListener('focus', this.focusFirstElement);
    this.removeEventListener('focusin', this.onFocusIn);
    this.removeEventListener('focusout', this.onFocusOut);
  }

  /**
   * Focuses the first focusable element in the focus trap.
   */
  focusFirstElement() {
    this.trapFocus();
  }

  /**
   * Focuses the last focusable element in the focus trap.
   */
  focusLastElement() {
    this.trapFocus(true);
  }

  /**
   * Returns a list of the focusable children found within the element.
   */
  getFocusableElements() {
    return queryShadowRoot(this, isHidden, isFocusable);
  }

  /**
   * Focuses on either the last or first focusable element.
   * @param {boolean} trapToEnd
   */
  trapFocus(trapToEnd) {
    if (!this.active) return;

    let focusableChildren = this.getFocusableElements();

    let firstChildSelector = focusableChildren[0];
    let lastChildSelector = focusableChildren[focusableChildren.length - 1];

    // when shadowDOM is disabled, we need to slightly adjust the offset of the chlidren that get focused on to account for this component's DOM nodes being part of the totally children in the array being counted.
    if (this.useShadow === false) {
      firstChildSelector = focusableChildren[1];
      lastChildSelector = focusableChildren[focusableChildren.length - 2];
    }

    if (focusableChildren.length > 0) {
      if (trapToEnd) {
        lastChildSelector.focus();
      } else {
        firstChildSelector.focus();
      }

      this.$backup.setAttribute('tabindex', '-1');
    } else {
      // If there are no focusable children we need to focus on the backup
      // to trap the focus. This is a useful behavior if the focus trap is
      // for example used in a dialog and we don't want the user to tab
      // outside the dialog even though there are no focusable children
      // in the dialog.
      this.$backup.setAttribute('tabindex', '0');
      this.$backup.focus();
    }
  }

  /**
   * When the element gains focus this function is called.
   */
  onFocusIn() {
    if (this.active) {
      this.updateFocused(true);
    }
  }

  /**
   * When the element looses its focus this function is called.
   */
  onFocusOut() {
    if (this.active) {
      this.updateFocused(false);
    }
  }

  /**
   * Updates the focused property and updates the view.
   * The update is debounced because the focusin and focusout out
   * might fire multiple times in a row. We only want to render
   * the element once, therefore waiting until the focus is "stable".
   * @param value
   */
  updateFocused(value) {
    this.updated();
  }

  /**
   * Updates the template.
   */
  render() {
    return html`
      <div
        id="start"
        tabindex="${this.active === true ? `0` : `-1`}"
        @focus=${e => this.focusLastElement(e)}
      ></div>
      ${this.slot('default')}
      <div id="backup"></div>
      <div
        id="end"
        tabindex="${this.active === true ? `0` : `-1`}"
        @focus=${e => this.focusFirstElement(e)}
      ></div>
    `;
  }
}

export { FocusTrap };
