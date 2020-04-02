import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bds-docs-search'], async () => {
  await import('./docs-search.js');
});
