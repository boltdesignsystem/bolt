import {
  props,
  define,
  declarativeClickHandler,
  sanitizeBoltClasses,
  hasNativeShadowDomSupport,
  afterNextRender,
  watchForComponentMutations,
  defineContext,
  withContext,
} from '@bolt/core/utils';
import { html, render, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import { styleString } from '@polymer/lit-element/lib/render-helpers';
import './bolt-lit-triangle.ts';

const containerStyle = {
  position: 'absolute',
  transformOrigin: '0 0',
  left: '50%',
  top: '50%',
  width: '10px',
  height: '10px',
  background: '#eee',
};

export const LitRenderPerfContext = defineContext({
  throttle: false,
});

@define
export class BoltLitHTMLTest extends withContext(withLitHtml()) {
  static is = 'bolt-lit-test';

  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get provides() {
    return [LitRenderPerfContext];
  }

  static props = {
    elapsed: props.number,
    seconds: props.number,
    intervalID: props.number,
    rafID: props.number,
    throttle: props.boolean,
  }

  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  connectedCallback() {
    super.connectedCallback();
    this.updated();
    this.seconds = 0;
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
    console.log('disconnectedCallback');
    clearInterval(this.intervalID);
    cancelAnimationFrame(this.rafID!);
  }

  render() {
    let { throttle } = this.props;

    const t = (this.elapsed! / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    const transform =
      'scaleX(' + scale / 2.1 + ') scaleY(0.7) translateZ(0.1px)';
    const style = styleString({ ...containerStyle, transform });
    
    this.contexts.get(LitRenderPerfContext).throttle = throttle || this.props.throttle;

    // const throttle = this.props.throttle || false;
    // ?throttle=${throttle}

    return html`
      <div style="${style}">
        <div>
          <bolt-lit-triangle
            x="${0}"
            y="${0}"
            s="${1000}"
            label="${this.seconds}"
          ></bolt-lit-triangle>
        </div>
      </div>
    `;
  }
}

