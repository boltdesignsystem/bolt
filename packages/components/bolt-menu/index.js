import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-menu'], async () => {
  await Promise.all([
    import('./src/menu'),
  ]);
});
