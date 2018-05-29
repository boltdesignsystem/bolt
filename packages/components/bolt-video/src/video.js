WebComponents.waitFor(() => {
  return import(/* webpackChunkName: 'bolt-video' */ './video.standalone.js');
});