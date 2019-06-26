import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'bolt-accordion'
  */ './src/accordion'
  );

  import(
    /*
    webpackMode: 'eager',
    webpackChunkName: 'bolt-accordion-item'
  */ './src/AccordionItem'
  );
});
