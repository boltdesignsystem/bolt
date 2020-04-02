import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-list'], async () => {
  await Promise.all([
    import(/* webpackChunkName: "bolt-list" */ './src/list.js'),
    import(/* webpackChunkName: "bolt-list-item" */ './src/_list-item'),
  ]);
});
