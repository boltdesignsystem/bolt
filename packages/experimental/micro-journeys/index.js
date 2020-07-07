import 'regenerator-runtime/runtime.js';
import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-interactive-pathway'], async () => {
  await import(/* webpackChunkName: "bolt-interactive-pathway" */ './main');
});
