/* eslint-disable */

import styles from './critical-fonts.scoped.scss';
import { setTimeout } from 'core-js/library/web/timers';
import { clearInterval } from 'timers';

var fontsLoadedClass = styles['js-fonts-loaded'],
  fontsSubsetLoadedClass = styles['js-fonts-subset-loaded'];

if (sessionStorage.criticalFoftFontsLoaded) {
  document.documentElement.className += ' ' + fontsLoadedClass + ' ' +  fontsSubsetLoadedClass;
} else {

  var FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');

  var openSansSubset = new FontFaceObserver('OpenSansSubset');




	Promise.all([openSansSubset.load()]).then(function () {
		document.documentElement.className += ' ' + fontsSubsetLoadedClass;

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

		Promise.all([
      openSansRegular.load(),
      openSansItalic.load(),
      openSansSemiBold.load(),
      // openSansBoldItalic.load(),
      openSansExtraBold.load(),
      openSansExtraBoldItalic.load()
    ]).then(function () {
			document.documentElement.className += ' ' + fontsLoadedClass;

      if (window.ShadyCSS){
        window.ShadyCSS.styleDocument();
        console.log('fonts loaded - ShadyCSS already there.');
      } else {
        setInterval(function(){
          if (window.ShadyCSS) {
            window.ShadyCSS.styleDocument();
            clearInterval();
            console.log('fonts loaded - ShadyCSS loaded after.');
          }
          console.log('fonts loaded - ShadyCSS not yet loaded.');
        }, 3000);
      }
			// Optimization for Repeat Views
      sessionStorage.criticalFoftFontsLoaded = true;
		});
  //
  // Promise.all([
  //   openSansRegular.load(null, 5000),
  //   openSansItalic.load(null, 5000),
  //   openSansSemiBold.load(null, 5000),
  //   openSansSemiBoldItalic.load(null, 5000),
  //   openSansBold.load(null, 5000),
  //   openSansBoldItalic.load(null, 5000),
  //       // glyphicons.load('\ue003', 5000),
  //       // fontAwesome.load('\f099', 5000)
  //
  //
  // ]).then(function() {
  //   document.documentElement.className += ' js-fonts-loaded';
  //       // // Optimization for Repeat Views
  //   sessionStorage.criticalFoftFontsLoaded = true;
  // }, function(err) {
  //   document.documentElement.className += ' js-fonts-loaded';
  //   sessionStorage.criticalFoftFontsLoaded = true;
  // });
}, function () {
  console.log('Font is not available');

  document.documentElement.className += ' ' + fontsLoadedClass;
  sessionStorage.criticalFoftFontsLoaded = true; // Repeat view.

  if (window.ShadyCSS) {
    window.ShadyCSS.styleDocument();
    console.log('fonts fallback loaded - ShadyCSS loaded after.');
  }
});

}
