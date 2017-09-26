'use strict';
var merge  = require('merge-stream');

module.exports = function (gulp, config, $) {
  
  // create an accumulated stream
  var fontStream = merge();

  // [200, 400, 700].forEach(function(weight) {
    // a regular version
    // fontStream.add(gulp.src(`source/fonts/critical/exo2.optimized.woff`)
    //                 .pipe($.inlineFonts({ name: 'exo2', weight: 300, format: ['woff'] })));
                    
    fontStream.add(gulp.src(`./source/fonts/critical/opensans-subset.woff`)
                    .pipe($.inlineFonts({ name: 'Open Sans', weight: 400, format: ['woff'] })));
                    
                    
    // 
    // // an italic version
    // fontStream.add(gulp.src(`src/fonts/thesans/${weight}-i.woff`)
    //                 .pipe(inline({ name: 'thesans', weight: weight, format: ['woff'], style: 'italic' })));
  // });

  return fontStream.pipe($.concat('critical.fonts.css')).pipe(gulp.dest('./public/styles/critical'));
};