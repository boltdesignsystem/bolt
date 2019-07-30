import {
  withLitHtml,
  html,
  props,
  define,
  hasNativeShadowDomSupport,
} from '@bolt/core';
import { styleMap } from 'lit-html/directives/style-map.js';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './animate.scss';
import schema from '../animate.schema';

/**
 * @event BoltAnimationWrapper#bolt-animate:end:in
 */

/**
 * @event BoltAnimationWrapper#bolt-animate:end:out
 */

export const EVENTS = {
  END_IN: 'bolt-animate:end:in',
  END_OUT: 'bolt-animate:end:out',
};

export const ANIM_STAGES = {
  INITIAL: 'INITIAL',
  COMING: 'COMING',
  IDLE: 'IDLE',
  IDLING: 'IDLING',
  GOING: 'GOING',
  GONE: 'GONE',
};

const myProps = {};

Object.keys(schema.properties).forEach(prop => {
  const info = schema.properties[prop];
  switch (info.type) {
    case 'number':
    case 'string':
      const type = props[info.type];
      myProps[prop] = Object.assign({}, type, {
        default: info.default,
      });
      break;
  }
});

@define
class BoltAnimationWrapper extends withLitHtml() {
  static is = 'bolt-animate';

  static props = {
    ...myProps,
  };

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    this.schema = schema;
    this.animStage = ANIM_STAGES.INITIAL;
    this.setAttribute('meta-stage', this.animStage);
    /** @type {CSSStyleDeclaration} */
    this.animStyle = {};
    /**
     * Number of build in animations
     * @type {number}
     */
    this.totalIns = 0;
    /**
     * Number of idle animations
     * @type {number}
     */
    this.totalIdles = 0;
    /**
     * Number of build out animations
     * @type {number}
     */
    this.totalOuts = 0;

    return self;
  }

  connectedCallback() {
    this.triggerAnimReset();
    super.connectedCallback();
  }

  triggerAnimIn() {
    if (!this.totalIns) {
      this.triggerAnimIdle();
      return;
    }
    this.animStyle = {
      animationName: this.props.in,
      animationDuration: `${this.props.inDuration}ms`,
      animationDelay: `${this.props.inDelay}ms`,
      animationFillMode: 'both',
      animationTimingFunction: this.props.inEasing,
    };
  }

  triggerAnimIdle() {
    if (!this.totalIdles) {
      return;
    }
    this.animStyle = {
      animationName: this.props.idle,
      animationDuration: `${this.props.idleDuration}ms`,
      animationDelay: `${this.props.idleDelay}ms`,
      animationIterationCount: 'infinite',
    };
    this.triggerUpdate();
  }

  triggerAnimOut() {
    if (!this.totalOuts) {
      return;
    }
    this.animStyle = {
      animationName: this.props.out,
      animationDuration: `${this.props.outDuration}ms`,
      animationDelay: `${this.props.outDelay}ms`,
      animationFillMode: 'both',
      animationTimingFunction: this.props.outEasing,
    };
  }

  triggerAnimReset() {
    this.animStyle = {
      animationName: null,
      opacity: this.props.initialAppearance === 'hidden' ? '0' : null,
    };
  }

  /**
   * @return {string} one of the strings in `ANIM_STAGES`
   */
  getAnimStage() {
    return this.animStage;
  }

  /**
   * @param {string} eventName
   * @param {Object} [detail]
   * @see EVENTS
   * @fires bolt-animate:end:in
   * @fires bolt-animate:end:out
   */
  emitEvent(eventName, detail = {}) {
    const myEvent = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail,
    });
    console.debug(`event: ${eventName}`);
    this.dispatchEvent(myEvent);
  }

  handleEvent(event) {
    const { animationName, type } = event;
    const isAnimIn = this.props.in === animationName;
    const isAnimIdle = this.props.idle === animationName;
    const isAnimOut = this.props.out === animationName;
    // console.debug('handleEvent', {
    //   animationName,
    //   type,
    //   isAnimIdle,
    //   isAnimIn,
    //   isAnimOut,
    // });
    switch (type) {
      case 'animationstart':
        if (isAnimIn) {
          this.animStage = ANIM_STAGES.COMING;
        } else if (isAnimIdle) {
          this.animStage = ANIM_STAGES.IDLING;
        } else if (isAnimOut) {
          this.animStage = ANIM_STAGES.GOING;
        } else {
          console.error('Unknown animation started!', {
            event,
          });
        }
        break;
      case 'animationend':
        if (isAnimIn) {
          this.emitEvent(EVENTS.END_IN);
          this.animStage = ANIM_STAGES.IDLE;
          this.triggerAnimIdle();
        } else if (isAnimIdle) {
          // don't care
        } else if (isAnimOut) {
          this.emitEvent(EVENTS.END_OUT);
          this.animStage = ANIM_STAGES.GONE;
        } else {
          console.error('Unknown animation started!', {
            event,
          });
        }
        break;
    }

    this.setAttribute('meta-stage', this.animStage);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.debug('attributeChangedCallback', { name, oldValue, newValue });
    switch (name) {
      case 'trigger':
        if (newValue === 'in') {
          this.triggerAnimIn();
        } else if (newValue === 'out') {
          this.triggerAnimOut();
        } else {
          this.triggerAnimReset();
        }
        break;
      case 'in':
        this.totalIns =
          typeof newValue === 'string' ? newValue.split(',').length : 0;
        break;
      case 'idle':
        this.totalIdles =
          typeof newValue === 'string' ? newValue.split(',').length : 0;
        break;
      case 'out':
        this.totalOuts =
          typeof newValue === 'string' ? newValue.split(',').length : 0;
        break;
    }

    // can trigger re-render
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render() {
    // console.debug('render', this.props);

    const classes = {
      'c-bolt-animation-wrapper': true,
    };

    return html`
      ${this.addStyles([styles])}
      <div
        class="${classMap(classes)}"
        is="shadow-root"
        @animationstart=${event => this.handleEvent(event)}
        @animationend=${event => this.handleEvent(event)}
        style=${styleMap(this.animStyle)}
      >
        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltAnimationWrapper };
