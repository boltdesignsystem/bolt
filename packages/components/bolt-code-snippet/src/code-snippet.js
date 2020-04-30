import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-code-snippet'], async () => {
  await import(
    /* webpackChunkName: 'bolt-code-snippet' */ './code-snippet.standalone.js'
  );
});
