import { lazyQueue } from '@bolt/lazy-queue';
import meta from './animate.meta';

lazyQueue(['bolt-animate'], async () => {
  await Promise.all([
    import(/* webpackChunkName: 'bolt-animate' */ './src/animate'),
  ]);
});

export default {
  meta,
};
