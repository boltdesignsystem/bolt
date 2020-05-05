import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-toc'], async () => {
  await import(/* webpackChunkName: 'bolt-toc' */ './main');
});
