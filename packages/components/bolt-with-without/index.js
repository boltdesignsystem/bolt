import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'replace-with-children'
  */ './js/accordion'
  );

  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'replace-with-children'
  */ './js/shadowDomPiercingHacks'
  );

  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'replace-with-children'
  */ './js/handleActiveRegionChange'
  );

  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'replace-with-children'
  */ './js/handleResize'
  );

  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'with-without'
  */ './js/with-without'
  );
});
