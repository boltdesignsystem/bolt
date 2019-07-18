import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './connection.scss';

let cx = classNames.bind(styles);

@define
class BoltTwoCharacterChat extends withLitHtml() {
  static is = 'bolt-connection';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    connectionUrl: {
      ...props.string,
      ...{
        default:
          'https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/animated-bands-ltr.png',
      },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const { connectionUrl } = this.validateProps(this.props);
    const classes = cx('c-bolt-connection');

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <span class="c-bolt-connection__top-slot">
          ${this.slot('top')}
        </span>
        <img
          class="c-bolt-connection__main-image"
          src="${connectionUrl}"
          alt="Connection Band"
        />
        <span class="c-bolt-connection__bottom-slot">
          ${this.slot('bottom')}
        </span>
      </div>
    `;
  }
}

export { BoltTwoCharacterChat };
