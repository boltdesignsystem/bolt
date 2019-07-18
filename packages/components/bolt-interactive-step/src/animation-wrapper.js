import {
  withLitHtml,
  html,
  props,
  define,
  hasNativeShadowDomSupport,
} from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './animation-wrapper.scss';

const cx = classNames.bind(styles);

@define
class BoltAnimationWrapper extends withLitHtml() {
  static is = 'bolt-animation-wrapper';

  static props = {
    fadeIn: {
      ...props.string,
    },
    animTriggered: {
      ...props.boolean,
    },
  };

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  emitTransitionEnd(event) {
    const myEvent = new CustomEvent('bolt:transitionend', {
      bubbles: true,
      composed: true,
      detail: {},
    });
    this.dispatchEvent(myEvent);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    const { fadeIn, animTriggered } = this.props;
    //
    const classes = cx('c-bolt-animation-wrapper', {
      // [`c-bolt-animation-wrapper--awesome`]: animTriggered
    });

    return html`
      ${this.addStyles([styles])}
      <div
        class="${classes}"
        is="shadow-root"
        data-fade-in=${fadeIn}
        data-anim-triggered=${animTriggered ? 'yes' : 'no'}
        @transitionend=${event => this.emitTransitionEnd(event)}
      >
        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltAnimationWrapper };
