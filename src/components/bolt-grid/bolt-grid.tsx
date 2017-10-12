import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'bolt-grid',
  styleUrl: 'bolt-grid.scss'
})
export class BoltGrid {

  @Prop() center: boolean;

  // @Prop() last: string;

  render() {
    return (
      <div class={this.center ? "c-bolt-grid--center" : "no-center"}>
        <slot />
      </div>
    );
  }
}
