import { styleString } from '@polymer/lit-element/lib/render-helpers';
import {
  props,
  define,
  declarativeClickHandler,
  sanitizeBoltClasses,
  hasNativeShadowDomSupport,
  afterNextRender,
  watchForComponentMutations,
} from '@bolt/core/utils';
import { h, withPreact } from '@bolt/core/renderers';

@define
export class BoltPreactDot extends withPreact() {
  static is = 'bolt-preact-dot';

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
    this.hover = true;
    this.triggerUpdate();
  }

  leave() {
    this.hover = false;
    this.triggerUpdate();
  }

  render() {
    const s = this.props.size * 1.3;
    const style = styleString({
      width: s + 'px',
      height: s + 'px',
      left: this.props.x + 'px',
      top: this.props.y + 'px',
      borderRadius: s / 2 + 'px',
      lineHeight: s + 'px',
      background: this.props.hover ? '#ff0' : '#61dafb',
    });

    return (
      <div
        style={style}
        onMouseOver={() => {
          this.enter();
        }}
        onMouseOut={() => {
          this.leave();
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
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
        `}} />
        {this.props.hover && '*'}
        <slot></slot>
        {this.props.hover && '*'}
      </div>
    );
  }
}
