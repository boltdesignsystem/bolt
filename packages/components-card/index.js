import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card' */ './src/card/card'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-media' */ './src/card-media/card-media'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-body' */ './src/card-body/card-body'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-link' */ './src/card-link/card-link'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-actions' */ './src/card-actions/card-actions'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-action' */ './src/card-actions/card-action'
  );
});
