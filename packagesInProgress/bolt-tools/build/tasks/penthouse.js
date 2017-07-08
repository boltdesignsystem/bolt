var ProgressBar = require('progress');
var glob = require('glob');
var fs = require('fs');
var apartment = require('apartment');
var penthouse = require('penthouse');
var path = require('path');
var CleanCSS = require('clean-css');

var bs = require("browser-sync").get('BrowserSync Server');

module.exports = function (gulp, config, $) {
  
  gulp.task('penthouse', 'Automatically generate Critical Path `Above The Fold` CSS using PhantomJS, Penthouse, and Apartment.', ['browsersync', 'styles', 'patternlab'], function(done){
    
      process.setMaxListeners(0);
      //var paths = 'public/patterns/0+(5|6)*/*.html';
      var paths = 'public/patterns/0+(6)*/*.html';

      var pagesToGlob = {
        ignore: [
          'public/patterns/*/*.escaped.html',
          'public/patterns/*/*.markup-only.html'
        ]
      };

      var count = 0;

      var globPatterns = glob.sync(paths, pagesToGlob);
      
      var bar = new ProgressBar('Calculating CriticalCSS [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 30,
        total: globPatterns.length
      });

      //$.util.log($.util.colors.yellow('Cleaning up our reference CSS file before calculating our Critical CSS.'));
      

      // fs.readFile('./public/styles/screen.css', 'utf8', function (err,data) {
      //   if (err) {
      //     return console.log(err);
      //   }
      //   
      //   var source = apartment(data, { 
      //       // selectors: [
      //       //   '.o-custom-select__btn:after'
      //       //   // '.o-btn::-moz-focus-inner'
      //       // ], 
      //       properties: [
      //         '-moz-osx-font-smoothing',
      //         '-ms-touch-action',
      //         '-webkit-animation-duration',
      //         '-webkit-animation-fill-mode',
      //         '-webkit-animation-name',
      //         '-webkit-animation',
      //         '-webkit-font-feature-settings',
      //         '-webkit-font-kerning',
      //         '-webkit-font-smoothing',
      //         '-webkit-font-variant-ligatures',
      //         '-webkit-transition-property',
      //         '-webkit-transition-timing-function',
      //         '-webkit-transition',
      //         'animation-duration',
      //         'animation-fill-mode',
      //         'animation-name',
      //         'animation',
      //         'font-feature-settings',
      //         'font-kerning',
      //         'font-variant-ligatures',
      //         'pointer-events',
      //         'transition-property',
      //         'transition-property',
      //         'transition-timing-function',
      //         'transition'
      //     ] 
      //   });
      //   
      //   fs.writeFileSync('./public/styles/screen.cleaned.css', source);
      //   
      //   $.util.log($.util.colors.green('Finished cleaning up our reference CSS file.'));
      //   
      //   return;
      // });

      
      
      $.util.log($.util.colors.yellow('Starting up CriticalCSS Calculations. This could take a minute before you start to see the progress bar indicator.'));

      globPatterns.map(function(page) {

        var urlPath = page.replace('public', 'http://localhost:3000');
        var cssNameTemp = page.replace('.html', '.css');
        cssNameTemp = cssNameTemp.replace('public/', '');
        var cssName = cssNameTemp.split('/')[1];
        cssName = cssName + '.css';

        penthouse({
          url: urlPath,
          css: path.join('./public/styles/screen.css'),
          width: 1440,
          height: 1400,
          timeout: 90000,
          strict: true,
          forceInclude: [
            '.fonts-loaded h1, .fonts-loaded h2',
            '.fonts-loaded .c-heading--xlarge',
            '.c-heading--xlarge',
            '.c-checklist',
            '.c-checklist__item',
            '.c-checklist__title',
            '.c-checklist__title:before',
            '.c-tabs__label',
            '.c-tabs',
            '.c-tabs--full',
            '.c-tabs__labels',
            '.c-tabs__input--1:checked~.c-tabs__panels .c-tabs__panel--1',
            '.c-tabs--full .c-tabs__label',
            '.c-heading--h1',
            '.u-1/4\@small',
            '.u-3/4\@small'
            // '.c-page-header.c-page-header--full-bleed',
            // '.medium--one-third',
            // '.medium--two-thirds',
            // '.o-grid__item',
            // '.o-swiper__btn--next',
            // '.o-swiper__btn--prev',
            // '.one-half',
            // '.sitecore .c-sticky-nav',
            // '.sitecore .o-tabs__panel',
            // '.sitecore .c-sticky-nav + *',
            // '.c-page-header--full-bleed'
          ]
        }, function(err, criticalCss) {
          
          if (err){
            $.util.log($.util.colors.red(err));
          }
          
          count++;

          bar.tick();

          // var minifyCssOpts = {
          //   advanced: false,
          //   aggressiveMerging: false,
          //   keepSpecialComments: 0,
          //   mediaMerging: false,
          //   processImport: true,
          //   restructuring: false,
          //   roundingPrecision: 1,
          //   shorthandCompacting: true
          // }
          // 
          // var source = criticalCss;
          // var minified = new CleanCSS(minifyCssOpts).minify(source).styles;
          
          var mkdirSync = function(path) {
            try {
              fs.mkdirSync(path);
            } catch (e) {
              if (e.code != 'EEXIST') throw e;
            }
          }

          mkdirSync(path.join('public/styles/critical'));
          //fs.writeFileSync('./public/styles/critical/' + cssName, minified);
          fs.writeFileSync('./public/styles/critical/' + cssName, criticalCss);

          if (count == globPatterns.length) { // check if all callbacks have been called
            complete();
          }
        });

      });


      function complete() {
        $.util.log($.util.colors.green('Critical Task Complete!'));
        
        bs.exit();
        done();
        // return;
      }
      
  });
};