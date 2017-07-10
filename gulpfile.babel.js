'use strict';

const gulp = require('gulp');
require('babel-core/register');
require('babel-polyfill');

var cssTasks = require('./packages/build-tools-styles')(gulp, {
  root: 'packages/bolt',
  src: [
    'packages/bolt/bolt.scss'
  ],
  dest: './packages/bolt',
  jsonDest: './packages/bolt'
});

gulp.task('styles:compile', cssTasks.compile);
gulp.task('styles:watch', cssTasks.watch);

gulp.task('default', 
  gulp.parallel([
    'styles:compile',
    'styles:watch'
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
