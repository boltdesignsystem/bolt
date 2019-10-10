import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-copy-to-clipboard' */ './copy-to-clipboard.standalone.js'
  );
});
