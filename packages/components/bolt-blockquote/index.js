import { lazyQueue } from '@bolt/lazy-element';

lazyQueue(['bolt-blockquote'], async () => {
  await Promise.all([
    await import(/* webpackChunkName: "bolt-blockquote" */ './src/blockquote'),
    await import(
      /* webpackChunkName: "replace-with-grandchildren" */ '@bolt/core-v3.x/elements/replace-with-grandchildren'
    ),
  ]);
});
