import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bds-docs-search'], async () => {
  await import(
    /* webpackChunkName: "docs-site--docs-search" */ './docs-search.js'
  );
});
