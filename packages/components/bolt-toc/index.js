import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-toc'], async () => {
  import(/* webpackChunkName: 'bolt-toc' */ './main');
});
