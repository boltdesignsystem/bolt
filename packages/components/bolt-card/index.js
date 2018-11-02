import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card' */ './src/card');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card-media' */ './src/card-media');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card-body' */ './src/card-body');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card-actions' */ './src/card-actions');
  import(/* webpackMode: 'eager', webpackChunkName: 'bolt-card-action' */ './src/card-action');
});
