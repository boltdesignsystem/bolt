import {
  LitElement,
  property,
  html,
  customElement,
} from './lazy-lit-element.ts';
import { styleString } from '@polymer/lit-element/lib/render-helpers';
import './lazy-lit-triangle.ts';

const containerStyle = {
  position: 'absolute',
  transformOrigin: '0 0',
  left: '50%',
  top: '50%',
  width: '10px',
  height: '10px',
  background: '#eee',
};

@customElement('lazy-lit-test' as any)
export class LazyLitTest extends LitElement {
  @property()
  elapsed?: number;

  @property()
  throttle?: boolean;

  @property()
  seconds: number = 0;

  intervalID?: number;
  rafID?: number;

  connectedCallback() {
    super.connectedCallback();
    this.intervalID = setInterval(() => {
      this.seconds = (this.seconds % 10) + 1;
    }, 1000);

    const start = new Date().getTime();
    const update = () => {
      this.elapsed = new Date().getTime() - start;
      this.rafID = requestAnimationFrame(update);
    };
    this.rafID = requestAnimationFrame(update);
  }

  disconnectedCallback() {
    clearInterval(this.intervalID);
    cancelAnimationFrame(this.rafID!);
  }

  render() {
    const throttle = (this.throttle === '' || this.throttle === true) ? true : false;
    
    const t = (this.elapsed! / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    const transform =
      'scaleX(' + scale / 2.1 + ') scaleY(0.7) translateZ(0.1px)';
    const style = styleString({ ...containerStyle, transform });
    return html`
      <div style="${style}">
        <div>
          <lazy-lit-triangle
            .x="${0}"
            .y="${0}"
            .s="${1000}"
            .label="${this.seconds}"
            ?throttle=${throttle}
          ></lazy-lit-triangle>
        </div>
      </div>
    `;
  }
}
