import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackMode: 'lazy', webpackChunkName: 'bolt-copy-to-clipboard' */ './copy-to-clipboard.standalone.js'
  );
});
