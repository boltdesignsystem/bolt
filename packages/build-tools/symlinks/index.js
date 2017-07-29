'use strict';

const gulp = require('gulp');
const delSymlinks = require('del-symlinks');
const vfs = require('vinyl-fs');
const globby = require('globby');
const fs = require('fs');
const gulpConfig = require('../../../gulpconfig.js');
const path = require('path');
const yaml = require('js-yaml');
const merge = require('merge');
const defaultConfig = require('./config.default');
const twigPaths = gulpConfig.patternLab.twigNamespaces.sets;
const patternLabConfig = yaml.safeLoad(
  fs.readFileSync(gulpConfig.patternLab.configFile, 'utf8')
);
const patternLabRoot =   path.join(gulpConfig.patternLab.configFile, '../..');
const patternLabSource = path.join(patternLabRoot, patternLabConfig.sourceDir);
const patternLabPublic = path.join(patternLabRoot, patternLabConfig.publicDir);

module.exports = (gulp, userConfig, $) => {

  const tasks = {};
  const config = merge.recursive(defaultConfig, userConfig);

  const patternsFolder = `${patternLabSource}/${config.patternsFolder}/`;


  function findPatternLabFolder(patternType) {
    var patternConfig = twigPaths.find(
      element => element.namespace === patternType
    );

    if (patternConfig.paths[0]){
      return patternConfig.paths[0];
    }
  }




  function createSymlinks(done) {
    globby(config.packageFolders).then(packages => {

      packages.forEach(pkg => {
        const pkgJson = `${pkg}/package.json`;

        if (fs.existsSync(pkgJson)) {
          const pjson = JSON.parse(fs.readFileSync(pkgJson));
          const twigPath = pjson.twig ? path.dirname(pjson.twig) : config.defaultTwigPath;
          let patternName = pjson.patternName ? `/${pjson.patternName}`  : '';

          const patternType = pjson.patternType ? findPatternLabFolder(pjson.patternType) : `${patternsFolder}${config.defaultPatternType}`;
          const patternSubtype = pjson.patternSubtype ? pjson.patternSubtype : (
            pjson.patternSubtype ? pjson.patternSubtype : config.defaultPatternSubtype
          );

          if (fs.existsSync(`${patternType}/${config.symlinkPrefix}${patternSubtype}${patternName}`)) {
            if (patternName  === ''){
              const oldName = `${patternType}/${config.symlinkPrefix}${patternSubtype}${patternName}`;
              patternName = `/${config.defaultPatternName}`;

              const newName = `${patternType}/${config.symlinkPrefix}${patternSubtype}${patternName}`;

              console.warn(`Warning: you're trying to combine two similarly named folder structures that would result in one folder overriding the other. Automatically updating the ${oldName} path to now be ${newName}.`);
            } else {
              console.warn(`Error: you're trying to combine two similarly named folder structures that would result in one folder overriding the other. Automatically updating the path of ${oldName} won't work here...`);
              return false;
            }
          }


          return vfs.src(`${pkg}/${twigPath}/`, {
              followSymlinks: false
            })
            .pipe(vfs.symlink(`${patternType}/${config.symlinkPrefix}${patternSubtype}${patternName}`));
        }
      });
    });
    done();
  }
  tasks.compile = createSymlinks;




  function cleanSymlinks(done) {
    delSymlinks([`${patternsFolder}**/*`]).then(symlinks => {
      if (symlinks.length){
        console.log('Removing the existing symlinks before trying to create any new ones:\n', symlinks.join('\n'));
      } else {
        console.log('No symlinks to delete!');
      }
      done();
    });
  }
  tasks.clean = cleanSymlinks;


  return tasks;
}
