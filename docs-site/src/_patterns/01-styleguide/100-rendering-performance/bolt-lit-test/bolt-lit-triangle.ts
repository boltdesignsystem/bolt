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
import { html, render, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import './bolt-lit-dot';

import { LitRenderPerfContext } from './bolt-lit-test';

const targetSize = 25;

@define
export class SierpinskiTriangle extends withContext(withLitHtml()) {

  static is = 'bolt-lit-triangle';

  static props = {
    x: props.number,
    y: props.number,
    s: props.number,
    label: props.string,
  }

  // subscribe to specific props that are defined and available on the parent container
  // (context + subscriber idea originally from https://codepen.io/trusktr/project/editor/XbEOMk)
  static get consumes() {
    return [[LitRenderPerfContext, 'throttle']];
  }


  connectedCallback() {
    super.connectedCallback();
    this.context = this.contexts.get(LitRenderPerfContext);
  }

  render() {
    let { s, x, y, label } = this.props;
    if (s <= targetSize) {
      return html`
        <bolt-lit-dot
          x="${x - targetSize / 2}"
          y="${y - targetSize / 2}"
          size="${targetSize}"
        >
          ${label}
        </bolt-lit-dot>
      `;
    }

    const { throttle } = this.context || false; // fallback if the `throttle` context isn't available for some reason
    const slowDown = throttle;

    // console.log(slowDown);
    if (slowDown === true) {
      const e = performance.now() + 0.8;
      while (performance.now() < e) {
        // Artificially long execution time.
      }
    }

    s /= 2;

    return html`
      <bolt-lit-triangle
        x="${x}"
        y="${y - s / 2}"
        s="${s}"
        label="${label}"
      ></bolt-lit-triangle>
      <bolt-lit-triangle
        x="${x - s}"
        y="${y + s / 2}"
        s="${s}"
        label="${label}"
      ></bolt-lit-triangle>
      <bolt-lit-triangle
        x="${x + s}"
        y="${y + s / 2}"
        s="${s}"
        label="${label}"
      ></bolt-lit-triangle>
    `;
  }
}
