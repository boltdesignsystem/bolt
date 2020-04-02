import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-select'], async () => {
  await import('./version-selector.js');
});
