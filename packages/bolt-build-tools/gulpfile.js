const server = require('@bolt/build-server').server;
const jekyll = require('@bolt/build-jekyll');
const patternlab = require('@bolt/build-patternlab');
const styles = require('@bolt/build-styles');
const symlinks = require('@bolt/build-symlinks');

module.exports = (gulp) => {

  const cssConfig = {
    src: [
      './packages/bolt-toolkit/**/*.scss',
      './packages/bolt-toolkit-core/**/*.scss',
      './packages/bolt-toolkit-ui/**/*.scss',
      '!./packages/**/node_modules/**/*',
    ],
    data: './packages/website-pattern-lab/source/_data',
    dest: 'bolt-website/styles'
  };

  gulp.task('styles:compile', styles.compile(cssConfig));
  gulp.task('styles:watch', styles.watch(cssConfig));
  gulp.task('styles:sassdoc', styles.docs(cssConfig));

  gulp.task('jekyll:compile', jekyll.compile());
  gulp.task('jekyll:watch', jekyll.watch());

  gulp.task('symlinks:create', symlinks.create());
  gulp.task('symlinks:clean', symlinks.clean());
  gulp.task('symlinks', gulp.series([
    'symlinks:clean',
    'symlinks:create'
  ]));

  gulp.task('patternlab:compile', patternlab.compile());
  gulp.task('patternlab:recompile', patternlab.recompile());
  gulp.task('patternlab:watch', patternlab.watch());


  const browserSyncServer = server();
  browserSyncServer.displayName = 'browsersync:serve';
  browserSyncServer.description = 'Serve Jekyll and Pattern Lab sites';
  gulp.task(browserSyncServer);


  gulp.task('default',
    gulp.series([
      'symlinks:clean',
      'symlinks:create',
      gulp.parallel([
        'patternlab:compile',
        'jekyll:compile',
        'styles:compile',
      ]),
      gulp.parallel([
        'browsersync:serve',
        'jekyll:watch',
        'patternlab:watch',
        'styles:watch'
      ])
    ])
  );

  gulp.task('build',
    gulp.series([
      'styles:compile',
      'symlinks',
      'patternlab:compile',
      'jekyll:compile'
    ])
  );



// const flatten = require('gulp-flatten');
// const globby = require('globby');
// const path = require('path');
// const readPkgUp = require('read-pkg-up');
// const yaml = require('js-yaml');
// const fs = require('fs-extra');
// const config = yaml.safeLoad(fs.readFileSync('packages/website-pattern-lab/schemas/.pk-config.yml', 'utf8'));
// const rename = require('gulp-rename');
// const browserSync = require('browser-sync');// .get('bolt-server');



// const findParentDir = require('find-parent-dir');
// const pkgDir = require('pkg-dir');
// const pkgUp = require('pkg-up');
// const findUp = require('find-up');

// const merge = require('merge').recursive;


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
// gulp.task('pk:schema', () =>
//   gulp.src([
//     `./packages/ui-toolkit/**/*${config.extensions.schemas}`,
//     '!node_modules',
//     '!./packages/ui-toolkit/**/node_modules/**/*',
//     '!./packages/ui-toolkit/*/node_modules/**/*'
//   ])
//     .pipe(flatten())
//     .pipe(gulp.dest(config.paths.schemas[0]))
//     // .pipe( browserSync.reload( {
//     //     stream: true
//     // } ) );
// );
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
gulp.task('pk:schema', (done) => {
  globby([
    // './packages/ui-toolkit/**/README.md',
    `./packages/bolt-toolkit-ui/**/*${config.extensions.schemas}`,
    `./packages/bolt-toolkit-core/**/*${config.extensions.schemas}`,
    '!node_modules',
    '!./packages/bolt-ui-toolkit/**/node_modules/**/*',
    '!./packages/bolt-ui-toolkit/*/node_modules/**/*'
  ]).then((patterns) => {
    patterns.map((patternName) => {
      const dirName = path.dirname(patternName);

      readPkgUp({ cwd: dirName }).then((result) => {
        let name = result.pkg.name;
        const splitName = name.split('/');
        name = splitName[splitName.length - 1];
        name = name.split(/-(.+)/)[1]; // Throw away the 1st half of the string that contains a dash.

        console.log(dirName);
        console.log(name);

        // if (result.pkg.twig) {
        //   // console.log(`${dirName}/${result.pkg.twig}`);
        //   if (fs.existsSync(`${dirName}/${result.pkg.twig}`)) {
        //     // Do something
        //     // console.log(`${dirName}/${result.pkg.twig}`);
        //   }
        // }
        console.log(config.paths.schemas[0]);

        return gulp.src([patternName])
          .pipe(flatten())
          .pipe(gulp.dest(config.paths.schemas[0]))
          .pipe(rename(`${name}.json`))
          .pipe(gulp.dest('./bolt-website/pattern-lab/schemas'))
          .pipe(browserSync.reload({
            stream: true
          }));
      });
    });
    done();
  });
});
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


// const patternkit = require('./packages/bolt-build-tools/build-patternkit')();




//
// // // Browser Sync - Pattern Lab
// // const browserSyncJekyllConfig = {
// //   server: 'bolt-website'
// // };
// // const jekyllServer = bolt.server(browserSyncJekyllConfig);
// // jekyllServer.displayName = 'jekyll:serve';
// // jekyllServer.description = 'Serve Jekyll sandbox';
// // gulp.task(jekyllServer);
//
// /*-------------------------------------------------------------------
// // Pattern Lab Tasks
// -------------------------------------------------------------------*/
// gulp.task(bolt.slack());





//
// return gulp.src('path/to/source/**/*.scss')
//     .pipe(sassdoc())
//     // Either trigger `resume` event.
//     .resume();
//     // Or attach a noop `data` event listener.
//     .on('data', function () {});



// gulp.task(bolt.watchSymlinks());
// gulp.task(bolt.lerna());
// gulp.task(bolt.watchPatternLab({
//   extraWatches: [
//     // './packages/**/*.twig'
//   ]
// }));





// // gulp.task('patternlab:stylelint', bolt.lintCSS(patternLabCSSConfig));
//
// /*-------------------------------------------------------------------
// // Default (Main) Gulp Task -- Serves PL, Compiles & Watches for Changes
// -------------------------------------------------------------------*/

//
// gulp.task('patternlab:default',
//   gulp.series([
//     'styles:compile',
//     'styles:sassdoc',
//     'symlinks',
//     'patternlab:compile',
//     gulp.parallel([
//       'patternlab:serve',
//       'patternlab:watch',
//       'styles:watch',
//       'symlinks:watch'
//     ])
//   ])
// );
//
// //
// // gulp.task('patternlab:build',
// //   gulp.series([
// //     'styles:compile',
// //     'styles:sassdoc',
// //     'symlinks',
// //     'patternlab:compile'
// //   ])
// // );
//
// // const jekyllTasks = require('@theme-tools/plugin-jekyll')({
// //   cwd: 'sandbox/styleguide/source',
// //   watch: [
// //     './sandbox/styleguide/source/**',
// //     '!./sandbox/styleguide/source/.sass-cache/**',
// //   ],
// // });
// //
// //
// // const jekyllCssConfig = {
// //   root: './sandbox/styleguide',
// //   src: [
// //     './sandbox/styleguide/source/styles/**/*.scss'
// //   ],
// //   dest: './bolt-website/styles',
// //   jsonDest: './sandbox/styleguide/source/_data',
// //   extraWatches: './packages/**/*.scss'
// // };
// //
// // const compileJekyllCSS = bolt.compileCSS(jekyllCssConfig);
// // const jekyllSassDoc = bolt.sassDoc(jekyllCssConfig);
// // const watchJekyllCSS = bolt.watchCSS(jekyllCssConfig);
// //
// //
// // gulp.task('jekyll:css', compileJekyllCSS);
// // gulp.task('jekyll:build', jekyllTasks.build);
// // gulp.task('jekyll:watch', jekyllTasks.watch);
// //
// // gulp.task('jekyll:default', gulp.series([
// //   jekyllTasks.build,
// //   compileJekyllCSS,
// //   jekyllSassDoc,
// //   gulp.parallel([
// //     jekyllTasks.watch,
// //     watchJekyllCSS,
// //     'jekyll:serve',
// //   ]),
// // ]));
// //
// // gulp.task('jekyll', gulp.series([
// //   jekyllTasks.build,
// //   compileJekyllCSS,
// //   jekyllSassDoc
// // ]));
//
//
// // gulp.task('build',
// //   gulp.series([
// //     'jekyll',
// //     'patternlab:build'
// //   ])
// // );
//
//
//
//
//




}
//
// const symlinkTasks = require('./packages/build-tools-symlinks')(gulp, {});

// const gulpConfig = require('./gulpconfig');


/*-------------------------------------------------------------------
// Pull in tasks + customize configuration
-------------------------------------------------------------------*/


/*-------------------------------------------------------------------
// Server Environment Configurations
-------------------------------------------------------------------*/


// console.log(serverTasks);


// console.log(boltServer());
// boltServer.displayName = 'starterkit:serve';
// boltServer.description = 'Serve Bolt starterkit example';

//
//

// const serverTest =; };

// );

// const patternLabTasks = require('./packages/build-tools-pattern-lab')(gulp, {
//   browserSync: {
//     serverName: gulpConfig.browserSync.serverName
//   }
// });

// require('./packages/build-tools-pattern-lab');
// (gulp, {
//   browserSync: {
//     serverName: gulpConfig.browserSync.serverName
//   }
// });


// console.log(patternLabTasks);


/*-------------------------------------------------------------------
// Styles Gulp Tasks
-------------------------------------------------------------------*/

// )(gulp, {
//   root: 'sandbox/pattern-library',
//   src: [
//     'sandbox/pattern-library/source/styles/**/*.scss'
//   ],
//   dest: './sandbox/pattern-library/public/styles',
//   jsonDest: './sandbox/pattern-library/source/_data',
//   extraWatches: './packages/*/*.scss'
//   // lint: true
// }).compile
//
// gulp.task('styles:compile', require('./packages/build-tools-styles')(gulp, {
//   root: 'sandbox/pattern-library',
//   src: [
//     'sandbox/pattern-library/source/styles/**/*.scss'
//   ],
//   dest: './sandbox/pattern-library/public/styles',
//   jsonDest: './sandbox/pattern-library/source/_data',
//   extraWatches: './packages/*/*.scss'
//   // lint: true
// }).compile);
// console.log(typeof (cssTasks.lint));
// console.log(cssTasks.lint);
// gulp.task('styles:lint', cssTasks.lint);


// gulp.task('styles'
//   gulp.series([
//     cssTasks.compile,
//     gulp.parallel([
//       cssTasks.watch
//     ])
//   ])
// );

//


//
//
//
// // Development Task
// export const dev = series(clean, parallel(buildStyles, buildViews, buildScripts), devWatch);
//
// // Serve Task
// export const build = series(clean, parallel(buildStyles, buildViews, buildScripts));
//
// // Default task
// export default dev;


//
//
// /*-------------------------------------------------------------------
// // Compile Pattern Lab
// -------------------------------------------------------------------*/
// // gulp.task('patternlab:compile', gulp.series([patternLabTasks.compile]));
// //
// // gulp.task('patternlab', gulp.series(
// //   'patternlab:compile',
// //   // gulp.parallel([
// //   //   // patternlab.watch
// //   // ])
// // ));
//
//
// /*-------------------------------------------------------------------
// // Manage Symlinks
// -------------------------------------------------------------------*/
// gulp.task('symlinks:create', symlinkTasks.compile);
// gulp.task('symlinks:clean', symlinkTasks.clean);
//
// gulp.task('symlinks', gulp.series(
//   'symlinks:clean',
//   gulp.parallel(['symlinks:create'])
// ));
//
//
// /*-------------------------------------------------------------------
// // Slack Notifications
// -------------------------------------------------------------------*/
// gulp.task('slack:surge', slackTasks.notify);
// // gulp.task('slack:test', require('./packages/build-tools-slack')(gulp, {
// //   slackText: 'Hello! This is a slack notification test.'
// // }).notify);
//
//
// gulp.task('default',
//   gulp.series([
//     'symlinks:clean',
//     'symlinks:create',
//     'styles:compile'
//   ],
//   gulp.parallel([
//     'styles:watch',
//     // 'patternlab',
//     'browsersync'
//   ])
// ));
//
//
// gulp.task('build',
//   gulp.series([
//     'symlinks:clean',
//     'symlinks:create',
//     'styles:compile'
//   ],
//   // gulp.parallel([
//   //   'patternlab'
//   // ])
// ));
//
// // gulp.series([
// //   cssTasks.compile,
// //   gulp.parallel([
// //     cssTasks.watch
// //   ])
// // ])
// // var cssTestTasks = require('./packages/build-tools-styles')(gulp, {
// //   root: '/',
// //   src: [
// //     'test.scss'
// //   ],
// //   dest: './',
// //   jsonDest: './'
// // });
// // gulp.task('styles:testCompile', cssTestTasks.compile);
//
//
// const path = require('path');
// const merge = require('merge');
// const glob = require('glob');
// const fs = require('fs');
//
//
// // gulp.task('backstop_reference', () => backstopjs('reference'));
//
//
// const renderFile = require('node-twig').renderFile;
// //
// // renderFile('/full/path/to/template.twig', options, (error, template) => {
// //   // ... do something with the rendered template. :)
// // });
//
//
// gulp.task('test:compile-templates', (done) => {
//   const twigFiles = glob.sync('./packages/*/tests/test.twig');
//   twigFiles.map((twigFile) => {
//     let varients;
//
//     const localTwigFileData = require(`${path.dirname(twigFile)}/${path.basename(path.parse(twigFile).name)}.json`);
//
//     const varientPaths = glob.sync(`${path.join(path.dirname(twigFile), '../')}**/*.varients.json`);
//
//     varientPaths.map((varient) => {
//       varients = merge(varients, require(path.resolve(varient)));
//     });
//
//     const mergedTwigFileData = merge(localTwigFileData, varients);
//
//     renderFile(path.resolve(twigFile), {
//       context: mergedTwigFileData,
//       root: path.resolve(path.join(path.dirname(twigFile), '../'))
//     }, (error, template) => {
//       fs.writeFileSync(`${path.resolve(path.dirname(twigFile))}/tmp/test.html`, template);
//       done();
//     });
//   });
//
//   // return gulp.src()
//   //   .pipe(data(function(file) {
//   //     var mergedData;
//   //     var localData = require(path.dirname(file.path) + '/' + path.basename(path.parse(file.path).name) + '.json');
//   //
//   //     var varientPaths = glob.sync(path.join(path.dirname(file.path), '../') + '*.varients.json');
//   //
//   //     var varients;
//   //
//   //     varientPaths.map(function(varient) {
//   //       varients = merge(varients, require(varient));
//   //     });
//   //
//   //     return merge(localData, varients);
//   //   }))
//   //   .pipe(twig({
//   //     data: {
//   //       title: 'Twig template test'
//   //     }
//   //   }))
//   //   .pipe(rename(function(path){
//   //     path.dirname += "/tmp";
//   //   }))
//   //   .pipe(gulp.dest('packages'));
// });
//
//
// gulp.task('test:compile-styles', (done) => {
//   const testStyles = glob.sync('./packages/*/tests/*test.scss', {
//     ignore: [
//       './packages/*/tests/_*test.scss'
//     ]
//   });
//
//   testStyles.map((testStyle) => {
//     const testFile = path.parse(testStyle).name;
//     const testDir = path.dirname(testStyle);
//
//     const compileTestCSS = require('./packages/build-tools-styles')(gulp, {
//       root: testDir,
//       src: testStyle,
//       dest: `${testDir}/tmp`,
//       jsonDest: `${testDir}/tmp`
//     });
//     compileTestCSS.compile(done);
//   });
// });
//
// gulp.task('test',
//   gulp.parallel([
//     'test:compile-templates',
//     'test:compile-styles'
//   ])
// );
//
//
// // Default config at `node_modules/@theme-tools/plugin-sass/config.default.js`
// // const cssTasks = require('@theme-tools/plugin-sass')({
// //   src: [
// //     'pattern-lab/source/_scss/**/*.scss'
// //   ],
// //   dest: 'assets',
// //   lint: {
// //     enabled: false
// //   }
// // });
//
// // Default config at `node_modules/@theme-tools/plugin-browser-sync/config.default.js`
// // const browserSyncTasks = require('@theme-tools/plugin-browser-sync')({
// //   // startPath: 'pattern-lab/public'
// //   startPath: 'public'
// // });
// // // Default config at `node_modules/@theme-tools/plugin-pattern-lab-php/config.default.js`
// // const patternLabTasks = require('@theme-tools/plugin-pattern-lab-php')({
// //   configFile: 'pattern-lab/config/config.yml'
// // });
//
// // const jsTasks = require('@theme-tools/plugin-js-concat-babel')({
// //   src: [
// //     'js/**/*.js'
// //   ],
// //   dest: 'assets',
// //   babelConfig: {
// //     presets: ['babel-preset-es2015'].map(require.resolve)
// //   }
// // });
// //
// // gulp.task('validate:js', jsTasks.validate);
// // gulp.task('js', jsTasks.compile);
// // gulp.task('fix:js', jsTasks.fix);
// // gulp.task('clean:js', jsTasks.clean);
// // gulp.task('watch:js', jsTasks.watch);
// //
// // gulp.task('css', cssTasks.compile);
// // gulp.task('pl', patternLabTasks.compile);
//
// // gulp.task('compile', gulp.series([
// //   cssTasks.clean,
// //   jsTasks.clean,
// //   gulp.parallel([
// //     'js',
// //     'css',
// //     'pl'
// //   ])
// // ]));
//
// // gulp.task('default', gulp.series([
// //   // 'compile',
// //   gulp.parallel([
// //     // patternLabTasks.watch,
// //     // cssTasks.watch,
// //     // jsTasks.watch,
// //     browserSyncTasks.serve
// //   ])
// // ]));
//
//
// // function getTwigNamespaceConfig(workingDir) {
// //    workingDir = workingDir || process.cwd(); // eslint-disable-line no-param-reassign
// //    const twigNamespaceConfig = {};
// //    config.patternLab.twigNamespaces.sets.forEach((namespaceSet) => {
// //      const pathArray = namespaceSet.paths.map((pathBase) => {
// //        const results = glob.sync(path.join(pathBase, '**/*.twig')).map((pathItem) => { // eslint-disable-line arrow-body-style
// //          return path.relative(workingDir, path.dirname(pathItem));
// //        });
// //        results.unshift(path.relative(workingDir, pathBase));
// //        return results;
// //      });
// //      twigNamespaceConfig[namespaceSet.namespace] = {
// //        paths: core.uniqueArray(core.flattenArray(pathArray)),
// //      };
// //    });
// //    return twigNamespaceConfig;
// //  }
// //
// //  function addTwigNamespaceConfigToDrupal(done) {
// //    const twigNamespaceConfig = getTwigNamespaceConfig(path.dirname(config.drupal.themeFile));
// //    const drupalThemeFile = yaml.safeLoad(
// //      fs.readFileSync(config.drupal.themeFile, 'utf8')
// //    );
// //    Object.assign(drupalThemeFile['component-libraries'], twigNamespaceConfig);
// //    const newThemeFile = yaml.safeDump(drupalThemeFile);
// //    fs.writeFileSync(config.drupal.themeFile, newThemeFile, 'utf8');
// //    done();
// //  }
// //
// //  function addTwigNamespaceConfigToPl(done) {
// //    const twigNamespaceConfig = getTwigNamespaceConfig(plRoot);
// //    plConfig = yaml.safeLoad(
// //      fs.readFileSync(config.patternLab.configFile, 'utf8')
// //    );
// //    if (!plConfig.plugins) {
// //      Object.assign(plConfig, {
// //        plugins: {
// //          twigNamespaces: { enabled: true, namespaces: {} },
// //        },
// //      });
// //    } else if (!plConfig.plugins.twigNamespaces) {
// //      Object.assign(plConfig.plugins, {
// //        twigNamespaces: { enabled: true, namespaces: {} },
// //      });
// //    } else if (!plConfig.plugins.twigNamespaces.namespaces) {
// //      plConfig.plugins.twigNamespaces.namespaces = {};
// //    }
// //    Object.assign(plConfig.plugins.twigNamespaces.namespaces, twigNamespaceConfig);
// //    const newConfigFile = yaml.safeDump(plConfig);
// //    fs.writeFileSync(config.patternLab.configFile, newConfigFile, 'utf8');
// //    done();
// //  }
// //
// //  if (config.patternLab.twigNamespaces) {
// //    gulp.task('twigNamespaces', (done) => {
// //     //  addTwigNamespaceConfigToDrupal(done),
// //      addTwigNamespaceConfigToPl(done)
// //     //  addTwigNamespaceConfigToPl(() => {
// //     //    if (config.patternLab.twigNamespaces.addToDrupalThemeFile) {
// //     //      addTwigNamespaceConfigToDrupal(done);
// //     //    }
// //     //    done();
// //     //  });
// //    });
// //   //  plFullDependencies.push('twigNamespaces');
// //   //  watchTriggeredTasks.push('twigNamespaces');
// //  }
//
//
// // gulp.task('default', gulp.series([
// //   // 'compile',
// //   gulp.parallel([
// //     // patternLabTasks.watch,
// //     // cssTasks.watch,
// //     // jsTasks.watch,
// //     browserSyncTasks.serve
// //   ])
// // ]));
// //
//
//
// //
// // var spawn = require('child-process').spawn;
// // var intermediate = require('gulp-intermediate');
// //
// // gulp.task('default', function () {
// //   return gulp.src('app/**/*.jade')
// //     .pipe(intermediate({ output: '_site' }, function (tempDir, cb) {
// //       // Run a command on the files in tempDir and write the results to
// //       // the specified output directory.
// //       var command = spawn('a_command', ['--dest', '_site'], {cwd: tempDir});
// //       command.on('close', cb);
// //     }))
// //     .pipe(gulp.dest('dist'));
// // });
