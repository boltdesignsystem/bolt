import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-text'], async () => {
  await Promise.all([import(/* webpackChunkName: 'bolt-text' */ './src/text')]);
});
