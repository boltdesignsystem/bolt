import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-select'], async () => {
  await import(
    /* webpackChunkName: "docs-site--bolt-select" */ './bolt-select.standalone'
  );
});
