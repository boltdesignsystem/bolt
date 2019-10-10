import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  console.error('Polyfills just finished loading, kicking off w/wo.');
  import(/*
    webpackMode: 'eager',
  */ './js/accordion');

  import(
    /*
    webpackMode: 'eager',
  */ './wwo-self-drawing-circle/self-drawing-circle'
  );

  import(/*
    webpackMode: 'eager',
  */ './js/shadowDomPiercingHacks');

  import(/*
    webpackMode: 'eager',
  */ './js/handleActiveRegionChange');

  import(/*
    webpackMode: 'eager',
  */ './js/handleResize');

  import(/*
    webpackMode: 'eager',
  */ './js/with-without');
});
