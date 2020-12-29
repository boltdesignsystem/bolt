import {
  unsafeCSS,
  BoltElement,
  classMap,
  styleMap,
  html,
  customElement,
} from '@bolt/element';
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

@customElement('bolt-animate')
class BoltAnimate extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
      // internal only props
      _animStage: {
        type: Object,
      },
      _animStyle: {
        type: Object,
      },
    };
  }

  static get styles() {
    return [unsafeCSS(styles)];
  }

  constructor() {
    super();
    this._animStage = ANIM_STAGES.INITIAL;
    /** @type {CSSStyleDeclaration} */
    this.hasAnimIn = false;
    this.hasAnimIdle = false;
    this.hasAnimOut = false;
  }

  _processProps() {
    const { in: inAnim, idle, out } = this;
    // can this be handled in update?
    this.hasAnimIn = typeof inAnim === 'string' && inAnim !== 'none';
    this.hasAnimIdle = typeof idle === 'string' && idle !== 'none';
    this.hasAnimOut = typeof out === 'string' && out !== 'none';
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this._processProps();

    if (this._animStage === ANIM_STAGES.INITIAL) {
      this.resetAnimStage();
    }
  }

  _triggerAnim(id) {
    let isTriggered = false;
    switch (id) {
      case ANIM_STAGES.IN:
        if (this.hasAnimIn) {
          this._applyAnim({
            animationName: this.in,
            animationDuration: this.inDuration,
            animationDelay: this.inDelay,
            animationTimingFunction: this.inEasing,
          });
          isTriggered = true;
        }
        break;
      case ANIM_STAGES.IDLE:
        if (this.hasAnimIdle) {
          this._applyAnim({
            animationName: this.idle,
            animationDuration: this.idleDuration,
            animationDelay: this.idleDelay,
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
            animationName: this.out,
            animationDuration: this.outDuration,
            animationDelay: this.outDelay,
            animationTimingFunction: this.outEasing,
          });
          isTriggered = true;
        } else {
          this.resetAnimStage();
        }
        break;
    }

    if (isTriggered) {
      this._animStage = ANIM_STAGES[id];
    }
    if (this.showMeta) {
      this.setAttribute('meta-stage', this._animStage);
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
      // Safari breaks with 0ms animation-duration
      animationDuration: `${Math.max(1, animationDuration)}ms`,
      animationFillMode,
      animationTimingFunction,
      animationIterationCount,
    };

    // Safari breaks with 0ms animation-delay
    if (animationDelay > 0) {
      this._animStyle.animationDelay = `${animationDelay}ms`;
    }
  }

  triggerAnimIn() {
    const hadAnim = this._triggerAnim(ANIM_STAGES.IN);
    return hadAnim;
  }

  triggerAnimOut() {
    const hadAnim = this._triggerAnim(ANIM_STAGES.OUT);
    return hadAnim;
  }

  _triggerAnimIdle() {
    const hadAnim = this._triggerAnim(ANIM_STAGES.IDLE);
    return hadAnim;
  }

  resetAnimStage() {
    this._animStage = ANIM_STAGES.INITIAL;
    this._animStyle = {};

    if (this.hasAnimIn) {
      if (this.initialAppearance === 'hidden') {
        this._animStyle.opacity = 0;
      }
    } else {
      if (this.hasAnimIdle) {
        this._triggerAnimIdle();
      }
    }
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
    this.dispatchEvent(myEvent);
  }

  _handleAnimEndEvent(event) {
    const { animationName } = event;
    const isAnimIn = this.in === animationName;
    const isAnimIdle = this.idle === animationName;
    const isAnimOut = this.out === animationName;

    const animatedEls = event.target.children;
    if (isAnimIn) {
      this._emitEvent(EVENTS.END_IN, { animatedEls });
      this._triggerAnimIdle();
    } else if (isAnimIdle) {
      // don't care
    } else if (isAnimOut) {
      this._emitEvent(EVENTS.END_OUT, { animatedEls });
    } else {
      console.error('Unknown animation ended!', {
        event,
      });
    }
    event.stopPropagation();
  }

  attributeChangedCallback(name, oldValue, newValue) {
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
      <div
        class="${classMap(classes)}"
        @animationend=${e => this._handleAnimEndEvent(e)}
        style=${styleMap(this._animStyle)}
      >
        ${this.slotify('default')}
      </div>
    `;
  }
}

export { BoltAnimate };
