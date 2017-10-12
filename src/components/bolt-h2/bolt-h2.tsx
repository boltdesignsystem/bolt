import { Component, Prop } from '@stencil/core';
import {
  css,
  cssClassForSize,
  getTag
} from '../bolt-common/index';

@Component({
  tag: 'bolt-h2',
  styleUrl: 'bolt-h2.scss'
})
export class BoltH2 {

  @Prop() tag: any;
  @Prop() size: any;

  render() {
    // const Tag = getTag(this.tag);
    // const headlineSize = cssClassForSize(this.size, "c-bolt-headline--");
    // console.log(Tag);

    const className = css(
      "c-bolt-headline",
      "c-bolt-headline--xxlarge"
      // this.col ? "c-bolt-cell--" + this.col : "",
      // this.colMd ? "c-bolt-cell--" + this.colMd + "@md" : ""
    );

    return (
      <h2 class={className}>
        <slot />
      </h2>
    );
  }
}