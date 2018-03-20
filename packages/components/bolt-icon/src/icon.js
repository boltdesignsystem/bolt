import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-icon' */ './icon.standalone.js');
});
