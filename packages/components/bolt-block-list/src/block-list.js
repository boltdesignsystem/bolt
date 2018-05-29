WebComponents.waitFor(() => {
  return import(
    /* webpackChunkName: "bolt-block-list" */
    /* webpackPrefetch: true */
    './block-list.standalone.js',
  );
});