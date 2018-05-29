
WebComponents.waitFor(() => {
  return import(
    /* webpackChunkName: "bolt-navlink" */
    /* webpackPrefetch: true */
    './navlink.js',
  );
});