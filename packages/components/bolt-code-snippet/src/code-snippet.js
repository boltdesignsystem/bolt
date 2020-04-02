import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-code-snippet'], async () => {
  await import(
    /* webpackChunkName: "bolt-code-snippet" */ './code-snippet.standalone.js'
  );
});
