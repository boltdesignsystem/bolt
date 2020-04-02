import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-banner'], async () => {
  import('./src/banner');
});
