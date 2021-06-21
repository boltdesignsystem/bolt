import { props, hasNativeShadowDomSupport } from '@bolt/core-v3.x/utils';
import { withLitHtml } from '@bolt/core-v3.x/renderers';
import classNames from 'classnames/bind';
import { html, customElement } from '@bolt/element';
import styles from './one-character-layout.scss';

let cx = classNames.bind(styles);

@customElement('bolt-one-character-layout')
class BoltOneCharacterLayout extends withLitHtml {
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
