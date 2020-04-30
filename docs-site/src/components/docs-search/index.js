import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bds-docs-search'], async () => {
  await import(/* webpackChunkName: "bolt-docs-search" */ './docs-search.js');
});
