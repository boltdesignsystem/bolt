import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-block-list'], async () => {
  await Promise.all([
    import(
      /* webpackChunkName: 'bolt-block-list' */ './block-list.standalone.js'
    ),
  ]);
});
