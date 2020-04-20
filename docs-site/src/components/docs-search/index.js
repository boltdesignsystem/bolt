import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bds-docs-search'], async () => {
  await import(
    /* webpackChunkName: "docs-site--docs-search" */ './docs-search.js'
  );
});
