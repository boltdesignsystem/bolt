import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import styles from './self-drawing-circle.scss';

@define
class SelfDrawingCircle extends withLitHtml() {
  static is = 'wwo-self-drawing-circle';

  static props = {
    dashSize: props.integer,
    speed: props.integer,
  };

  triggerAnimIn(dashSize = 6, speed = 20) {
    const animateCircle = this._drawCircle(dashSize, speed);
    return animateCircle;
  }

  triggerAnimOut() {
    const resetCircle = this._resetCircle();
    return resetCircle;
  }

  _drawTimer(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  _resetCircle() {
    const outline = this.renderRoot.querySelector(
      '#wwo-self-drawing-circle-outline',
    );
    outline.setAttribute('stroke-dasharray', `0 1000`);
    this.renderRoot
      .querySelector('.wwo-self-drawing-circle__spinner')
      .classList.remove('spin');
  }

  async _drawCircle(dashSize, speed) {
    const outline = this.renderRoot.querySelector(
      '#wwo-self-drawing-circle-outline',
    );

    const threshold = Math.ceil(494 / dashSize);

    for (let i = 0; i <= threshold; i++) {
      outline.setAttribute(
        'stroke-dasharray',
        i === 0
          ? `${dashSize} 1000`
          : `${dashSize} ${dashSize} ${outline.getAttribute(
              'stroke-dasharray',
            )}`,
      );

      await this._drawTimer(speed); //eslint-disable-line no-await-in-loop

      if (i === threshold) {
        this.renderRoot
          .querySelector('.wwo-self-drawing-circle__spinner')
          .classList.add('spin');
      }
    }
  }

  render() {
    return html`
      ${this.addStyles([styles])}
      <div
        id="wwo-self-drawing-circle"
        class="wwo-self-drawing-circle wwo-self-drawing-circle__rotater"
      >
        <div class="wwo-self-drawing-circle__spinner">
          <svg viewBox="-160 -160 320 320">
            <circle
              id="wwo-self-drawing-circle-outline"
              class="wwo-self-drawing-circle-outline"
              r="159"
              stroke-dasharray="0 1000"
            ></circle>
          </svg>
        </div>
      </div>
    `;
  }
}

export { SelfDrawingCircle };
