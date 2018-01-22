const chalk = require('chalk');
const { readYamlFileSync } = require('../utils/yaml');
const sh = require('../utils/sh');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const events = require('../utils/events');
const chokidar = require('chokidar');
const del = require('del');
const debounce = require('lodash.debounce');
const log = require('../utils/log');
const { getConfig } = require('../utils/config-store');
const ora = require('ora');
const {getBoltManifest} = require('../utils/manifest');

const config = Object.assign({
  plConfigFile: 'config/config.yml',
  watchedExtensions: [
    'twig',
    'json',
    'yaml',
    'yml',
    'md',
    'png',
    'php',
  ],
  debounceRate: 1000,
}, getConfig());

const plConfig = readYamlFileSync(config.plConfigFile);
const plRoot = path.join(config.plConfigFile, '../..');
const plSource = path.join(plRoot, plConfig.sourceDir);
const plPublic = path.join(plRoot, plConfig.publicDir);
const consolePath = path.join(plRoot, 'core/console');
const timer = require('../utils/timer');

/**
 * Finds all directories that contain twig files so PL can watch them
 * We don't return an array of all Twig files b/c we don't know which ones are included in the main one. So we just watch the whole directories.
 * @returns {Array<String>}
 */
function getTwigToWatch() {
  const twigs = [];
  const {global, individual} = getBoltManifest().components;
  [global, individual].forEach((componentList) => {
    componentList.src.forEach((list) => {
      if (list.assets.twig) {
        twigs.push(path.join(list.dir, '**/*.{twig,schema.*}'));
      }
    });
  });

  return twigs;
}

/**
 * Builds info file for Twig Namespaces
 * Creates `twig-namespaces.json` in `config.dataDir` from the Bolt Manifest. That is pulled in by [Twig Namespace plugin](https://packagist.org/packages/evanlovely/plugin-twig-namespaces) in the PL config file.
 * @async
 * @returns {Promise<void>}
 */
async function makeTwigNamespaceFile() {
  const namespaces = {};
  const allDirs = [];
  const {global, individual} = getBoltManifest().components;
  [global, individual].forEach((componentList) => {
    componentList.src.forEach((component) => {
      if (component.assets.twig) {
        const dir = path.relative(plRoot, component.dir);
        namespaces[component.basicName] = {
          recursive: true,
          paths: [dir],
        };
        allDirs.push(dir);
      }
    });
  });

  const namespaceConfigFile = Object.assign({
    // Can hit anything with `@bolt`
    bolt: {
      recursive: true,
      paths: [
        plSource,
        ...allDirs,
      ],
    }
  }, namespaces, config.plTwigNamespaces || {});

  await writeFile(
    path.join(config.dataDir, 'twig-namespaces.json'),
    JSON.stringify(namespaceConfigFile, null, '  ')
  );
}

function plBuild(errorShouldExit) {
  return new Promise((resolve, reject) => {
    const plSpinner = ora(chalk.blue('Building Pattern Lab...')).start();
    const startTime = timer.start();
    // log.taskStart('build: pattern lab');
    events.emit('pattern-lab:precompile');
    sh(`php -d memory_limit=4048M ${consolePath} --generate`, errorShouldExit, false)
      .then((output) => {

        plSpinner.succeed(chalk.green(`Built Pattern Lab in ${timer.end(startTime)}`));

        if (config.verbosity > 2) {
          console.log('---');
          console.log(output);
          console.log('===\n');
        }
        // events.emit('reload'); // Temporarily disable - still testing out HMR reload approach

        resolve(output);
      })
      .catch((error) => {
        plSpinner.fail(chalk.red('Building Pattern Lab Failed'));
        console.log(error);
        // reject(error);
      });
  });
}

function compile() {
  return plBuild(true);
}

compile.description = 'Compile Pattern Lab';
compile.displayName = 'pattern-lab:compile';

function compileWithNoExit() {
  return plBuild(false);
}

compileWithNoExit.displayName = 'pattern-lab:compile';

// Used by watches
const debouncedCompile = debounce(compileWithNoExit, config.debounceRate);

function watch() {
  const watchedFiles = [
    ...getTwigToWatch(),
    path.join(plSource, `/**/*.{${config.watchedExtensions.join(',')}}`),
    path.join(config.dataDir, '*.*'),
  ];

  // @todo show this when spinners are disabled at this high of verbosity
  // if (config.verbosity > 4) {
  //   log.info('Pattern Lab is Watching:');
  //   console.log(watchedFiles);
  // }

  // The watch event ~ same engine gulp uses https://www.npmjs.com/package/chokidar
  const watcher = chokidar.watch(watchedFiles, {
    ignoreInitial: true,
    cwd: process.cwd(),
    ignore: [
      '**/node_modules/**',
      '**/vendor/**',
    ],
  });

  // list of all events: https://www.npmjs.com/package/chokidar#methods--events
  watcher.on('all', (event, path) => {
    if (config.verbosity > 3) {
      console.log('Pattern Lab watch event: ', event, path);
    }
    debouncedCompile();
  });

}

watch.description = 'Watch and rebuild Pattern Lab';
watch.displayName = 'pattern-lab:watch';

async function clean() {
  const spinner = ora(chalk.blue('Cleaning Pattern Lab files...')).start();
  const startTime = timer.start();
  await del([
    plPublic,
  ]);
  spinner.succeed(chalk.green(`Cleaned Pattern Lab files in ${timer.end(startTime)}`));
  return true;
}

module.exports = {
  compile,
  watch,
  clean,
  makeTwigNamespaceFile,
};
