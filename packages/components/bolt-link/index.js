import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-link'], async () => {
  await Promise.all([
    import('./src/link'),
  ]);
});
