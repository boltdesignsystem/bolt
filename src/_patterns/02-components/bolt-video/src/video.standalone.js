import {
  h,
  render,
  define,
  props,
  withComponent,
  withPreact,
  css,
  spacingSizes
} from '@bolt/core';

import BrightcoveVideo from '@bolt/components-brightcove-player/src/brightcove-player.standalone';


class BoltVideo extends BrightcoveVideo {
  constructor() {
    super();
  }

  // renderCallback() {
  //   return (
  //     <slot />
  //   )
  // }
}
customElements.define('bolt-video', BoltVideo);