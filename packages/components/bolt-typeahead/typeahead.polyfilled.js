import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-typeahead'], async () => {
  await Promise.all([
    import(/* webpackChunkName: "bolt-typeahead" */ './typeahead.js'),
  ]);
});
