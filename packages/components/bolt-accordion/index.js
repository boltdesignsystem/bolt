import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(
    /* webpackChunkName: 'bolt-accordion' */
    /* webpackMode: 'lazy' */
    /* webpackPreload: true */
    './src/accordion'
  );

  import(
    /* webpackChunkName: 'bolt-accordion-item' */
    /* webpackMode: 'lazy' */
    /* webpackPreload: true */
    './src/AccordionItem'
  );
});
