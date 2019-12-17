import { LitElement, html, customElement } from 'lit-element';
import { ResizeObserver } from '@juggle/resize-observer';

const ro = new ResizeObserver(entries => {
  entries.forEach(entry => entry.target.resizedCallback(entry.contentRect));
});

@customElement('bolt-breakpoint-indicator')
class BreakpointIndicator extends LitElement {
  static get properties() {
    return {
      width: Number,
      height: Number,
      state: {
        type: String,
        reflect: true,
      },
    };
  }

  render() {
    return html`
      <style>
        :host {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          flex-flow: column nowrap;
          height: 100vh;
          width: 100vw;
          color: white;
          overflow: hidden;
          font-size: 1rem;
          pointer-events: none;
          color: white;
          font-weight: bold;
          text-shadow: 0px 1px 1px black;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        code {
          background-color: rgba(0, 0, 0, 0.4);
          padding: 0.125rem 0.5rem;
        }
      </style>
      <code>${this.width}px (${this.state})</code>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    // @todo: replace with the actual Breakpoint config options from @bolt/core
    this.breakpoints = {
      xxsmall: 320,
      xsmall: 400,
      small: 600,
      medium: 800,
      large: 1000,
      xlarge: 1200,
      xxlarge: 1400,
      xxxlarge: 1600,
      xxxxlarge: 1920,
    };

    ro.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    ro.unobserve(this);
  }

  resizedCallback({ width, height }) {
    this.width = width;
    this.height = height;

    for (let [key, value] of Object.entries(this.breakpoints)) {
      if (this.width >= value) {
        this.state = key;
      }
    }
  }
}
