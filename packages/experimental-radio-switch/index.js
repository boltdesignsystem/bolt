import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'bolt-radio-switch'
  */ './radio-switch.js'
  );

  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'bolt-change-case'
  */ './change-case.js'
  );
});
