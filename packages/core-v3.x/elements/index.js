import { lazyQueue } from '@bolt/lazy-queue';

// this import shouldn't be required but keeping these here just in case
// import(/* webpackChunkName: 'bolt-action' */ './bolt-action');

lazyQueue([], async () => {
  import(/* webpackChunkName: 'bolt-elements' */ './elements');
});
