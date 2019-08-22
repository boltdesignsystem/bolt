import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './cta.scss';

let cx = classNames.bind(styles);

@define
class BoltCta extends withLitHtml() {
  static is = 'bolt-cta';

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
    // const {} = this.validateProps(this.props);
    const classes = cx('c-bolt-cta');

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <span class="c-bolt-cta__icon">
          ${this.slot('icon')}
        </span>
        <span class="c-bolt-cta__link">
          ${this.slot('link')}
        </span>
      </div>
    `;
  }
}

export { BoltCta };
