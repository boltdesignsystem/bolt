/* eslint-disable */

var FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');

import styles from './critical-fonts.scss';

var fontsLoadedClass = styles.locals['js-fonts-loaded'];

(function () {
  
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

    
    Promise
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
