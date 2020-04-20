import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-accordion'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-accordion' */ './main'),
  ]);
});
