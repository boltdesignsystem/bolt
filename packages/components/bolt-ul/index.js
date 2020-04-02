import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-ul'], async () => {
  await Promise.all([
    import('./src/ul'),
    import('@bolt/components-li/src/li.js'),
  ]);
});
