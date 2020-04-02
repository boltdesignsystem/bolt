import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-tooltip'], async () => {
  await Promise.all([
    import(/* webpackChunkName: "bolt-tooltip" */ './src/tooltip'),
  ]);
});
