import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(
    /* webpackChunkName: "bolt-video" */
    /* webpackPrefetch: true */
    './video.standalone.js',
  ).then((Component) => {
    customElements.define(`${bolt.namespace}-video`, Component.BoltVideo());
    customElements.define(`${bolt.namespace}-video-meta`, Component.BoltVideoMeta());
  });
});
