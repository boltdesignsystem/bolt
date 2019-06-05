import { props, define } from '@bolt/core/utils';
import { html, render } from '@bolt/core/renderers/renderer-lit-html';
import { BoltAction } from '@bolt/core/elements/bolt-action';
import { convertInitialTags } from '@bolt/core/decorators';
import { ifDefined } from 'lit-html/directives/if-defined';

import classNames from 'classnames/bind';

import styles from './trigger.scss';
import schema from '../trigger.schema.yml';

let cx = classNames.bind(styles);

@define
@convertInitialTags(['button', 'a']) // The first matching tag will have its attributes converted to component props
class BoltTrigger extends BoltAction {
  static is = 'bolt-trigger';

  static props = {
    url: props.string,
    target: props.string,
    cursor: props.string,
    display: props.string,
    noOutline: props.boolean,
    onClick: props.string, // Managed by base class
    onClickTarget: props.string, // Managed by base class
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.schema = schema;
    self.delegateFocus = true;
    return self;
  }

  _handleFocus() {
    this.dispatchEvent(new CustomEvent('trigger:focus', { bubbles: true }));
  }

  _handleBlur() {
    this.dispatchEvent(new CustomEvent('trigger:blur', { bubbles: true }));
  }

  render() {
    const { url, target, cursor, display, noOutline } = this.validateProps(
      this.props,
    );

    const classes = cx('c-bolt-trigger', {
      [`c-bolt-trigger--cursor-${cursor}`]: cursor,
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

      if (hasUrl) {
        triggerElement.setAttribute('href', url);
      }

      if (target) {
        triggerElement.setAttribute('target', target);
      }

      // @todo: use of buttons/anchors in the default slot has not been thoroughly tested. Is this even required?
      // triggerElement.addEventListener('focus', this._handleFocus);
      // triggerElement.addEventListener('blur', this._handleBlur);

      render(this.slot('default'), triggerElement);
    } else if (hasUrl) {
      triggerElement = html`
        <a
          href="${url}"
          class="${classes}"
          target="${ifDefined(target ? target : undefined)}"
          @focus="${e => this._handleFocus(e)}"
          @blur="${e => this._handleBlur(e)}"
          >${this.slot('default')}</a
        >
      `;
    } else {
      triggerElement = html`
        <button
          class="${classes}"
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
