import { polyfillLoader } from '@bolt/core/polyfills';

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
