import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './three-character-layout.scss';

let cx = classNames.bind(styles);

@define
class BoltThreeCharacterLayout extends withLitHtml() {
  static is = 'bolt-three-character-layout';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
  };

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const classes = cx('c-bolt-three-character-layout');

    // THIS JS IS WIP mostly cut and pasted from two-char. Should be good tho. Need a demo page for it with slots.
    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        <div class="c-bolt-three-character-layout__character-row">
          <span
            class="c-bolt-three-character-layout__character c-bolt-three-character-layout__character--left"
          >
            ${this.slot('character--left')}
          </span>
          ${this.slot('connection--left')}
          <span
            class="c-bolt-three-character-layout__character c-bolt-three-character-layout__character--center"
          >
          ${this.slot('connection--right')}
          <span
            class="c-bolt-three-character-layout__character c-bolt-three-character-layout__character--right"
          >
            ${this.slot('character--right')}
          </span>
        </div>
      </div>
    `;
  }
}

export { BoltThreeCharacterLayout };
