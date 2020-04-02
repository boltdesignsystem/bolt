import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-li'], async () => {
  await Promise.all([
    import('./src/li'),
  ]);
});
