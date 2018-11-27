import {
  LazyLitElement,
  property,
  html,
  customElement,
} from './lazy-lit-element';
import { styleString } from '@polymer/lit-element/lib/render-helpers';

@customElement('lazy-lit-dot' as any)
export class LazyLitDot extends LazyLitElement {
  @property()
  x?: number;

  @property()
  y?: number;

  @property()
  size?: number;

  @property()
  hover: boolean = false;

  enter() {
    this.hover = true;
    this.requestUrgenUpdate();
  }

  leave() {
    this.hover = false;
    this.requestUrgenUpdate();
  }

  render() {
    const s = this.size! * 1.3;
    const style = styleString({
      width: s + 'px',
      height: s + 'px',
      left: this.x + 'px',
      top: this.y + 'px',
      borderRadius: s / 2 + 'px',
      lineHeight: s + 'px',
      background: this.hover ? '#ff0' : '#61dafb',
    });
    return html`
      <style>
        :host {
          position: absolute;
          background: #61dafb;
          font: normal 15px sans-serif;
          text-align: center;
          cursor: pointer;
        }
        div {
          position: absolute;
          background: #61dafb;
          font: normal 15px sans-serif;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div
        style="${style}"
        @mouseover="${this.enter}"
        @mouseout="${this.leave}"
      >
        ${this.hover ? '*' : ''}<slot></slot>${this.hover ? '*' : ''}
      </div>
    `;
  }
}
