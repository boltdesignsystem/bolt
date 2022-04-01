const videoThumbnail = document.querySelectorAll('.c-bolt-video-thumbnail');

if (videoThumbnail.length) {
  import(
    /* webpackChunkName: 'bolt-video-thumbnail' */ './src/video-thumbnail'
  ).then(({ BoltVideoThumbnail }) => {
    videoThumbnail.forEach(el => {
      if (el.classList.contains('c-bolt-video-thumbnail--inline')) {
        const videoThumbnailComponent = new BoltVideoThumbnail(el);
      }
    });
  });
}
