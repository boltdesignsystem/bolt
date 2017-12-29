/* eslint no-unused-vars: ["error", { "args": "none" }] */
const gulp = require('gulp');
const core = require('@bolt/build-core');
const defaultConfig = require('./config.default');
const yaml = require('js-yaml');
const merge = require('merge').recursive;
// const gulpConfig = require('./defaultConfig.js');
const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');

const patternLabConfig = yaml.safeLoad(
  fs.readFileSync(defaultConfig.patternLab.configFile, 'utf8')
);

const twigNamespaces = defaultConfig.patternLab.twigNamespaces;
const patternLabRoot = path.join(defaultConfig.patternLab.configFile, '../..');
const patternLabSource = path.join(patternLabRoot, patternLabConfig.sourceDir);

const consolePath = path.join(patternLabRoot, 'core/console');
// const patternLabPublic = path.join(patternLabRoot, patternLabConfig.publicDir);


// Build Pattern Lab via CLI command -- can exit or not based on 2nd param passed in
function patternLab(done, errorShouldExit) {
  core.events.emit('pattern-lab:precompile');
    core.events.emit('reload', '**/*.html', true);
  core.notify.sh(`php -d memory_limit=1024M ${consolePath} --generate`, errorShouldExit, (err) => {
    done(err);
  });
}

// Used by watches
function compileWithNoExit(done) {
  patternLab(done, false);
}




function createTwigManifest(workingDir) {
  workingDir = workingDir || process.cwd(); // eslint-disable-line no-param-reassign
  const twigManifestConfig = {};
  twigNamespaces.sets.forEach((namespaceSet) => {
    const pathArray = namespaceSet.paths.map((pathBase) => {
      const results = globby.sync([path.join(pathBase, '**/*.twig'), '!**/node_modules/**/*'], {
        follow: true
      });

      var unorderedResults = {};

      results.forEach(function (result, index, results) {
        var originalFilename = path.basename(result);
        var filename = originalFilename
        filename = filename.replace(/\.[^/.]+$/, ""); // w/o extension

        filename = filename.replace(/^[0-9\-]+/, ''); // remove 00- prefix if it exists
        filename = filename.replace(/^\_/, ''); // remove _ prefix from start of name if it exists
        filename = filename.replace(/\-/g, '_'); // replace dashes with underscores
        filename = filename.replace(/\./g, '_'); // replace dots with underscores

        unorderedResults[filename] = {};

        unorderedResults[filename].filename = originalFilename;
        unorderedResults[filename].path = result;
        unorderedResults[filename].namespace = `@${namespaceSet.namespace}/${originalFilename}`;
      });


      const orderedResults = {};
      Object.keys(unorderedResults).sort().forEach(function (key) {
        orderedResults[key] = unorderedResults[key];
      });

      return orderedResults;
    });

    twigManifestConfig[namespaceSet.namespace] = {
      paths: core.utils.uniqueArray(core.utils.flattenArray(pathArray)),
    };
  });

  // Only return the Bolt-specific namespaces for now
  return twigManifestConfig.bolt.paths[0];
}




// Initial PL build - exits if error
function compilePatternLab() {
  function compilePatternLabTask(done, errorShouldExit) {
    patternLab(done, true);
  }
  compilePatternLabTask.description = 'Compile Pattern Lab -- Exit If Error';
  compilePatternLabTask.displayName = 'patternlab:compile';
  return compilePatternLabTask;
}
module.exports.compile = compilePatternLab;

// Recompile PL -- doesn't exit if error
function recompilePatternLab() {
  function recompilePatternLabTask(done, errorShouldExit) {
    patternLab(done, false);
  }
  recompilePatternLabTask.description = 'Recompile Pattern Lab w/ Error Handling';
  recompilePatternLabTask.displayName = 'patternlab:recompile';
  return recompilePatternLabTask;
}
module.exports.recompile = recompilePatternLab;


// Watch PL for changes
function watchPatternLab(userConfig) {
  const config = merge(defaultConfig, userConfig);

  function watchPatternLabTask() {
    const watchedExtensions = config.watchedExtensions.join(',');
    const patternLabGlob = [
      path.normalize(`${patternLabSource}/**/*.{${watchedExtensions}}`)
    ];
    //   '!**/package.json'
    // ];
    // const patternLabGlob = [
    //   path.normalize(`${patternLabSource}/**/*.{${watchedExtensions}}`),
    //   '!**/package.json'
    // ];
    const watchedSources = config.extraWatches
      ? [].concat(patternLabGlob, config.extraWatches)
      : patternLabGlob;

    gulp.watch(watchedSources, compileWithNoExit);
  }
  watchPatternLabTask.description = 'Watch and rebuild Pattern Lab';
  watchPatternLabTask.displayName = 'patternlab:watch';
  return watchPatternLabTask;
}
module.exports.watch = watchPatternLab;


// Update Twig Manifest PL references for dynamic template includes
function updateTwigManifest(userConfig) {
  const config = merge(defaultConfig, userConfig);

  function updateTwigManifestTask(done) {
    
    const twigManifestConfig = createTwigManifest(patternLabRoot);

    const newManifestFile = yaml.safeDump(twigManifestConfig, {
      noCompatMode: true
    });

    fs.writeFileSync(config.manifestFile, newManifestFile, 'utf8');

    done();
  }

  updateTwigManifestTask.description = 'Update manifest of Twig templates referenced by Pattern Lab';
  updateTwigManifestTask.displayName = 'patternlab:manifest';
  return updateTwigManifestTask;
}
module.exports.manifest = updateTwigManifest;
