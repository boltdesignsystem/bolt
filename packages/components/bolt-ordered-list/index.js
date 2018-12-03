import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-unordered-list' */ './src/ordered-list');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-unordered-list-item' */ './src/_ordered-list-item');
});
