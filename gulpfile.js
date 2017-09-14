const gulp = require('gulp');

require('./packages/bolt-build-tools/gulpfile.js')(gulp);


//
//
// // const delSymlinks = require('del-symlinks');
// const vfs = require('vinyl-fs');
// const globby = require('globby');
// const fs = require('fs');
// // const gulpConfig = require('../../../gulpconfig.js');
// const path = require('path');
// // const yaml = require('js-yaml');
// // const merge = require('merge').recursive;
// // const defaultConfig = require('./config.default');
//
// const twigPaths = gulpConfig.patternLab.twigNamespaces.sets;
// const patternLabConfig = yaml.safeLoad(
//   fs.readFileSync(gulpConfig.patternLab.configFile, 'utf8')
// );
// const patternLabRoot = path.join(gulpConfig.patternLab.configFile, '../..');
// const patternLabSource = path.join(patternLabRoot, patternLabConfig.sourceDir);
//
//
// function findPatternLabFolder(patternType, config) {
//   const patternConfig = twigPaths.find(
//     element => element.namespace === patternType
//   );
//
//   if (patternConfig !== undefined) {
//     if (patternConfig.paths[0]) {
//       return patternConfig.paths[0];
//     }
//   }
//   return config.defaultPatternType;
// }
//
// function createSymlinks(userConfig) {
//   const config = merge(defaultConfig, userConfig);
//   const patternsFolder = `${patternLabSource}/${config.patternsFolder}/`;
//
//   function createSymlinksTask(done) {
//     globby(config.packageFolders).then((packages) => {
//       packages.forEach((pkg) => {
//         const pkgJson = `${pkg}/package.json`;
//
//         if (fs.existsSync(pkgJson)) {
//           const pjson = JSON.parse(fs.readFileSync(pkgJson));
//           let defaultPatternName = pjson.name.substring(pjson.name.indexOf('/') + 1);
//           defaultPatternName = defaultPatternName.substring(defaultPatternName.indexOf('-') + 1);
//
//           const twigPath = pjson.twig ? pjson.twig : `${defaultPatternName}.twig`;
//
//           const patternName = pjson.patternName ? `/${pjson.patternName}` : defaultPatternName;

//           const patternType = pjson.patternType ? findPatternLabFolder(pjson.patternType, config) : `${patternsFolder}${config.defaultPatternType}`;
//
//           let patternSubtype = '';
//           if (pjson.patternSubtype) {
//             patternSubtype = `${pjson.patternSubtype}/`;
//           }
//
//           if (fs.existsSync(`${pkg}/${twigPath}`)) {
//             return vfs.src(`${path.dirname(`${pkg}/${twigPath}`)}/`, {
//               followSymlinks: false
//             })
//               .pipe(vfs.symlink(`${patternType}/${patternSubtype}${config.symlinkPrefix}${patternName}`))
//               .on('end', () => {
//                 done();
//               });
//           }
//         }
//
//         return true;
//       });
//     });
//     done();
//   }
//
//   createSymlinksTask.description = 'Automatically create symlinks';
//   createSymlinksTask.displayName = 'symlinks:create';
//   return createSymlinksTask;
// }
// module.exports.create = createSymlinks;
//
//
// function patternLabGrav() {
//   function patternLabGravTask(done) {
//     if (fs.existsSync('packages/website/user/themes/bolt/pattern-lab/')) {
//       vfs.src('packages/website/user/themes/bolt/pattern-lab/', {
//         followSymlinks: false
//       })
//         .pipe(vfs.symlink('packages/website-pattern-lab'))
//         .on('end', () => {
//           done();
//         });
//     }
//   }
//
//   patternLabGravTask.description = 'Symlink Grav w/ Pattern Lab';
//   patternLabGravTask.displayName = 'symlinks:patternLabGrav';
//   return patternLabGravTask;
// }
// module.exports.patternLabGrav = patternLabGrav;
//
//
// function cleanSymlinks(userConfig) {
//   const config = merge(defaultConfig, userConfig || {});
//   const patternsFolder = `${patternLabSource}/${config.patternsFolder}/`;
//
//   function cleanSymlinksTask(done) {
//     delSymlinks([`${patternsFolder}**/*`]).then(() => {
//       done();
//     });
//   }
//   cleanSymlinksTask.description = 'Automatically clean up symlinks';
//   cleanSymlinksTask.displayName = 'symlinks:clean';
//
//   return cleanSymlinksTask;
// }
// module.exports.clean = cleanSymlinks;
//
//
// function watchSymlinks(userConfig) {
//   function watchSymlinksTask() {
//     return gulp.watch([
//       './packages/**/*.{md,twig,yaml,yml,json}',
//       '!./packages/*/node_modules'
//     ], gulp.series([
//       cleanSymlinks(userConfig),
//       createSymlinks(userConfig)
//     ]));
//   }
//
//   watchSymlinksTask.displayName = 'symlinks:watch';
//   watchSymlinksTask.description = 'Watch symlink-related files for changes';
//   //
//   return watchSymlinksTask;
// }
// module.exports.watch = watchSymlinks;

