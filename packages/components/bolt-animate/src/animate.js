import {
  withLitHtml,
  html,
  props,
  define,
  hasNativeShadowDomSupport,
  convertSchemaToProps,
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
  IN: 'IN',
  IDLE: 'IDLE',
  OUT: 'OUT',
};

@define
class BoltAnimate extends withLitHtml() {
  static is = 'bolt-animate';

  static props = convertSchemaToProps(schema);

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    this.schema = schema;
    this._animStage = ANIM_STAGES.INITIAL;
    /** @type {CSSStyleDeclaration} */
    this._animStyle = {};
    this.hasAnimIn = false;
    this.hasAnimIdle = false;
    this.hasAnimOut = false;

    return self;
  }

  _processProps() {
    const { in: inAnim, idle, out } = this.props;
    this.hasAnimIn = typeof inAnim === 'string' && inAnim !== 'none';
    this.hasAnimIdle = typeof idle === 'string' && idle !== 'none';
    this.hasAnimOut = typeof out === 'string' && out !== 'none';
  }

  connectedCallback() {
    super.connectedCallback();
    this._processProps();

    if (this.hasAnimIn) {
      this._animStyle = {
        animationName: null,
        opacity: this.props.initialAppearance === 'hidden' ? '0' : null,
      };
    } else {
      if (this.hasAnimIdle) {
        this._triggerAnimIdle();
      }
    }
  }

  _triggerAnim(id) {
    let isTriggered = false;
    switch (id) {
      case ANIM_STAGES.IN:
        if (this.hasAnimIn) {
          this._applyAnim({
            animationName: this.props.in,
            animationDuration: this.props.inDuration,
            animationDelay: this.props.inDelay,
            animationTimingFunction: this.props.inEasing,
          });
          isTriggered = true;
        }
        break;
      case ANIM_STAGES.IDLE:
        if (this.hasAnimIdle) {
          this._applyAnim({
            animationName: this.props.idle,
            animationDuration: this.props.idleDuration,
            animationDelay: this.props.idleDelay,
            animationTimingFunction: 'linear',
            animationFillMode: 'none',
            animationIterationCount: 'infinite',
          });
          isTriggered = true;
        }
        break;
      case ANIM_STAGES.OUT:
        if (this.hasAnimOut) {
          this._applyAnim({
            animationName: this.props.out,
            animationDuration: this.props.outDuration,
            animationDelay: this.props.outDelay,
            animationTimingFunction: this.props.outEasing,
          });
          isTriggered = true;
        }
        break;
    }

    if (isTriggered) {
      this._animStage = ANIM_STAGES[id];
      this.triggerUpdate();
      if (this.props.showMeta) {
        this.setAttribute('meta-stage', this._animStage);
      }
    }
    return isTriggered;
  }

  _applyAnim({
    animationName,
    animationDuration,
    animationDelay,
    animationFillMode = 'both',
    animationTimingFunction,
    animationIterationCount = '1',
  }) {
    this._animStyle = {
      animationName,
      animationDuration: `${animationDuration}ms`,
      animationDelay: `${animationDelay}ms`,
      animationFillMode,
      animationTimingFunction,
      animationIterationCount,
    };
  }

  triggerAnimIn() {
    const hadAnim = this._triggerAnim(ANIM_STAGES.IN);
    // console.log(`triggered in`, { hadAnim });
    return hadAnim;
  }

  triggerAnimOut() {
    const hadAnim = this._triggerAnim(ANIM_STAGES.OUT);
    // console.log(`triggered out`, { hadAnim });
    return hadAnim;
  }

  _triggerAnimIdle() {
    const hadAnim = this._triggerAnim(ANIM_STAGES.IDLE);
    // console.log(`triggered idle`, { hadAnim });
    return hadAnim;
  }

  /**
   * @param {string} eventName
   * @param {Object} [detail]
   * @see EVENTS
   * @fires bolt-animate:end:in
   * @fires bolt-animate:end:out
   */
  _emitEvent(eventName, detail = {}) {
    const myEvent = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail,
    });
    console.debug(`event: ${eventName}`);
    this.dispatchEvent(myEvent);
  }

  _handleAnimEndEvent(event) {
    const { animationName } = event;
    const isAnimIn = this.props.in === animationName;
    const isAnimIdle = this.props.idle === animationName;
    const isAnimOut = this.props.out === animationName;

    if (isAnimIn) {
      this._emitEvent(EVENTS.END_IN);
      this._triggerAnimIdle();
    } else if (isAnimIdle) {
      // don't care
    } else if (isAnimOut) {
      this._emitEvent(EVENTS.END_OUT);
    } else {
      console.error('Unknown animation ended!', {
        event,
      });
    }
    event.stopPropagation();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.debug('attributeChangedCallback', { name, oldValue, newValue });
    // can trigger re-render
    super.attributeChangedCallback(name, oldValue, newValue);
    this._processProps();
    switch (this._animStage) {
      case ANIM_STAGES.IN:
        this.triggerAnimIn();
        break;
      case ANIM_STAGES.IDLE:
        this._triggerAnimIdle();
        break;
      case ANIM_STAGES.OUT:
        this.triggerAnimOut();
        break;
    }
  }

  render() {
    const classes = {
      'c-bolt-animate': true,
    };

    return html`
      ${this.addStyles([styles])}
      <div
        class="${classMap(classes)}"
        @animationend=${e => this._handleAnimEndEvent(e)}
        style=${styleMap(this._animStyle)}
      >
        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltAnimate };
