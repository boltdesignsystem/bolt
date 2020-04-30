import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-icon'], async () => {
  await import(/* webpackChunkName: 'bolt-icon' */ './icon.standalone.js');
});
