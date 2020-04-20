import { lazyQueue } from '@bolt/lazy-queue';

if (!window.customElements.get('bolt-trigger')) {
  lazyQueue(['bolt-trigger'], async () => {
    await Promise.all([
      import(/* webpackChunkName: 'bolt-trigger' */ './src/trigger'),
    ]);
  });
}
