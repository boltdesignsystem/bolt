import { html, convertInitialTags, customElement } from '@bolt/element';
import { props } from '@bolt/core-v3.x/utils';
import { render } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import { BoltAction } from '@bolt/core-v3.x/elements/bolt-action';
import { ifDefined } from 'lit-html/directives/if-defined';
import classNames from 'classnames/bind';

import styles from './trigger.scss';
import schema from '../trigger.schema';

let cx = classNames.bind(styles);

@customElement('bolt-trigger')
@convertInitialTags(['button', 'a']) // The first matching tag will have its attributes converted to component props
class BoltTrigger extends BoltAction {
  static props = {
    ...BoltAction.props, // Provides: disabled, onClick, onClickTarget, target, url
    type: props.string,
    cursor: props.string,
    display: props.string,
    noOutline: props.boolean,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.schema = schema;
    return self;
  }

  _handleFocus() {
    this.dispatchEvent(new CustomEvent('trigger:focus', { bubbles: true }));
  }

  _handleBlur() {
    this.dispatchEvent(new CustomEvent('trigger:blur', { bubbles: true }));
  }

  render() {
    const {
      url,
      target,
      type,
      cursor,
      display,
      noOutline,
      disabled,
    } = this.validateProps(this.props);

    const classes = cx('c-bolt-trigger', {
      [`c-bolt-trigger--cursor-${cursor}`]: cursor && !disabled,
      [`c-bolt-trigger--display-${display}`]: display,
      [`c-bolt-trigger--outline-none`]: noOutline,
    });

    // If a url has been provided the rendered tag will be an <a>
    const hasUrl = url && url.length;

    // The triggerElement to render
    let triggerElement;

    if (this.rootElement) {
      triggerElement = this.rootElement.firstChild.cloneNode(true);
      triggerElement.className += ' ' + classes;

      // @todo: find automatic way to dissolve original HTML elements into their respective props + custom attributes
      if (triggerElement.tagName === 'A') {
        const url = this.props.url || this.originalUrl;

        if (disabled) {
          this.originalUrl = triggerElement.getAttribute('href');
          triggerElement.setAttribute('aria-disabled', 'true');
          triggerElement.removeAttribute('href');
        } else {
          triggerElement.removeAttribute('aria-disabled');
          if (url) {
            triggerElement.setAttribute('href', url);
          }
        }

        if (target) {
          triggerElement.setAttribute('target', target);
        }
      } else {
        if (disabled) {
          triggerElement.setAttribute('disabled', '');
        } else {
          triggerElement.removeAttribute('disabled');
        }

        // check `this.props.type` not `type` to see if type has been set, the validated `type` const will always return a value
        if (this.props.type) {
          triggerElement.setAttribute('type', type);
        }
      }

      // @todo: use of buttons/anchors in the default slot has not been thoroughly tested. Is this even required?
      // triggerElement.addEventListener('focus', this._handleFocus);
      // triggerElement.addEventListener('blur', this._handleBlur);

      render(this.slot('default'), triggerElement);
    } else if (hasUrl) {
      triggerElement = html`
        <a
          href="${ifDefined(url && !disabled ? url : undefined)}"
          class="${classes}"
          target="${ifDefined(target ? target : undefined)}"
          aria-disabled=${ifDefined(disabled ? 'true' : undefined)}
          @focus="${e => this._handleFocus(e)}"
          @blur="${e => this._handleBlur(e)}"
          >${this.slot('default')}</a
        >
      `;
    } else {
      triggerElement = html`
        <button
          class="${classes}"
          type="${type}"
          disabled=${ifDefined(disabled ? '' : undefined)}
          @focus="${e => this._handleFocus(e)}"
          @blur="${e => this._handleBlur(e)}"
        >
          ${this.slot('default')}
        </button>
      `;
    }

    return html`
      ${this.addStyles([styles])} ${triggerElement}
    `;
  }
}

export { BoltTrigger };
