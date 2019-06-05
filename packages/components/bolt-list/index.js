import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-list' */ './src/list'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-list-item' */ './src/_list-item'
  );
});
