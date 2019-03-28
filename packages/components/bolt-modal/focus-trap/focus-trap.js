import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { html, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';

import { debounce } from './debounce';
import { isFocusable, isHidden } from './focusable';
import { queryShadowRoot } from './shadow';

// export interface IFocusTrap {
// 	inactive: boolean;
// 	readonly focused: boolean;
// 	focusFirstElement: (() => void);
// 	focusLastElement: (() => void);
// 	getFocusableElements: (() => HTMLElement[]);
// }

/**
 * Template for the focus trap.
 */
const template = document.createElement('template');
template.innerHTML = `
	<div id="start"></div>
	<slot></slot>
	<div id="backup"></div>
	<div id="end"></div>
`;

/**
 * Focus trap web component.
 * @slot - Default content.
 */
@define
class FocusTrap extends withLitHtml() {
  static is = 'focus-trap';
  // Whenever one of these attributes changes we need to render the template again.
  // static get observedAttributes () {
  // 	return [
  // 		"inactive"
  // 	];
  // }

  static props = {
    // inactive: props.boolean,
    readonly: props.boolean,
    focused: props.boolean,
    inactive: {
      ...props.boolean,
      ...{ default: true },
    },
    // focusFirstElement: props.function,
    // focusLastElement: props.function,
    // getFocusableElements: props.function,
    // 	focusFirstElement: (() => void);
    // 	focusLastElement: (() => void);
    // 	getFocusableElements: (() => HTMLElement[]);
  };

  /**
   * Determines whether the focus trap is active or not.
   * @attr
   */
  // get inactive() {
  //   return this.hasAttribute('inactive');
  // }

  // set inactive(value) {
  //   value
  //     ? this.setAttribute('inactive', '')
  //     : this.removeAttribute('inactive');
  // }

  // The backup element is only used if there are no other focusable children
  $backup;

  // The debounce id is used to distinguish this focus trap from others when debouncing
  debounceId = Math.random().toString();

  $start;

  $end;

  // _focused = false;

  // /**
  //  * Returns whether the element currently has focus.
  //  */
  // get focused() {
  //   return this._focused;
  // }

  /**
   * Attaches the shadow root.
   */
  // constructor() {
  //   super();

  //   // if (this.useShadow){
  //   // 	const shadow = this.attachShadow({mode: "open"});
  //   // 	shadow.appendChild(template.content.cloneNode(true));
  //   // } else {

  //   // }

  // }

  constructor() {
    super();
  }

  connecting() {
    super.connecting && super.connecting();

    this.focusLastElement = this.focusLastElement.bind(this);
    this.focusFirstElement = this.focusFirstElement.bind(this);
    this.onFocusIn = this.onFocusIn.bind(this);
    this.onFocusOut = this.onFocusOut.bind(this);
  }

  /**
   * Hooks up the element.
   */
  rendered() {
    super.rendered && super.rendered();

    if (this.inactive === false) {
      this.$backup = this.renderRoot.querySelector('#backup');
      this.$start = this.renderRoot.querySelector('#start');
      this.$end = this.renderRoot.querySelector('#end');

      this.$start.addEventListener('focus', this.focusLastElement);
      this.$end.addEventListener('focus', this.focusFirstElement);

      // Focus out is called every time the user tabs around inside the element
      this.addEventListener('focusin', this.onFocusIn);
      this.addEventListener('focusout', this.onFocusOut);
    }
  }
  // this.render();

  /**
   * Tears down the element.
   */
  disconnecting() {
    super.disconnecting && super.disconnecting();
    this.$start.removeEventListener('focus', this.focusLastElement);
    this.$end.removeEventListener('focus', this.focusFirstElement);
    this.removeEventListener('focusin', this.onFocusIn);
    this.removeEventListener('focusout', this.onFocusOut);
  }

  /**
   * When the attributes changes we need to re-render the template.
   */
  // attributeChangedCallback() {
  //   this.render();
  // }

  /**
   * Focuses the first focusable element in the focus trap.
   */
  focusFirstElement() {
    console.log('focusFirstElement');
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
    // if (this.shadowRoot) {
    // } else {
    // }
    console.log(queryShadowRoot(this, isHidden, isFocusable));
    return queryShadowRoot(this, isHidden, isFocusable);
  }

  /**
   * Focuses on either the last or first focusable element.
   * @param {boolean} trapToEnd
   */
  trapFocus(trapToEnd) {
    if (this.inactive) return;

    let focusableChildren = this.getFocusableElements();
    if (focusableChildren.length > 0) {
      if (trapToEnd) {
        focusableChildren[focusableChildren.length - 1].focus();
      } else {
        focusableChildren[0].focus();
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
    if (this.inactive === false) {
      this.updateFocused(true);
    }
  }

  /**
   * When the element looses its focus this function is called.
   */
  onFocusOut() {
    if (this.inactive === false) {
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
    // debounce(
    //   () => {
    //     if (this.focused !== value) {
    //       this._focused = value;
    //       this.updated();
    //     }
    //   },
    //   0,
    //   this.debounceId,
    // );
  }

  /**
   * Updates the template.
   */
  render() {
    // if (!this.isConnected) return;
    // this.$start.setAttribute(
    //   'tabindex',
    //   !this.focused || this.inactive ? `-1` : `0`,
    // );
    // this.$end.setAttribute(
    //   'tabindex',
    //   !this.focused || this.inactive ? `-1` : `0`,
    // );
    // this.focused
    //   ? this.setAttribute('focused', '')
    //   : this.removeAttribute('focused');

    return html`
      <div id="start" tabindex="${this.inactive === true ? `-1` : `0`}"></div>
      ${this.slot('default')}
      <div id="backup"></div>
      <div id="end" tabindex="${this.inactive === true ? `-1` : `0`}"></div>
    `;
  }
}

export { withLitHtml };
