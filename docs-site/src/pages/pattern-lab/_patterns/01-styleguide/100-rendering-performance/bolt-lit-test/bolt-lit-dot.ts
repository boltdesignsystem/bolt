import {
  props,
  define,
  declarativeClickHandler,
  sanitizeBoltClasses,
  hasNativeShadowDomSupport,
  afterNextRender,
  watchForComponentMutations,
} from '@bolt/core/utils';
import { html, render, withLitHtml } from '@bolt/core/renderers/renderer-lit-html';
import { styleString } from '@polymer/lit-element/lib/render-helpers';

@define
export class Dot extends withLitHtml() {
  static is = 'bolt-lit-dot';

  static props = {
    x: props.number,
    y: props.number,
    size: props.number,
    hover: props.boolean,
  }

  constructor(self) {
    self = super(self);
    this.enter = this.enter.bind(this);
    this.leave = this.leave.bind(this);
  }

  enter() {
    console.log('enter');
    this.hover = true;
    this.triggerUpdate();
  }

  leave() {
    this.hover = false;
    this.triggerUpdate();
  }

  render() {
    const s = this.props.size! * 1.3;
    const style = styleString({
      width: s + 'px',
      height: s + 'px',
      left: this.props.x + 'px',
      top: this.props.y + 'px',
      borderRadius: s / 2 + 'px',
      lineHeight: s + 'px',
      background: this.props.hover ? '#ff0' : '#61dafb',
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
        ${this.props.hover ? '*' : ''}<slot></slot>${this.props.hover ? '*' : ''}
      </div>
    `;
  }
}
