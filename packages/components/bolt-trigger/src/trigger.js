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
    tag: props.string,
    url: props.string,
    target: props.string,
    cursor: props.string,
    display: props.string,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.schema = schema;
    self.delegateFocus = true;
    return self;
  }

  render() {
    const { cursor, display } = this.validateProps(this.props);

    const classes = cx('c-bolt-trigger', {
      [`c-bolt-trigger--cursor-${cursor}`]:
        cursor && cursor !== this.schema.properties.cursor.default,
      [`c-bolt-trigger--display-${display}`]:
        display && display !== this.schema.properties.display.default,
    });

    // Decide on if the rendered trigger tag should be a <button> or <a> tag, based on if a URL exists OR if a link was passed in from the getgo
    const hasUrl = this.props.url.length > 0 && this.props.url !== 'null';

    // The triggerElement to render, based on the initial HTML passed alone.
    let triggerElement = null;
    const self = this;

    if (this.rootElement) {
      triggerElement = this.rootElement.firstChild.cloneNode(true);
      triggerElement.className += ' ' + classes;

      if (this.props.url) {
        triggerElement.setAttribute('href', this.props.url);
      }

      if (this.props.target) {
        triggerElement.setAttribute('target', this.props.target);
      }
      render(this.slot('default'), triggerElement);
    } else if (hasUrl) {
      triggerElement = html`
        <a
          href="${this.props.url}"
          class="${classes}"
          target="${ifDefined(
            this.props.target ? this.props.target : undefined,
          )}"
          >${this.slot('default')}</a
        >
      `;
    } else {
      triggerElement = html`
        <button class="${classes}">
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
