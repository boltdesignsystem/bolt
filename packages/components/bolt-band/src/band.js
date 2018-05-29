
WebComponents.waitFor(() => {
  return import(
    /* webpackChunkName: "bolt-band" */
    /* webpackPreload: true */
    './band.standalone.js',
  );
});