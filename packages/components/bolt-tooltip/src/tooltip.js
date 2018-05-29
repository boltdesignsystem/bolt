
WebComponents.waitFor(() => {
  return import(
    /* webpackChunkName: "bolt-tooltip" */
    /* webpackPrefetch: true */
    './tooltip.standalone.js',
  );
});