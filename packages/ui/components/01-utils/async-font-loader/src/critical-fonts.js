/* eslint-disable */
import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.js';

(function () {
  var fontsLoadedClass = 'js-fonts-loaded';

  // Optimization for Repeat Views
  if (sessionStorage.fontsLoadedCriticalFoftPreloadPolyfill) {
    document.documentElement.className += ` ${fontsLoadedClass}`;
    return;
  }

  var openSansRegular = new FontFaceObserver('Open Sans', {
    weight: 400
  });

  var openSansItalic = new FontFaceObserver('Open Sans', {
    weight: 400,
    style: 'italic'
  });

  var openSansSemiBold = new FontFaceObserver('Open Sans', {
    weight: 600
  });

  var openSansSemiBoldItalic = new FontFaceObserver('Open Sans', {
    weight: 600,
    style: 'italic'
  });

  var openSansExtraBold = new FontFaceObserver('Open Sans', {
    weight: 800
  });

  var openSansExtraBoldItalic = new FontFaceObserver('Open Sans', {
    weight: 800,
    style: 'italic'
  });

  Promise.all([
    openSansRegular.load(),
    openSansItalic.load(),
    openSansSemiBold.load(),
    openSansSemiBoldItalic.load(),
    openSansExtraBold.load(),
    openSansExtraBoldItalic.load()

  ]).then(function () {
    document.documentElement.className += ` ${fontsLoadedClass}`;

    // Optimization for Repeat Views
    sessionStorage.fontsLoadedCriticalFoftPreloadPolyfill = true;
  });
})();
