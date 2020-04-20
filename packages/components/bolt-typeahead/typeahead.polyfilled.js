import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-typeahead'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-typeahead' */ './typeahead.js'),
  ]);
});
