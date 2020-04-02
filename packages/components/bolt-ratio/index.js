import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-ratio'], async () => {
  await Promise.all([
    import(/* webpackChunkName: "bolt-ratio" */ './src/ratio'),
  ]);
});
