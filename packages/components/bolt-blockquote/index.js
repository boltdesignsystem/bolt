import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-blockquote'], async () => {
  await import(/* webpackChunkName: "bolt-blockquote" */ './src/blockquote');
});
