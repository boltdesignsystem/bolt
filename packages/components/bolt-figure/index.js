import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-figure'], async () => {
  import('./src/figure');
});
