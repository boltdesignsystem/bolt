const core = require('@bolt/build-core');
const gulp = require('gulp');
const delSymlinks = require('del-symlinks');
const vfs = require('vinyl-fs');
const globby = require('globby');
const fs = require('fs');
const gulpConfig = require('../../../gulpconfig.js');
const path = require('path');
const yaml = require('js-yaml');
const merge = require('merge').recursive;
const defaultConfig = require('./config.default');
const gutil = require('gulp-util');
const twigPaths = gulpConfig.patternLab.twigNamespaces.sets;
const patternLabConfig = yaml.safeLoad(
  fs.readFileSync(gulpConfig.patternLab.configFile, 'utf8')
);
const patternLabRoot = path.join(gulpConfig.patternLab.configFile, '../..');
const patternLabSource = path.join(patternLabRoot, patternLabConfig.sourceDir);


function findPatternLabFolder(patternType) {
  const patternConfig = twigPaths.find(
    element => element.namespace === patternType
  );

  if (patternConfig.paths[0]) {
    return patternConfig.paths[0];
  }
  return false;
}

function createSymlinks(userConfig) {
  const config = merge(defaultConfig, userConfig);
  const patternsFolder = `${patternLabSource}/${config.patternsFolder}/`;

  function createSymlinksTask(done) {
    globby(config.packageFolders).then((packages) => {
      packages.forEach((pkg) => {
        const pkgJson = `${pkg}/package.json`;

        if (fs.existsSync(pkgJson)) {
          const pjson = JSON.parse(fs.readFileSync(pkgJson));
          const twigPath = pjson.twig ? path.dirname(pjson.twig) : config.defaultTwigPath;
          let patternName = pjson.patternName ? `/${pjson.patternName}` : '';

          const patternType = pjson.patternType ? findPatternLabFolder(pjson.patternType) : `${patternsFolder}${config.defaultPatternType}`;

          let patternSubtype;
          if (pjson.patternSubtype) {
            patternSubtype = pjson.patternSubtype;
          } else {
            patternSubtype = config.defaultPatternSubtype;
          }

          if (fs.existsSync(`${patternType}/${config.symlinkPrefix}${patternSubtype}${patternName}`)) {
            const oldName = `${patternType}/${config.symlinkPrefix}${patternSubtype}${patternName}`;

            if (patternName === '') {
              patternName = `/${config.defaultPatternName}`;

              const newName = `${patternType}/${config.symlinkPrefix}${patternSubtype}${patternName}`;

              gutil.log(`Warning: you're trying to combine two similarly named folder structures that would result in one folder overriding the other. Automatically updating the ${oldName} path to now be ${newName}.`);
            } else {
              gutil.log(`Error: you're trying to combine two similarly named folder structures that would result in one folder overriding the other. Automatically updating the path of ${oldName} won't work here...`);
              return false;
            }
          }

          if (fs.existsSync(`${pkg}/${twigPath}/`)) {
            return vfs.src(`${pkg}/${twigPath}/`, {
              followSymlinks: false
            })
              .pipe(vfs.symlink(`${patternType}/${config.symlinkPrefix}${patternSubtype}${patternName}`))
              .on('end', () => {
                core.events.emit('symlinked');
                done();
              });
          }
          gutil.log(`${pkg}/${twigPath}/ does not exist...`);
        }

        return true;
      });
    });
    done();
  }

  createSymlinksTask.description = 'Automatically create symlinks';
  createSymlinksTask.displayName = 'symlinks:create';
  return createSymlinksTask;
}
module.exports.create = createSymlinks;


function cleanSymlinks(userConfig) {
  const config = merge(defaultConfig, userConfig || {});
  const patternsFolder = `${patternLabSource}/${config.patternsFolder}/`;

  function cleanSymlinksTask(done) {
    delSymlinks([`${patternsFolder}**/*`]).then(() => {
      done();
    });
  }
  cleanSymlinksTask.description = 'Automatically clean up symlinks';
  cleanSymlinksTask.displayName = 'symlinks:clean';

  return cleanSymlinksTask;
}
module.exports.clean = cleanSymlinks;



function watchSymlinks(userConfig) {
  function watchSymlinksTask() {
    return gulp.watch([
      './packages/**/*.{md,twig,yaml,yml,json}',
      '!./packages/*/node_modules'
    ], gulp.series([
      cleanSymlinks(userConfig),
      createSymlinks(userConfig)
    ]));
  }

  watchSymlinksTask.displayName = 'symlinks:watch';
  watchSymlinksTask.description = 'Watch symlink-related files for changes';
  //
  return watchSymlinksTask;
}
module.exports.watch = watchSymlinks;
