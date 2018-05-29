
WebComponents.waitFor(() => {
  return import(
    /* webpackChunkName: "bolt-device-viewer" */
    /* webpackPrefetch: true */
    './device-viewer.standalone.js',
  );
});
