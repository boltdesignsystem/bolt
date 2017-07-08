'use strict';
var woff = require('sfnt2woff-zopfli');
var merge  = require('merge-stream');
var fs = require('fs');

module.exports = function (gulp, config, $) {
  
  
  var exo = fs.readFileSync('./source/fonts/critical/exo2.subset.ttf');
  var opensans = fs.readFileSync('./source/fonts/critical/opensans.subset.ttf');
  var exoOutput = './source/fonts/critical/exo.optimized.woff';
  var openSansOutput = './source/fonts/critical/opensans.optimized.woff';
  fs.writeFileSync(exoOutput, woff.encode(exo));
  
  fs.writeFileSync(openSansOutput, woff.encode(opensans));
  

};