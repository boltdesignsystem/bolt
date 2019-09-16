import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core/renderers/renderer-lit-html';
import styles from './self-drawing-circle.scss';
import schema from './self-drawing-circle.schema.yml';

@define
class SvgAnimations extends withLitHtml() {
  static is = 'bolt-self-drawing-circle';

  static props = {
    dashSize: props.integer,
    speed: props.integer,
  };

  constructor(self) {
    self = super(self);
    self.schema = schema;
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

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
    const outline = this.renderRoot.querySelector('circle');
    outline.setAttribute('stroke-dasharray', `0 1000`);
    this.renderRoot
      .querySelector('.bolt-self-drawing-circle')
      .classList.remove('rotate');
  }

  async _drawCircle(dashSize, speed) {
    const outline = this.renderRoot.querySelector('circle');

    const threshold = Math.ceil(494 / dashSize);

    for (var i = 0; i <= threshold; i++) {
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
          .querySelector('.bolt-self-drawing-circle')
          .classList.add('rotate');
      }
    }
  }

  render() {
    return html`
      ${this.addStyles([styles])}
      <div
        id="bolt-self-drawing-circle"
        class="bolt-self-drawing-circle"
        is="shadow-root"
      >
        <svg viewBox="-160 -160 320 320">
          <circle
            id="bolt-self-drawing-circle-outline"
            class="bolt-self-drawing-circle-outline"
            r="159"
            stroke-dasharray="0 1000"
          />
        </svg>
      </div>
    `;
  }
}

export { SvgAnimations };
