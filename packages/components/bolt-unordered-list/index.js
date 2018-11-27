import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-unordered-list' */ './src/unordered-list');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-unordered-list-item' */ './src/_unordered-list-item');
});
