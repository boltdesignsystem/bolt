import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-stack'], async () => {
  await Promise.all([
    import('./src/stack'),
  ]);
});
