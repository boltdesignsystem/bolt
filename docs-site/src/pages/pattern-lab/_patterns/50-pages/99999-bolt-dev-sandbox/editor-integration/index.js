import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-ck-editor'], async () => {
  await import(
    /*  webpackChunkName: 'bolt-docs-site--editor-integration' */ './editor-integration'
  );
});
