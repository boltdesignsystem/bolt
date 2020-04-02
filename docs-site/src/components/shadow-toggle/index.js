import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-shadow-toggle'], async () => {
  await import(
    /* webpackChunkName: "docs-site--shadow-toggle" */ './shadow-toggle.js'
  );
});
