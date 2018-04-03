import { polyfillLoader } from '@bolt/core';
import {BoltVideo, BoltVideoMeta} from "./video.standalone";

polyfillLoader.then((res) => {
  import(/* webpackChunkName: 'bolt-video' */ './video.standalone.js')
    .then((Component) => {
      customElements.define('bolt-pw-video', Component.BoltVideo());
      customElements.define('bolt-pw-video-meta', Component.BoltVideoMeta());
    });
});


// %bolt-video {
//   display: inline-block;
// }
//
// bolt-video {
//   @extends %bolt-video;
// }
//
//
// @import '@bolt/components-video';
//
// pw-video {
//   @extends %bolt-video;
// }