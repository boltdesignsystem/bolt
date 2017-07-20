const gulp = require('gulp');
const gulpConfig = require('./gulpconfig');


/*-------------------------------------------------------------------
// Pull in tasks + customize configuration
-------------------------------------------------------------------*/
const browserSyncTasks = require('./packages/build-tools-server')(gulp, {
  serverName: gulpConfig.browserSync.serverName
});
const slackTasks = require('./packages/build-tools-slack')(gulp, {});
const symlinkTasks = require('./packages/build-tools-symlinks')(gulp, {});
const cssTasks = require('./packages/build-tools-styles')(gulp, {
  root: 'sandbox/pattern-library',
  src: [
    'sandbox/pattern-library/source/styles/**/*.scss'
  ],
  dest: './sandbox/pattern-library/public/styles',
  jsonDest: './sandbox/pattern-library/source/_data',
  extraWatches: './packages/*/*.scss'
  // lint: true
});
const patternLabTasks = require('./packages/build-tools-pattern-lab')(gulp, {
  browserSync: {
    serverName: gulpConfig.browserSync.serverName
  }
});


/*-------------------------------------------------------------------
// Styles Gulp Tasks
-------------------------------------------------------------------*/
gulp.task('styles:compile', cssTasks.compile);
gulp.task('styles:lint', cssTasks.lint);
gulp.task('styles:watch', cssTasks.watch);

gulp.task('styles',
  gulp.series([
    cssTasks.compile,
    gulp.parallel([
      cssTasks.watch
    ])
  ])
);


/*-------------------------------------------------------------------
// Browsersync
-------------------------------------------------------------------*/
gulp.task('browsersync', gulp.series([browserSyncTasks.serve]));


/*-------------------------------------------------------------------
// Compile Pattern Lab
-------------------------------------------------------------------*/
gulp.task('patternlab:compile', gulp.series([patternLabTasks.compile]));

gulp.task('patternlab', gulp.series(
  'patternlab:compile',
  // gulp.parallel([
  //   // patternlab.watch
  // ])
));


/*-------------------------------------------------------------------
// Manage Symlinks
-------------------------------------------------------------------*/
gulp.task('symlinks:create', symlinkTasks.compile);
gulp.task('symlinks:clean', symlinkTasks.clean);

gulp.task('symlinks', gulp.series(
  'symlinks:clean',
  gulp.parallel(['symlinks:create'])
));


/*-------------------------------------------------------------------
// Slack Notifications
-------------------------------------------------------------------*/
gulp.task('slack:surge', slackTasks.notify);
// gulp.task('slack:test', require('./packages/build-tools-slack')(gulp, {
//   slackText: 'Hello! This is a slack notification test.'
// }).notify);


gulp.task('default',
  gulp.series([
    'symlinks:clean',
    'symlinks:create',
    'styles:compile'
    // gulp.task('styles:compile', cssTasks.compile);
    // gulp.task('styles:lint', cssTasks.lint);
    // gulp.task('styles:watch', cssTasks.watch);
  ],
  gulp.parallel([
    'styles:watch',
    'patternlab',
    'browsersync'
  ])
));

// gulp.series([
//   cssTasks.compile,
//   gulp.parallel([
//     cssTasks.watch
//   ])
// ])
// var cssTestTasks = require('./packages/build-tools-styles')(gulp, {
//   root: '/',
//   src: [
//     'test.scss'
//   ],
//   dest: './',
//   jsonDest: './'
// });
// gulp.task('styles:testCompile', cssTestTasks.compile);


const path = require('path');
const merge = require('merge');
const glob = require('glob');
const fs = require('fs');


// gulp.task('backstop_reference', () => backstopjs('reference'));


const renderFile = require('node-twig').renderFile;
//
// renderFile('/full/path/to/template.twig', options, (error, template) => {
//   // ... do something with the rendered template. :)
// });


gulp.task('test:compile-templates', (done) => {
  const twigFiles = glob.sync('./packages/*/tests/test.twig');
  twigFiles.map((twigFile) => {
    let varients;

    const localTwigFileData = require(`${path.dirname(twigFile)}/${path.basename(path.parse(twigFile).name)}.json`);

    const varientPaths = glob.sync(`${path.join(path.dirname(twigFile), '../')}**/*.varients.json`);

    varientPaths.map((varient) => {
      varients = merge(varients, require(path.resolve(varient)));
    });

    const mergedTwigFileData = merge(localTwigFileData, varients);

    renderFile(path.resolve(twigFile), {
      context: mergedTwigFileData,
      root: path.resolve(path.join(path.dirname(twigFile), '../'))
    }, (error, template) => {
      fs.writeFileSync(`${path.resolve(path.dirname(twigFile))}/tmp/test.html`, template);
      done();
    });
  });

  // return gulp.src()
  //   .pipe(data(function(file) {
  //     var mergedData;
  //     var localData = require(path.dirname(file.path) + '/' + path.basename(path.parse(file.path).name) + '.json');
  //
  //     var varientPaths = glob.sync(path.join(path.dirname(file.path), '../') + '*.varients.json');
  //
  //     var varients;
  //
  //     varientPaths.map(function(varient) {
  //       varients = merge(varients, require(varient));
  //     });
  //
  //     return merge(localData, varients);
  //   }))
  //   .pipe(twig({
  //     data: {
  //       title: 'Twig template test'
  //     }
  //   }))
  //   .pipe(rename(function(path){
  //     path.dirname += "/tmp";
  //   }))
  //   .pipe(gulp.dest('packages'));
});


gulp.task('test:compile-styles', (done) => {
  const testStyles = glob.sync('./packages/*/tests/*test.scss', {
    ignore: [
      './packages/*/tests/_*test.scss'
    ]
  });

  testStyles.map((testStyle) => {
    const testFile = path.parse(testStyle).name;
    const testDir = path.dirname(testStyle);

    const compileTestCSS = require('./packages/build-tools-styles')(gulp, {
      root: testDir,
      src: testStyle,
      dest: `${testDir}/tmp`,
      jsonDest: `${testDir}/tmp`
    });
    compileTestCSS.compile(done);
  });
});

gulp.task('test',
  gulp.parallel([
    'test:compile-templates',
    'test:compile-styles'
  ])
);


// Default config at `node_modules/@theme-tools/plugin-sass/config.default.js`
// const cssTasks = require('@theme-tools/plugin-sass')({
//   src: [
//     'pattern-lab/source/_scss/**/*.scss'
//   ],
//   dest: 'assets',
//   lint: {
//     enabled: false
//   }
// });

// Default config at `node_modules/@theme-tools/plugin-browser-sync/config.default.js`
// const browserSyncTasks = require('@theme-tools/plugin-browser-sync')({
//   // startPath: 'pattern-lab/public'
//   startPath: 'public'
// });
// // Default config at `node_modules/@theme-tools/plugin-pattern-lab-php/config.default.js`
// const patternLabTasks = require('@theme-tools/plugin-pattern-lab-php')({
//   configFile: 'pattern-lab/config/config.yml'
// });

// const jsTasks = require('@theme-tools/plugin-js-concat-babel')({
//   src: [
//     'js/**/*.js'
//   ],
//   dest: 'assets',
//   babelConfig: {
//     presets: ['babel-preset-es2015'].map(require.resolve)
//   }
// });
//
// gulp.task('validate:js', jsTasks.validate);
// gulp.task('js', jsTasks.compile);
// gulp.task('fix:js', jsTasks.fix);
// gulp.task('clean:js', jsTasks.clean);
// gulp.task('watch:js', jsTasks.watch);
//
// gulp.task('css', cssTasks.compile);
// gulp.task('pl', patternLabTasks.compile);

// gulp.task('compile', gulp.series([
//   cssTasks.clean,
//   jsTasks.clean,
//   gulp.parallel([
//     'js',
//     'css',
//     'pl'
//   ])
// ]));

// gulp.task('default', gulp.series([
//   // 'compile',
//   gulp.parallel([
//     // patternLabTasks.watch,
//     // cssTasks.watch,
//     // jsTasks.watch,
//     browserSyncTasks.serve
//   ])
// ]));


// function getTwigNamespaceConfig(workingDir) {
//    workingDir = workingDir || process.cwd(); // eslint-disable-line no-param-reassign
//    const twigNamespaceConfig = {};
//    config.patternLab.twigNamespaces.sets.forEach((namespaceSet) => {
//      const pathArray = namespaceSet.paths.map((pathBase) => {
//        const results = glob.sync(path.join(pathBase, '**/*.twig')).map((pathItem) => { // eslint-disable-line arrow-body-style
//          return path.relative(workingDir, path.dirname(pathItem));
//        });
//        results.unshift(path.relative(workingDir, pathBase));
//        return results;
//      });
//      twigNamespaceConfig[namespaceSet.namespace] = {
//        paths: core.uniqueArray(core.flattenArray(pathArray)),
//      };
//    });
//    return twigNamespaceConfig;
//  }
//
//  function addTwigNamespaceConfigToDrupal(done) {
//    const twigNamespaceConfig = getTwigNamespaceConfig(path.dirname(config.drupal.themeFile));
//    const drupalThemeFile = yaml.safeLoad(
//      fs.readFileSync(config.drupal.themeFile, 'utf8')
//    );
//    Object.assign(drupalThemeFile['component-libraries'], twigNamespaceConfig);
//    const newThemeFile = yaml.safeDump(drupalThemeFile);
//    fs.writeFileSync(config.drupal.themeFile, newThemeFile, 'utf8');
//    done();
//  }
//
//  function addTwigNamespaceConfigToPl(done) {
//    const twigNamespaceConfig = getTwigNamespaceConfig(plRoot);
//    plConfig = yaml.safeLoad(
//      fs.readFileSync(config.patternLab.configFile, 'utf8')
//    );
//    if (!plConfig.plugins) {
//      Object.assign(plConfig, {
//        plugins: {
//          twigNamespaces: { enabled: true, namespaces: {} },
//        },
//      });
//    } else if (!plConfig.plugins.twigNamespaces) {
//      Object.assign(plConfig.plugins, {
//        twigNamespaces: { enabled: true, namespaces: {} },
//      });
//    } else if (!plConfig.plugins.twigNamespaces.namespaces) {
//      plConfig.plugins.twigNamespaces.namespaces = {};
//    }
//    Object.assign(plConfig.plugins.twigNamespaces.namespaces, twigNamespaceConfig);
//    const newConfigFile = yaml.safeDump(plConfig);
//    fs.writeFileSync(config.patternLab.configFile, newConfigFile, 'utf8');
//    done();
//  }
//
//  if (config.patternLab.twigNamespaces) {
//    gulp.task('twigNamespaces', (done) => {
//     //  addTwigNamespaceConfigToDrupal(done),
//      addTwigNamespaceConfigToPl(done)
//     //  addTwigNamespaceConfigToPl(() => {
//     //    if (config.patternLab.twigNamespaces.addToDrupalThemeFile) {
//     //      addTwigNamespaceConfigToDrupal(done);
//     //    }
//     //    done();
//     //  });
//    });
//   //  plFullDependencies.push('twigNamespaces');
//   //  watchTriggeredTasks.push('twigNamespaces');
//  }


// gulp.task('default', gulp.series([
//   // 'compile',
//   gulp.parallel([
//     // patternLabTasks.watch,
//     // cssTasks.watch,
//     // jsTasks.watch,
//     browserSyncTasks.serve
//   ])
// ]));
//


//
// var spawn = require('child-process').spawn;
// var intermediate = require('gulp-intermediate');
//
// gulp.task('default', function () {
//   return gulp.src('app/**/*.jade')
//     .pipe(intermediate({ output: '_site' }, function (tempDir, cb) {
//       // Run a command on the files in tempDir and write the results to
//       // the specified output directory.
//       var command = spawn('a_command', ['--dest', '_site'], {cwd: tempDir});
//       command.on('close', cb);
//     }))
//     .pipe(gulp.dest('dist'));
// });
