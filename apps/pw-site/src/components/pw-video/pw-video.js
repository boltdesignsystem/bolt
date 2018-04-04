import { polyfillLoader } from '@bolt/core';

polyfillLoader.then(() => {
  import(/* webpackChunkName: 'pw-video' */ '@bolt/components-video/src/video.standalone.js')
    .then((Component) => {
      customElements.define(`${bolt.namespace}-video`, Component.BoltVideo());
      customElements.define(`${bolt.namespace}-video-meta`, Component.BoltVideoMeta());
    });
});
