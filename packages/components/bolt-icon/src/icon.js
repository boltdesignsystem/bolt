import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-icon'], async () => {
  await import(/* webpackChunkName: "bolt-icon" */ './icon.standalone.js');
});
