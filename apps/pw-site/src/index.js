import '@bolt/core/polyfills/bolt-webcomponents-ce';
import { BoltRatio } from '@bolt/global/styles/05-objects/objects-ratio/ratio.standalone';
import { BoltVideo, BoltVideoMeta } from '@bolt/components-video/src/video.standalone';

customElements.define(`${bolt.namespace}-ratio`, BoltRatio());
customElements.define(`${bolt.namespace}-video-meta`, BoltVideoMeta());
customElements.define(`${bolt.namespace}-video`, BoltVideo());
