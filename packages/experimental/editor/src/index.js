// @ts-ignore
import { lazyQueue } from '@bolt/lazy-queue';

lazyQueue(['bolt-editor'], async () => {
  await import(/* webpackChunkName: "bolt-editor" */ './main');
});
