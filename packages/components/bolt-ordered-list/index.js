import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-unordered-list' */ './src/ordered-list');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-unordered-list-item' */ './src/_ordered-list-item');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-unordered-list-item-index' */ './src/_ordered-list-item-index');
});
