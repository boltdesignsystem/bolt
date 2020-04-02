import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-toc'], async () => {
  await Promise.all([
    import('./src'),
  ]);
});
