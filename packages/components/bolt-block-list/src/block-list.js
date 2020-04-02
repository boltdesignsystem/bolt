import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-block-list'], async () => {
  await import(
    /* webpackChunkName: "bolt-block-list" */ './block-list.standalone.js'
  );
});
