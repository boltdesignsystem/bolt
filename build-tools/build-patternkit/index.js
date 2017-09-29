const gulp = require('gulp');
const merge = require('merge').recursive;
const flatten = require('gulp-flatten');
const globby = require('globby');
const path = require('path');
const readPkgUp = require('read-pkg-up');
const yaml = require('js-yaml');
const fs = require('fs-extra');

const config = yaml.safeLoad(fs.readFileSync('packages/website-pattern-lab/schemas/.pk-config.yml', 'utf8'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync');// .get('bolt-server');
// const findParentDir = require('find-parent-dir');
// const pkgDir = require('pkg-dir');
// const pkgUp = require('pkg-up');
// const findUp = require('find-up');

// const merge = require('merge').recursive;


module.exports = () => {
  // gulp.task( "data", () => {
  //   return gulp.src( [
  //     options.paths.src + "/ui-components/**/docs/*.{json,yaml}",
  //     options.paths.src + "/ui-components/**/tests/*.json"
  //   ] )
  //   .pipe( plugins.flatten() )
  //   .pipe( gulp.dest( options.paths.dist + "/ui-components/data/" ) )
  //   .pipe( plugins.browserSync.reload( {
  //     stream: true
  // }));


  gulp.task('pk:templates', () =>
    gulp.src([
      './packages/ui-toolkit/**/*.twig',
      '!node_modules',
      '!./packages/ui-toolkit/**/node_modules/**/*',
      '!./packages/ui-toolkit/*/node_modules/**/*'
    ])
      .pipe(flatten())
      .pipe(gulp.dest(config.paths.templates[0]))
    // .pipe( browserSync.reload( {
    //     stream: true
    // } ) );
  );

  //
  // gulp.task('pk:data', () =>
  //   gulp.src([
  //     `./packages/ui-toolkit/**/*${config.extensions.data}`,
  //     '!node_modules',
  //     '!./packages/ui-toolkit/**/node_modules/**/*',
  //     '!./packages/ui-toolkit/*/node_modules/**/*'
  //   ])
  //     .pipe(flatten())
  //     .pipe(gulp.dest(config.paths.data[0]))
  //   // .pipe( browserSync.reload( {
  //   //     stream: true
  //   // } ) );
  // );
  //
  //
  // // gulp.task('pk:schema', () =>
  // //   gulp.src([
  // //     `./packages/ui-toolkit/**/*${config.extensions.schemas}`,
  // //     '!node_modules',
  // //     '!./packages/ui-toolkit/**/node_modules/**/*',
  // //     '!./packages/ui-toolkit/*/node_modules/**/*'
  // //   ])
  // //     .pipe(flatten())
  // //     .pipe(gulp.dest(config.paths.schemas[0]))
  // //   // .pipe( browserSync.reload( {
  // //   //     stream: true
  // //   // } ) );
  // // );
  //
  //
  // gulp.task('pk:sg', () =>
  //   gulp.src([
  //     `./packages/ui-toolkit/**/*${config.extensions.sg}`,
  //     '!node_modules',
  //     '!./packages/ui-toolkit/**/node_modules/**/*',
  //     '!./packages/ui-toolkit/*/node_modules/**/*'
  //   ])
  //     .pipe(flatten())
  //     .pipe(gulp.dest(config.paths.sg[0]))
  //   // .pipe( browserSync.reload( {
  //   //     stream: true
  //   // } ) );
  // );
  //
  //
  // // gulp.task('pattern-templates:copy', (done) => {
  // //   globby(['./source/ui-toolkit/**/*.twig', '!node_modules']).then((patterns) => {
  // //     patterns.map((patternName) => {
  // //       const dirName = path.dirname(patternName);
  // //
  // //       readPkgUp({ cwd: dirName }).then((result) => {
  // //         let name = result.pkg.name;
  // //         const splitName = name.split('/');
  // //         name = splitName[splitName.length - 1];
  // //         name = name.split(/-(.+)/)[1]; // Throw away the 1st half of the string that contains a dash.
  // //
  // //         if (name) {
  // //           return gulp.src([patternName])
  // //             .pipe(flatten())
  // //             .pipe(rename(name + config.extensions.templates))
  // //             .pipe(gulp.dest(config.paths.templates[0]))
  // //             .pipe(browserSync.reload({
  // //               stream: true
  // //             }));
  // //         }
  // //       });
  // //     });
  // //     done();
  // //   });
  // // });
  // //
  // //
  //
  // // ]
  // //
  // //   gulp.task('pk:schema', (done) => {
  // //     globby(['./packages/ui-toolkit/**/README.md', `./packages/ui-toolkit/**/*${config.extensions.schemas}`,
  // //     '!node_modules',
  // //     '!./packages/ui-toolkit/**/node_modules/**/*',
  // //     '!./packages/ui-toolkit/*/node_modules/**/*'
  // //     ]).then((patterns) => {
  // //       patterns.map((patternName) => {
  // //         const dirName = path.dirname(patternName);
  // //
  // //         readPkgUp({ cwd: dirName }).then((result) => {
  // //           let name = result.pkg.name;
  // //           const splitName = name.split('/');
  // //           name = splitName[splitName.length - 1];
  // //           name = name.split(/-(.+)/)[1]; // Throw away the 1st half of the string that contains a dash.
  // //
  // //           // console.log(dirName);
  // //           // console.log(name);
  // //
  // //           // if (result.pkg.twig) {
  // //           //   // console.log(`${dirName}/${result.pkg.twig}`);
  // //           //   if (fs.existsSync(`${dirName}/${result.pkg.twig}`)) {
  // //           //     // Do something
  // //           //     // console.log(`${dirName}/${result.pkg.twig}`);
  // //           //   }
  // //           // }
  // //
  // //
  // //           return gulp.src([patternName])
  // //             .pipe(flatten())
  // //         .pipe(gulp.dest(config.paths.schemas[0]))
  // //             .pipe(rename(name + config.extensions.schemas))
  // //             .pipe(gulp.dest(config.paths.schemas[0]))
  // //             .pipe(browserSync.reload({
  // //               stream: true
  // //             }));
  // //         });
  // //       });
  // //       done();
  // //     });
  // //   });
  //
  //
  // gulp.task('pk:docs', (done) => {
  //   globby(['./packages/ui-toolkit/**/README.md', '!node_modules',
  //     '!node_modules',
  //     '!./packages/ui-toolkit/**/node_modules/**/*',
  //     '!./packages/ui-toolkit/*/node_modules/**/*'
  //   ]).then((patterns) => {
  //     patterns.map((patternName) => {
  //       const dirName = path.dirname(patternName);
  //
  //       readPkgUp({ cwd: dirName }).then((result) => {
  //         let name = result.pkg.name;
  //         const splitName = name.split('/');
  //         name = splitName[splitName.length - 1];
  //         name = name.split(/-(.+)/)[1]; // Throw away the 1st half of the string that contains a dash.
  //
  //         // console.log(dirName);
  //         // console.log(name);
  //
  //         // if (result.pkg.twig) {
  //         //   // console.log(`${dirName}/${result.pkg.twig}`);
  //         //   if (fs.existsSync(`${dirName}/${result.pkg.twig}`)) {
  //         //     // Do something
  //         //     // console.log(`${dirName}/${result.pkg.twig}`);
  //         //   }
  //         // }
  //
  //
  //         return gulp.src([patternName])
  //           .pipe(flatten())
  //           .pipe(rename(name + config.extensions.docs))
  //           .pipe(gulp.dest(config.paths.docs[0]))
  //           .pipe(browserSync.reload({
  //             stream: true
  //           }));
  //       });
  //     });
  //     done();
  //   });
  // });
  //
  // gulp.task('pattern-schema:compile', (done) => {
  //   globby(['./source/_framework/**/*.config.js', '!node_modules']).then((patterns) => {
  //     patterns.map((patternName) => {
  //       const dirName = path.dirname(patternName);
  //       const file = require(patternName);
  //
  //
  //       const dataFile = file.context;
  //       const schemaFile = file.schema;
  //       // const fileVariations = file.variants;
  //
  //       const schemaFilePath = `${config.paths.schemas[0]}/${schemaFile.title.toLowerCase()}${config.extensions.schemas}`;
  //
  //       const dataFilePath = `${config.paths.data[0]}/${schemaFile.title.toLowerCase()}${config.extensions.data}`;
  //
  //
  //       fs.outputFile(schemaFilePath, JSON.stringify(schemaFile, null, 2), 'utf-8');
  //       fs.outputFile(dataFilePath, JSON.stringify(dataFile, null, 2), 'utf-8');
  //
  //
  //       // console.log();
  //
  //
  //       // readPkgUp({cwd: dirName}).then(result => {
  //       //   var name = result.pkg.name;
  //       //   var splitName = name.split('/');
  //       //   name = splitName[splitName.length - 1];
  //       //   name = name.split(/-(.+)/)[1]; // Throw away the 1st half of the string that contains a dash.
  //       //
  //       //   return gulp.src( [ patternName ] )
  //       //     .pipe( flatten() )
  //       //     .pipe( rename( name + config.extensions.docs ) )
  //       //     .pipe( gulp.dest( config.paths.docs[0] ) )
  //       //     .pipe( browserSync.reload( {
  //       //       stream: true
  //       //     }));
  //       // });
  //     });
  //     done();
  //   });
  // });
  //
  //
  // // Copy all twig templates to the dist directory
  // gulp.task('templates', () =>
  //   gulp.src('source/**/*.twig')
  //     .pipe(flatten())
  //     .pipe(gulp.dest('public/templates/'))
  //   // .pipe( browserSync.reload( {
  //   //     stream: true
  //   // } ) );
  // );
};
