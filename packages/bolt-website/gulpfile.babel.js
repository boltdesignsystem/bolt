"use strict";

import gulp from "gulp";
const flatten = require('gulp-flatten');
const globby = require('globby');
const faker = require('faker');
// const babel = require('gulp-babel');
// import runSequence from "run-sequence";
// import fs from "fs";
// import gutil from "gutil";

//
// gulp.task( "bower_concat", () => {
//     return gulp.src( [
//             "./bower_components/jquery/*",
//             "./bower_components/eq.js/*"
//         ] )
//         .pipe( plugins.vendor( "vendor.js" ) )
//         .pipe( gulp.dest( options.paths.dist + "/js" ) );
// } );
// // JSON linting
// gulp.task( "jsonlint", () => {
//     return gulp.src( [
//             options.paths.src + "/ui-components/**/*.json",
//             options.fixtures + "/schemas/**/*.json"
//         ] )
//         .pipe( plugins.jsonlint() )
//         .pipe( plugins.jsonlint.reporter() );
// } );
// Delete all dist assets
// gulp.task( "clean:assetsDist", () => {
//     return plugins.del.sync( options.paths.dist + "/*" );
// } );
// // Delete all sass globbing
// gulp.task( "clean:sassGlobbing", () => {
//     return plugins.del.sync( options.paths.src + "/**/__*" );
// } );
// // Delete all test shots
// gulp.task( "clean:shots", () => {
//     return plugins.del.sync( [
//         options.paths.test + "/visual/shots/*.png",
//         "!" + options.paths.test + "/visual/shots/*.baseline.png"
//     ] );
// } );
// Copy all twig templates to the dist directory
// gulp.task( "templates", () => {
//     return gulp.src( "source/**/*.twig" )
//         .pipe( flatten() )
//         .pipe( gulp.dest("public/templates/" ) );
//         // .pipe( browserSync.reload( {
//         //     stream: true
//         // } ) );
// } );
// // // Copy all the test data to the dist directory
// gulp.task( "data", () => {
//     return gulp.src( [
//             options.paths.src + "/ui-components/**/docs/*.{json,yaml}",
//             options.paths.src + "/ui-components/**/tests/*.json"
//         ] )
//         .pipe( plugins.flatten() )
//         .pipe( gulp.dest( options.paths.dist + "/ui-components/data/" ) )
//         .pipe( plugins.browserSync.reload( {
//             stream: true
//         } ) );

const findParentDir = require('find-parent-dir');
const path = require('path');
const pkgDir = require('pkg-dir');
const pkgUp = require('pkg-up');
const readPkgUp = require('read-pkg-up');
const findUp = require('find-up');
const yaml = require('js-yaml');
const fs = require('fs-extra');
const config = yaml.safeLoad(fs.readFileSync('.pk-config.yml', 'utf8'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const merge = require('merge').recursive;




gulp.task('templates', (done) => {
  globby(['../bolt/bolt-toolkit-ui/**/*.twig', '!node_modules']).then(patterns => {
    patterns.map((patternName) => {
      const dirName = path.dirname(patternName);

      readPkgUp({cwd: dirName}).then(result => {
        var name = result.pkg.name;
        var splitName = name.split('/');
        name = splitName[splitName.length - 1];
        name = name.split(/-(.+)/)[1]; // Throw away the 1st half of the string that contains a dash.

        if (name){
          return gulp.src( [ patternName ] )
            .pipe( flatten() )
            .pipe( rename( name + config.extensions.templates ) )
            .pipe( gulp.dest( config.paths.templates[0] ) )
            .pipe( browserSync.reload( {
              stream: true
            }));
        }
      });
    });
    done();
  });
});


gulp.task('docs', (done) => {
  globby(['../bolt/bolt-toolkit-ui/**/README.md', '!node_modules']).then(patterns => {
    patterns.map((patternName) => {
      const dirName = path.dirname(patternName);

      readPkgUp({cwd: dirName}).then(result => {
        var name = result.pkg.name;
        var splitName = name.split('/');
        name = splitName[splitName.length - 1];
        name = name.split(/-(.+)/)[1]; // Throw away the 1st half of the string that contains a dash.

        return gulp.src( [ patternName ] )
          .pipe( flatten() )
          .pipe( rename( name + config.extensions.docs ) )
          .pipe( gulp.dest( config.paths.docs[0] ) )
          .pipe( browserSync.reload( {
            stream: true
          }));
      });
    });
    done();
  });
});

  gulp.task('schema', (done) => {
    globby(['../bolt/bolt-toolkit-ui/**/*.config.js', '!node_modules']).then(patterns => {
      patterns.map((patternName) => {
        const dirName = path.dirname(patternName);
        const file = require(patternName);

        console.log(file);


        const dataFile = file.context;
        const schemaFile = file.schema;
        // const fileVariations = file.variants;

        const schemaFilePath = config.paths.schemas[0] + '/' + schemaFile.title.toLowerCase() + config.extensions.schemas;

        const dataFilePath = config.paths.data[0] + '/' + schemaFile.title.toLowerCase() + config.extensions.data;


        fs.outputFile(schemaFilePath, JSON.stringify(schemaFile, null, 2) , 'utf-8');
        fs.outputFile(dataFilePath, JSON.stringify(dataFile, null, 2) , 'utf-8');


        // console.log();



        // readPkgUp({cwd: dirName}).then(result => {
        //   var name = result.pkg.name;
        //   var splitName = name.split('/');
        //   name = splitName[splitName.length - 1];
        //   name = name.split(/-(.+)/)[1]; // Throw away the 1st half of the string that contains a dash.
        //
        //   return gulp.src( [ patternName ] )
        //     .pipe( flatten() )
        //     .pipe( rename( name + config.extensions.docs ) )
        //     .pipe( gulp.dest( config.paths.docs[0] ) )
        //     .pipe( browserSync.reload( {
        //       stream: true
        //     }));
        // });
      });
      done();
    });
});


gulp.task('default', [
  'templates',
  'docs',
  'schema'
], function(){

});

 //  const docsFiles = glob.sync();
 //  docsFiles.map((docFile) => {
 // // let varients;
 //
 // // const localTwigFileData = require(`${path.dirname(twigFile)}/${path.basename(path.parse(twigFile).name)}.json`);
 //
 // // const varientPaths = glob.sync(`${path.join(path.dirname(twigFile), '../')}**/*.varients.json`);
 //
 // varientPaths.map((varient) => {
 //   varients = merge(varients, require(path.resolve(varient)));
 // });
 //
 // const mergedTwigFileData = merge(localTwigFileData, varients);
 //
 // renderFile(path.resolve(twigFile), {
 //   context: mergedTwigFileData,
 //   root: path.resolve(path.join(path.dirname(twigFile), '../'))
 // }, (error, template) => {
 //   fs.writeFileSync(`${path.resolve(path.dirname(twigFile))}/tmp/test.html`, template);
 //   done();
 // });


// gulp.task('test:compile-templates', (done) => {
// const twigFiles = glob.sync('./packages/*/tests/test.twig');
// twigFiles.map((twigFile) => {
//  let varients;
//
//  const localTwigFileData = require(`${path.dirname(twigFile)}/${path.basename(path.parse(twigFile).name)}.json`);
//
//  const varientPaths = glob.sync(`${path.join(path.dirname(twigFile), '../')}**/*.varients.json`);
//
//  varientPaths.map((varient) => {
//    varients = merge(varients, require(path.resolve(varient)));
//  });
//
//  const mergedTwigFileData = merge(localTwigFileData, varients);
//
//  renderFile(path.resolve(twigFile), {
//    context: mergedTwigFileData,
//    root: path.resolve(path.join(path.dirname(twigFile), '../'))
//  }, (error, template) => {
//    fs.writeFileSync(`${path.resolve(path.dirname(twigFile))}/tmp/test.html`, template);
//    done();
//  });
// });



// } );
// // Copy all schemas to the dist directory
// gulp.task( "schemas", () => {
//     return gulp.src( [ options.paths.src + "/ui-components/**/api/*.json" ] )
//         .pipe( plugins.flatten() )
//         .pipe( gulp.dest( options.paths.dist + "/ui-components/schemas/" ) )
//         .pipe( plugins.browserSync.reload( {
//             stream: true
//         } ) );
// } );
// // Copy all documentation to the dist directory
// gulp.task( "docs", () => {
//     return gulp.src( [ options.paths.src + "/ui-components/**/docs/*.md" ] )
//         .pipe( plugins.flatten() )
//         .pipe( gulp.dest( options.paths.dist + "/ui-components/docs/" ) )
//         .pipe( plugins.browserSync.reload( {
//             stream: true
//         } ) );
// } );
// // Copy all images to the dist directory
// gulp.task( "images", () => {
//     return gulp.src( [ options.paths.src + "/images/*.{png,jpg,jpeg,gif,svg}" ] )
//         .pipe( plugins.cache( plugins.imagemin( {
//             interlaced: true
//         } ) ) )
//         .pipe( plugins.flatten() )
//         .pipe( gulp.dest( options.paths.dist + "/images/" ) )
//         .pipe( plugins.browserSync.reload( {
//             stream: true
//         } ) );
// } );
// import
//
// const options = {
//         pattern: [ "gulp_tasks/*.js" ],
//         argv: require( "minimist" )( process.argv ),
//         paths: {
//             src: "./src",
//             dist: "./dist",
//             test: "./test",
//             fixtures: "./fixtures"
//         },
//         plumber_config: {
//             handleError: function ( error ) {
//                 const lineNumber = ( error.lineNumber ) ? "LINE: " + error.lineNumber + " | " : "";
//                 notify( {
//                     title: "Task failed [" + error.plugin + "]",
//                     message: lineNumber + "See console.",
//                     sound: "Sosumi"
//                 } ).write( error );
//
//                 gutil.beep();
//
//                 // Inspect the error object
//                 //console.log(error);
//
//                 // Easy error reporting
//                 //console.log(error.toString());
//
//                 // Pretty error reporting
//                 let report = "";
//                 report += gutil.colors.red( "TASK:" ) + " [" + error.plugin + "]\n";
//                 report += gutil.colors.red( "PROB:" ) + " " + error.message + "\n";
//
//                 if ( error.lineNumber ) {
//                     report += gutil.colors.red( "LINE:" ) + " " + error.lineNumber + "\n";
//                 }
//                 if ( error.fileName ) {
//                     report += gutil.colors.red( "FILE:" ) + " " + error.fileName + "\n";
//                 }
//
//                 console.error( report );
//
//                 // Prevent the "watch" task from stopping
//                 this.emit( "end" );
//             }
//         }
//     },
//     plugins = {
//         plumber: require( "gulp-plumber" ), // all
//         browserSync: require( "browser-sync" ), // files
//         del: require( "del" ), // files
//         vendor: require( "gulp-concat-vendor" ), // files
//         jsonlint: require( "gulp-jsonlint" ), // files
//         imagemin: require( "gulp-imagemin" ), // files
//         cache: require( "gulp-cache" ), // files
//         sass: require( "gulp-sass" ), // sass
//         postcss: require( "gulp-postcss" ), // sass
//         autoprefixer: require( "gulp-autoprefixer" ), // sass
//         globSass: require( "gulp-sass-globbing" ), // sass
//         scsslint: require( "gulp-scss-lint" ), // sass
//         cache: require( "gulp-cached" ), // sass
//         sourcemaps: require( "gulp-sourcemaps" ), // sass, javascript
//         jshint: require( "gulp-jshint" ), // javascript
//         stylish: require( "jshint-stylish" ), // javascript
//         babel: require( "gulp-babel" ), // javascript
//         flatten: require( "gulp-flatten" ), // javascript
//         concat: require( "gulp-concat" ) // javascript
//     };

// // Pull in any custom configuration settings that are specific to your repo
// let custom_config = JSON.parse( fs.readFileSync( ".gulp-repo.config.json", "utf8" ) );
// // Set a default proxy if no custom_config has been set
// custom_config.proxy = custom_config.proxy || {
//     "path": "localhost",
//     "port": "5001"
// };
//
// require( "load-gulp-tasks" )( gulp, options, plugins );
//
// plugins.browserSync.create();
//
// gulp.task( "server:dist", function () {
//     plugins.browserSync.init( {
//         server: {
//             baseDir: options.paths.dist,
//             index: "schema/page"
//         },
//         port: custom_config.proxy.port,
//         injectChanges: true, // inject CSS changes
//     } );
// } );
//
// gulp.task( "server:test", function () {
//     plugins.browserSync.init( {
//         server: {
//             baseDir: options.paths.dist,
//             index: "test/band"
//         },
//         port: custom_config.proxy.port,
//         injectChanges: true, // inject CSS changes
//         logLevel: "silent"
//     } );
// } );
//
// gulp.task( "clean", ( callback ) => {
//     runSequence( [ "clean:assetsDist", "clean:sassGlobbing", "clean:shots" ], callback );
// } );
//
// gulp.task( "compile", ( callback ) => {
//     runSequence( [ "templates", "data", "schemas", "docs", "images" ], callback );
// } );
//
// gulp.task( "lint", ( callback ) => {
//     runSequence( [ "scsslint", "jsonlint", "jslint" ], callback );
// } );
//
// gulp.task( "build", ( callback ) => {
//     runSequence( [ "compile", "js", "sass" ], callback );
// } );
//
// // Watch task
// gulp.task( "watch", [ "server:dist" ], ( callback ) => {
//     // Reloads the browser whenever styles are updated
//     gulp.watch( options.paths.src + "/**/*.scss", [ "sass" ] );
//
//     // Reloads the browser whenever Twig or JS files change
//     gulp.watch( options.paths.src + "/*.twig" ).on( "change", plugins.browserSync.reload );
//     gulp.watch( options.paths.src + "/*.js" ).on( "change", plugins.browserSync.reload );
// } );
//
// // Full watcher task
// gulp.task( "watcher", ( callback ) => {
//     runSequence( "clean", [ "build", "lint" ], "watch", callback );
// } );
//
// // Run when gulp is
// gulp.task( "default", ( callback ) => {
//     runSequence( "clean", "compile", "lint", callback );
// } );
