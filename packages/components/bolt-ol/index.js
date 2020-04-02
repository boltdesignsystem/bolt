import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-ol'], async () => {
  await Promise.all([
    import('./src/ol'),
    import('@bolt/components-li/src/li'),
  ]);
});
