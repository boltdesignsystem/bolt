import { polyfillLoader } from '@bolt/core';


polyfillLoader.then(() => {
  import(/* webpackChunkName: 'bolt-video' */ './video.standalone.js')
    .then((Component) => {
      customElements.define(`${bolt.namespace}-video`, Component.BoltVideo());
      customElements.define(`${bolt.namespace}-video-meta`, Component.BoltVideoMeta());
    });
});
