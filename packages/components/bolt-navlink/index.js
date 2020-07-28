import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-navlink'], async () => {
  await import(/* webpackChunkName: 'bolt-navlink' */ './navlink.js');
});
