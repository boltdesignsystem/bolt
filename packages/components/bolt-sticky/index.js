import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-sticky'], async () => {
  await import('./src/sticky.js');
});
