import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-ol'], async () => {
  await Promise.all([
    import(/* webpackChunkName: "bolt-ol" */ './src/ol'),
    import(/* webpackChunkName: "bolt-li" */ '@bolt/components-li/src/li'),
  ]);
});
