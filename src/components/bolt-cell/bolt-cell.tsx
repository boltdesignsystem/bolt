import { Component, Prop } from '@stencil/core';
import {
  css
} from '../bolt-common/index';

@Component({
  tag: 'bolt-cell',
  styleUrl: 'bolt-cell.scss'
})
export class BoltCell {

  @Prop() col: string;
  @Prop() colMd: string;

  render() {
    const className = css(
      "c-bolt-cell",
      this.col ? "c-bolt-cell--" + this.col : "",
      this.colMd ? "c-bolt-cell--" + this.colMd + "@md" : ""
    );

    return (
      <div class={className}>
        <slot />
      </div>
    );
  }
}