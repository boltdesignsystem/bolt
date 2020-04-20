import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-navlink'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-navlink' */ './navlink.js'),
  ]);
});
