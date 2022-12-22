const slideshows = document.querySelectorAll('.c-bolt-slideshow');

if (slideshows.length) {
  import(/* webpackChunkName: 'bolt-slideshow' */ './src/slideshow').then(
    ({ BoltSlideshow }) => {
      slideshows.forEach(el => {
        const slideshowComponent = new BoltSlideshow(el);
      });
    },
  );
}
