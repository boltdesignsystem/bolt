import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './one-character-layout.scss';

let cx = classNames.bind(styles);

@define
class BoltOneCharacterLayout extends withLitHtml() {
  static is = 'bolt-one-character-layout';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const classes = cx('c-bolt-one-character-layout');

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltOneCharacterLayout };
