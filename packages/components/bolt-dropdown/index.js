
WebComponents.waitFor(() => {
  return import(
    /* webpackChunkName: "bolt-dropdown" */
    /* webpackPrefetch: true */
    './dropdown.js',
  );
});