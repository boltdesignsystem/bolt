/* eslint-disable */

import styles from './critical-fonts.scss';

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

    var openSansBold = new FontFaceObserver('Open Sans', {
      weight: 700
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
      openSansBold.load(),
      // openSansBoldItalic.load(),
      openSansExtraBold.load(),
      openSansExtraBoldItalic.load()
    ]).then(function () {
			document.documentElement.className += ' ' + fontsLoadedClass;

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
});

}
