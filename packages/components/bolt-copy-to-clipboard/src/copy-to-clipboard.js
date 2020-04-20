import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-copy-to-clipboard'], async () => {
  await Promise.all([
    import(
      /* webpackChunkName: 'bolt-copy-to-clipboard' */ './copy-to-clipboard.standalone.js'
    ),
  ]);
});
