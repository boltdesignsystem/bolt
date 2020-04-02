import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['a'], async () => {
  await import('./src/smooth-scroll');
});
