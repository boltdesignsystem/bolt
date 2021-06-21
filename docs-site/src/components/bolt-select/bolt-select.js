import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-select'], async () => {
  await import(
    /* webpackChunkName: "bolt-select" */ './bolt-select.standalone'
  );
});
