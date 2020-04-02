import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-card-replacement'], async () => {
  await Promise.all([
    import(/* webpackChunkName: "bolt-card-replacement" */ './main.js'),
  ]);
});
