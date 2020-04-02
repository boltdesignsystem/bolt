import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-popover'], async () => {
  await Promise.all([
    import(/* webpackChunkName: "bolt-popover" */ './src/popover'),
  ]);
});
