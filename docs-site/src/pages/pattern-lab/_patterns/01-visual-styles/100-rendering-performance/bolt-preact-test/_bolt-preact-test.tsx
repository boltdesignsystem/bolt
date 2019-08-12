import './bolt-preact-triangle.tsx';

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
import { h, withPreact } from '@bolt/core/renderers';

export const PreactRenderPerfContext = defineContext({
  throttle: false,
});

@define
export class BoltPreactTest extends withContext(withPreact()) {
  static is = 'bolt-preact-test';

  // provide context info to children that subscribe
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get provides() {
    return [PreactRenderPerfContext];
  }

  static props = {
    elapsed: props.number,
    seconds: props.number,
    intervalID: props.number,
    rafID: props.number,
    throttle: props.boolean,
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
    clearInterval(this.intervalID);
    cancelAnimationFrame(this.rafID);
  }

  render() {
    let { throttle } = this.props;
    const t = (this.elapsed / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;

    this.contexts.get(PreactRenderPerfContext).throttle = throttle || this.props.throttle;

    const styles = {
      position: 'absolute',
      transformOrigin: '0 0',
      left: '50%',
      top: '50%',
      width: '10px',
      height: '10px',
      background: '#eee',
      transform: `scaleX(${scale / 2.1}) scaleY(0.7) translateZ(0.1px)`,
    };

    
    
    return (
      <div>
        <div style={styles}>
          <bolt-preact-triangle
            x={0}
            y={0}
            s={1000}
            label={this.seconds} />   
        </div>
      </div>
    );
  }
}
