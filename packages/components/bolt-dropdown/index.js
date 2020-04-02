import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-dropdown'], async () => {
  await import(/* webpackChunkName: "bolt-dropdown" */ './dropdown.js');
});
