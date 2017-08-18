import gulp from 'gulp';
import * as bolt from './packages/build-tools/build-all';

/*-------------------------------------------------------------------
// Browsersync Tasks
-------------------------------------------------------------------*/

// Browser Sync - Bolt Starterkit Example
// const browserSyncBoltConfig = {
//   server: 'packages/bolt'
// };
// const boltServer = bolt.server(browserSyncBoltConfig);
// gulp.task(boltServer);


// Browser Sync - Pattern Lab
const browsersyncConfig = {
  server: 'bolt-website'
};
const browserSyncServer = bolt.server(browsersyncConfig);
browserSyncServer.displayName = 'browsersync:serve';
browserSyncServer.description = 'Serve Jekyll and Pattern Lab sites';
gulp.task(browserSyncServer);


// // Browser Sync - Pattern Lab
// const browserSyncJekyllConfig = {
//   server: 'bolt-website'
// };
// const jekyllServer = bolt.server(browserSyncJekyllConfig);
// jekyllServer.displayName = 'jekyll:serve';
// jekyllServer.description = 'Serve Jekyll sandbox';
// gulp.task(jekyllServer);

/*-------------------------------------------------------------------
// Pattern Lab Tasks
-------------------------------------------------------------------*/
gulp.task(bolt.slack());


gulp.task(bolt.compileJekyll());
gulp.task(bolt.watchJekyll());


/*-------------------------------------------------------------------
// Watch Lerna-related Files for Changes
-------------------------------------------------------------------*/
gulp.task(bolt.lerna());

/*-------------------------------------------------------------------
// Slack Notification
-------------------------------------------------------------------*/
gulp.task(bolt.compilePatternLab());
gulp.task(bolt.recompilePatternLab());
gulp.task(bolt.watchPatternLab({
  extraWatches: [
    // './packages/**/*.twig'
  ]
}));


/*-------------------------------------------------------------------
// Symlink Tasks
-------------------------------------------------------------------*/
gulp.task(bolt.createSymlinks());
gulp.task(bolt.cleanSymlinks());
gulp.task(bolt.watchSymlinks());


/*-------------------------------------------------------------------
// CSS Tasks
-------------------------------------------------------------------*/

// Compile Pattern Lab CSS
const boltCSSConfig = {
  // root: 'packages/website-pattern-lab',
  src: [
    // 'packages/ui-toolkit/bolt/*.scss',
    'packages/ui-toolkit/bolt/bolt.scss'
    // 'packages/ui-toolkit/bolt/bolt.v0.1.scss'
    // 'packages/ui-toolkit/bolt/bolt-styleguide.scss'
  ],
  dest: 'bolt-website/styles',
  extraWatches: [
    './packages/**/*.scss'
    // '!./packages/**/node_modules/**/*',
    // '!./**/node_modules/**/*'
  ]
  // jsonDest: './sandbox/pattern-library/source/_data',
};
const compileBoltCSS = bolt.compileCSS(boltCSSConfig);
gulp.task(compileBoltCSS);

// Watch PL styles for changes
gulp.task('styles:watch', bolt.watchCSS(boltCSSConfig));
gulp.task('styles:sassdoc', bolt.sassDoc(boltCSSConfig));


// gulp.task('copy:temp', function(){
//   return gulp.src([
//   './packages/**/feature-toggle.js'
//   ])
//   .pipe(gulp.dest('./bolt-website/scripts'));
// });
// gulp.task('patternlab:stylelint', bolt.lintCSS(patternLabCSSConfig));

/*-------------------------------------------------------------------
// Default (Main) Gulp Task -- Serves PL, Compiles & Watches for Changes
-------------------------------------------------------------------*/
gulp.task('symlinks', gulp.series([
  'symlinks:clean',
  'symlinks:create'
]));

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
// gulp.task('patternlab:build',
//   gulp.series([
//     'styles:compile',
//     'styles:sassdoc',
//     'symlinks',
//     'patternlab:compile'
//   ])
// );

// const jekyllTasks = require('@theme-tools/plugin-jekyll')({
//   cwd: 'sandbox/styleguide/source',
//   watch: [
//     './sandbox/styleguide/source/**',
//     '!./sandbox/styleguide/source/.sass-cache/**',
//   ],
// });
//
//
// const jekyllCssConfig = {
//   root: './sandbox/styleguide',
//   src: [
//     './sandbox/styleguide/source/styles/**/*.scss'
//   ],
//   dest: './bolt-website/styles',
//   jsonDest: './sandbox/styleguide/source/_data',
//   extraWatches: './packages/**/*.scss'
// };
//
// const compileJekyllCSS = bolt.compileCSS(jekyllCssConfig);
// const jekyllSassDoc = bolt.sassDoc(jekyllCssConfig);
// const watchJekyllCSS = bolt.watchCSS(jekyllCssConfig);
//
//
// gulp.task('jekyll:css', compileJekyllCSS);
// gulp.task('jekyll:build', jekyllTasks.build);
// gulp.task('jekyll:watch', jekyllTasks.watch);
//
// gulp.task('jekyll:default', gulp.series([
//   jekyllTasks.build,
//   compileJekyllCSS,
//   jekyllSassDoc,
//   gulp.parallel([
//     jekyllTasks.watch,
//     watchJekyllCSS,
//     'jekyll:serve',
//   ]),
// ]));
//
// gulp.task('jekyll', gulp.series([
//   jekyllTasks.build,
//   compileJekyllCSS,
//   jekyllSassDoc
// ]));


// gulp.task('build',
//   gulp.series([
//     'jekyll',
//     'patternlab:build'
//   ])
// );


gulp.task('default',
  gulp.series([
    'styles:compile',
    // 'styles:sassdoc',
    'symlinks',
    'patternlab:compile',
    'jekyll:compile',
    // 'copy:temp',
    gulp.parallel([
      'browsersync:serve',
      // 'lerna:watch',
      'jekyll:watch',
      'patternlab:watch',
      'styles:watch',
      'symlinks:watch'
    ])
  ])
);
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
