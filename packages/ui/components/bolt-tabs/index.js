import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'bolt-tabs'
  */ './src/tabs'
  );

  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'bolt-tab-panel'
  */ './src/TabPanel'
  );
});
