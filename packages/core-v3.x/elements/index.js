import { lazyQueue } from '@bolt/lazy-queue';

// import(/* webpackChunkName: 'bolt-action' */ './bolt-action');

lazyQueue(
  ['replace-with-children', 'replace-with-grandchildren', 'ssr-keep'],
  async () => {
    import(/* webpackChunkName: 'bolt-elements' */ './elements');
  },
);
