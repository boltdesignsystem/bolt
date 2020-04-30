import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-accordion'], async () => {
  await import(/* webpackChunkName: 'bolt-accordion' */ './main');
});
