import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  console.debug('polyfills loaded');
  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'replace-with-children'
  */ './js/accordion'
  );

  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'bolt-self-drawing-circle'
  */ './bolt-self-drawing-circle/self-drawing-circle'
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
