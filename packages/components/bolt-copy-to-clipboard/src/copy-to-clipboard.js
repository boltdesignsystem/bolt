import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-copy-to-clipboard'], async () => {
  await import(
    /* webpackChunkName: "bolt-copy-to-clipboard" */ './copy-to-clipboard.standalone.js'
  );
});
