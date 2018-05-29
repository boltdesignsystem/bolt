
WebComponents.waitFor(() => {
  return import(
    /* webpackChunkName: "bolt-copy-to-clipboard" */
    /* webpackPrefetch: true */
    './copy-to-clipboard.standalone.js',
  );
});