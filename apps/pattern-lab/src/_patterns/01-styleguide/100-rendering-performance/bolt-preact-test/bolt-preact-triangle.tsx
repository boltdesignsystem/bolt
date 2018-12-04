import {
  props,
  define,
  declarativeClickHandler,
  sanitizeBoltClasses,
  hasNativeShadowDomSupport,
  afterNextRender,
  watchForComponentMutations,
  withContext,
} from '@bolt/core/utils';
import { h, withPreact } from '@bolt/core/renderers';

import './bolt-preact-dot';

import { PreactRenderPerfContext } from './bolt-preact-test';

const targetSize = 25;

@define
export class BoltPreactSierpinskiTriangle extends withContext(withPreact()) {

  static is = 'bolt-preact-triangle';

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [[PreactRenderPerfContext, 'throttle']];
  }

  connectedCallback(){
    super.connectedCallback();
    this.context = this.contexts.get(PreactRenderPerfContext);
  }

  static props = {
    x: props.number,
    y: props.number,
    s: props.number,
    label: props.string,
  }

  render() {
    let { s, x, y, label } = this.props;
    if (s <= targetSize) {
      return (
        <bolt-preact-dot
          x={x - targetSize / 2}
          y={y - targetSize / 2}
          size={targetSize}
        >
          {label}
        </bolt-preact-dot>
      );
    }
    
    const { throttle } = this.context || false; // fallback if the `throttle` context isn't available for some reason
    const slowDown = throttle;

    if (slowDown) {
      const e = performance.now() + 0.8;
      while (performance.now() < e) {
        // Artificially long execution time.
      }
    }

    s /= 2;

    return (
      <div>
        <bolt-preact-triangle
          x={x}
          y={y - s / 2}
          s={s}
          label={label}
        ></bolt-preact-triangle>
        <bolt-preact-triangle
          x={x - s}
          y={y + s / 2}
          s={s}
          label={label}
        ></bolt-preact-triangle>
        <bolt-preact-triangle
          x={x + s}
          y={y + s / 2}
          s={s}
          label={label}
        ></bolt-preact-triangle>
      </div>
    );
  }
}
