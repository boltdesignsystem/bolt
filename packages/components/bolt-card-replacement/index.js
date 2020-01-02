import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-replacement' */ './src/card-replacement/card-replacement'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-replacement-media' */ './src/card-replacement-media/card-replacement-media'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-replacement-body' */ './src/card-replacement-body/card-replacement-body'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-replacement-link' */ './src/card-replacement-link/card-replacement-link'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-replacement-actions' */ './src/card-replacement-actions/card-replacement-actions'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-card-replacement-action' */ './src/card-replacement-actions/card-replacement-action'
  );
});
