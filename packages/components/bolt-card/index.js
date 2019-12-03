import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card' */ './src/card');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card-media' */ './src/_card-media');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card-body' */ './src/_card-body');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card-link' */ './src/_card-link');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card-actions' */ './src/_card-actions');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card-action' */ './src/_card-action');
});
