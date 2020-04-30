import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-typeahead'], async () => {
  await import(/* webpackChunkName: 'bolt-typeahead' */ './typeahead.js');
});
