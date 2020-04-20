import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-placeholder'], async () => {
  await Promise.all([
    import(
      /* webpackChunkName: 'bolt-placeholder' */ './placeholder.standalone.js'
    ),
  ]);
});
