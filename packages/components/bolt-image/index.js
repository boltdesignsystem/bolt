import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-image'], async () => {
  await Promise.all([
    import(/* webpackChunkName: "bolt-image" */ './src/image'),
    import(/* webpackChunkName: "bolt-ratio" */ '@bolt/components-ratio'),
  ]);
});
