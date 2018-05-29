
WebComponents.waitFor(() => {
  return import(
    /* webpackChunkName: "bolt-nav" */
    /* webpackPrefetch: true */
    './nav.js',
  );
});