import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-tile' */ './src/tile/tile'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-tile-media' */ './src/tile-media/tile-media'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-tile-body' */ './src/tile-body/tile-body'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-tile-link' */ './src/tile-link/tile-link'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-tile-actions' */ './src/tile-actions/tile-actions'
  );
  import(
    /* webpackMode: 'eager', webpackChunkName: 'bolt-tile-action' */ './src/tile-actions/tile-action'
  );
});
