import {
  LazyLitElement,
  property,
  html,
  customElement,
} from './lazy-lit-element';
import './lazy-lit-dot';

const targetSize = 25;

@customElement('lazy-lit-triangle' as any)
export class LazyLitSierpinskiTriangle extends LazyLitElement {
  @property()
  x!: number;

  @property()
  y!: number;

  @property()
  slow!: boolean;

  @property()
  s!: number;

  @property()
  label?: number;
  
  @property()
  throttle?: boolean;

  render() {
    const throttle = (this.throttle === '' || this.throttle === true) ? true : false;
    let { s, x, y, label } = this;
    // console.log('lazy-lit-triangle.render()', {s, x, y, label});
    if (s <= targetSize) {
      return html`
        <lazy-lit-dot
          x="${x - targetSize / 2}"
          y="${y - targetSize / 2}"
          size="${targetSize}"
        >
          ${label}
        </lazy-lit-dot>
      `;
    }

    const slowDown = throttle;

    if (slowDown) {
      const e = performance.now() + 0.8;
      while (performance.now() < e) {
        // Artificially long execution time.
      }
    }

    s /= 2;

    return html`
      <lazy-lit-triangle
        .x="${x}"
        .y="${y - s / 2}"
        .s="${s}"
        .label="${label}"
        ?throttle=${throttle}
      ></lazy-lit-triangle>
      <lazy-lit-triangle
        .x="${x - s}"
        .y="${y + s / 2}"
        .s="${s}"
        .label="${label}"
        ?throttle=${throttle}
      ></lazy-lit-triangle>
      <lazy-lit-triangle
        .x="${x + s}"
        .y="${y + s / 2}"
        .s="${s}"
        .label="${label}"
        ?throttle=${throttle}
      ></lazy-lit-triangle>
    `;
  }
}
