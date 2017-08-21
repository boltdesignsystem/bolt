/* eslint-disable */
var FontFaceObserver = require('fontfaceobserver/fontfaceobserver.js');


if (sessionStorage.criticalFoftFontsLoaded) {
  document.documentElement.className += ' fonts-loaded';
} else {
    // var loadFonts = function(){

  var openSansLight = new FontFaceObserver('Open Sans', {
    weight: 300
  });

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
    weight: 700
  });



  Promise.all([
    openSansLight.load(null, 5000),
    openSansRegular.load(null, 5000),
    openSansItalic.load(null, 5000),
    openSansSemiBold.load(null, 5000),
    openSansSemiBoldItalic.load(null, 5000),
    openSansBold.load(null, 5000),
        // openSansBold.load(null, 5000),
        // glyphicons.load('\ue003', 5000),
        // fontAwesome.load('\f099', 5000)


  ]).then(function() {
    document.documentElement.className += ' fonts-loaded';
        // // Optimization for Repeat Views
    sessionStorage.criticalFoftFontsLoaded = true;
  }, function(err) {
    document.documentElement.className += ' fonts-loaded';
    sessionStorage.criticalFoftFontsLoaded = true;
  });
}
