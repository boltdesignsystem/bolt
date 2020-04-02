import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-ul'], async () => {
  await Promise.all([
    import(/* webpackChunkName: "bolt-ul" */ './src/ul'),
    import(/* webpackChunkName: "bolt-li" */ '@bolt/components-li/src/li.js'),
  ]);
});
