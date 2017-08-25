/* eslint-disable */

var fontsLoadedClass = 'js-fonts-loaded',
    fontsSubsetLoadedClass = 'js-fonts-subset-loaded';

if (sessionStorage.criticalFoftFontsLoaded) {
  document.documentElement.className += ' ' + fontsLoadedClass + ' ' +  fontsSubsetLoadedClass;
} else {

  var FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');

  var openSansSubset = new FontFaceObserver('OpenSansSubset');




	Promise.all([openSansSubset.load()]).then(function () {
		document.documentElement.className += ' ' + fontsSubsetLoadedClass;

		// var fontA = new FontFaceObserver('Lato');
		// var fontB = new FontFaceObserver('LatoBold', {
		// 		weight: 700
		// 	});
		// var fontC = new FontFaceObserver('LatoItalic', {
		// 		style: 'italic'
		// 	});
		// var fontD = new FontFaceObserver('LatoBoldItalic', {
		// 		weight: 700,
		// 		style: 'italic'
		// 	});
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

    var openSansBold = new FontFaceObserver('Open Sans', {
      weight: 800
    });

    var openSansBoldItalic = new FontFaceObserver('Open Sans', {
      weight: 800,
      style: 'italic'
    });

		Promise.all([
      openSansRegular.load(),
      openSansItalic.load(),
      openSansSemiBold.load(),
      openSansSemiBoldItalic.load(),
      openSansBold.load(),
      openSansBoldItalic.load()
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
