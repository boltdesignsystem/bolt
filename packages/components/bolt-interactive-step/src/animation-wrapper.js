import {
  withLitHtml,
  html,
  props,
  define,
  hasNativeShadowDomSupport,
} from '@bolt/core';
import { styleMap } from 'lit-html/directives/style-map.js';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './animation-wrapper.scss';

@define
class BoltAnimationWrapper extends withLitHtml() {
  static is = 'bolt-animation-wrapper';

  static props = {
    animTriggered: {
      ...props.boolean,
    },
    boltAnimationName: {
      ...props.string,
      ...{ default: 'none' },
    },
    boltAnimationDuration: {
      ...props.number,
      ...{ default: 500 },
    },
    boltAnimationDelay: {
      ...props.number,
      ...{ default: 0 },
    },
    boltAnimationFunction: {
      ...props.string,
      ...{ default: 'ease-in' },
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
    const {
      animTriggered,
      boltAnimationName,
      boltAnimationDuration,
      boltAnimationDelay,
      boltAnimationFunction,
    } = this.props;

    /** @type {CSSStyleDeclaration} */
    let style = {};

    const classes = {
      'c-bolt-animation-wrapper': true,
    };

    if (animTriggered && boltAnimationName !== 'none') {
      style = Object.assign({}, style, {
        animationName: boltAnimationName,
        animationDuration: `${boltAnimationDuration}ms`,
        animationDelay: `${boltAnimationDelay}ms`,
        animationTimingFunction: boltAnimationFunction,
        animationFillMode: 'forwards',
      });
    }

    return html`
      ${this.addStyles([styles])}
      <div
        class="${classMap(classes)}"
        is="shadow-root"
        data-anim-triggered=${animTriggered ? 'yes' : 'no'}
        @animationend=${event => this.emitTransitionEnd(event)}
        style=${styleMap(style)}
      >
        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltAnimationWrapper };
