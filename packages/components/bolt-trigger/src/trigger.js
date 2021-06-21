import {
  BoltActionElement,
  unsafeCSS,
  html,
  convertInitialTags,
  customElement,
} from '@bolt/element';
import { render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames/bind';
import styles from './trigger.scss';
import schema from '../trigger.schema';

let cx = classNames.bind(styles);

@customElement('bolt-trigger')
@convertInitialTags(['button', 'a']) // The first matching tag will have its attributes converted to component props
class BoltTrigger extends BoltActionElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  _handleFocus() {
    this.dispatchEvent(new CustomEvent('trigger:focus', { bubbles: true }));
  }

  _handleBlur() {
    this.dispatchEvent(new CustomEvent('trigger:blur', { bubbles: true }));
  }

  render() {
    const classes = cx('c-bolt-trigger', {
      [`c-bolt-trigger--cursor-${this.cursor}`]: this.cursor && !this.disabled,
      [`c-bolt-trigger--display-${this.display}`]: this.display,
      [`c-bolt-trigger--outline-none`]: this.noOutline,
    });

    // If a url has been provided the rendered tag will be an <a>
    const hasUrl = this.url && this.url.length;

    // The triggerElement to render
    let triggerElement;

    if (this.rootElement) {
      triggerElement = this.rootElement.firstChild.cloneNode(true);
      triggerElement.className += ' ' + classes;

      // @todo: find automatic way to dissolve original HTML elements into their respective props + custom attributes
      if (triggerElement.tagName === 'A') {
        const url = this.url || this.originalUrl;

        if (this.disabled) {
          this.originalUrl = triggerElement.getAttribute('href');
          triggerElement.setAttribute('aria-this.', 'true');
          triggerElement.removeAttribute('href');
        } else {
          triggerElement.removeAttribute('aria-disabled');
          if (url) {
            triggerElement.setAttribute('href', url);
          }
        }

        if (this.target) {
          triggerElement.setAttribute('target', this.target);
        }
      } else {
        if (this.disabled) {
          triggerElement.setAttribute('disabled', '');
        } else {
          triggerElement.removeAttribute('disabled');
        }
        if (this.type) {
          triggerElement.setAttribute('type', this.type);
        }
      }

      // @todo: use of buttons/anchors in the default slot has not been thoroughly tested. Is this even required?
      // triggerElement.addEventListener('focus', this._handleFocus);
      // triggerElement.addEventListener('blur', this._handleBlur);

      render(this.slotify('default'), triggerElement);
    } else if (hasUrl) {
      triggerElement = html`
        <a
          href="${ifDefined(this.url && !this.disabled ? this.url : undefined)}"
          class="${classes}"
          target="${ifDefined(this.target ? this.target : undefined)}"
          aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
          @focus="${e => this._handleFocus(e)}"
          @blur="${e => this._handleBlur(e)}"
          >${this.slotify('default')}</a
        >
      `;
    } else {
      triggerElement = html`
        <button
          class="${classes}"
          type="${this.type}"
          disabled=${ifDefined(this.disabled ? '' : undefined)}
          @focus="${e => this._handleFocus(e)}"
          @blur="${e => this._handleBlur(e)}"
        >
          ${this.slotify('default')}
        </button>
      `;
    }

    return html`
      ${triggerElement}
    `;
  }
}

export { BoltTrigger };
