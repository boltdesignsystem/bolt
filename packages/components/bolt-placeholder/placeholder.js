import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-placeholder'], async () => {
  await import(
    /* webpackChunkName: 'bolt-placeholder' */ './placeholder.standalone.js'
  );
});
