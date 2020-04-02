import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-tooltip'], async () => {
  await Promise.all([
    import('./src/tooltip'),
  ]);
});
