/* eslint-disable */


var fontsLoadedClass = 'js-fonts-loaded';
  // fontsSubsetLoadedClass = styles['js-fonts-subset-loaded'];
var FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');

// if (sessionStorage.criticalFoftFontsLoaded) {
//   document.documentElement.className += ' ' + fontsLoadedClass + ' ' + fontsSubsetLoadedClass;
// }

(function () {
  // var FontFaceObserver = window.FontFaceObserver;

  // Current method for Stories
  if (document.documentElement.className.indexOf(fontsLoadedClass) < 0) {

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

    var openSansExtraBold = new FontFaceObserver('Open Sans', {
      weight: 800
    });

    var openSansExtraBoldItalic = new FontFaceObserver('Open Sans', {
      weight: 800,
      style: 'italic'
    });

    Promise
      .all([
        openSansRegular.load(),
        openSansItalic.load(),
        openSansSemiBold.load(),
        // openSansBoldItalic.load(),
        openSansExtraBold.load(),
        openSansExtraBoldItalic.load()

      ])
      .then(function () {
        document.documentElement.className += ' ' + fontsLoadedClass;
      });

  }

  // New method for rebranding
  if (document.documentElement.className.indexOf(fontsLoadedClass) >= 0) {
    // Optimization for Repeat Views
    if (sessionStorage.criticalFoftFontsLoaded) {
      document.documentElement.className += ' ' + fontsLoadedClass;
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

    var openSansExtraBold = new FontFaceObserver('Open Sans', {
      weight: 800
    });

    var openSansExtraBoldItalic = new FontFaceObserver('Open Sans', {
      weight: 800,
      style: 'italic'
    });

    // var retina = new FontFaceObserver('Retina');
    // var register = new FontFaceObserver('Register');
    Promise
      // .all([retina.load(), register.load()])
      .all([
        openSansRegular.load(),
        openSansItalic.load(),
        openSansSemiBold.load(),
        // openSansBoldItalic.load(),
        openSansExtraBold.load(),
        openSansExtraBoldItalic.load()
      ]).then(function () {
        document.documentElement.className += ' ' + fontsLoadedClass;
        sessionStorage.criticalFoftFontsLoaded = true;
      });

  }
})();
