import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-accordion' */
    /* webpackMode: 'eager' */
    './src/accordion'
  );

  import(
    /* webpackChunkName: 'bolt-accordion-item' */
    /* webpackMode: 'eager' */
    './src/AccordionItem'
  );
});
