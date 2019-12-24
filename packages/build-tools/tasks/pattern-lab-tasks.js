const chalk = require('chalk');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const chokidar = require('chokidar');
const del = require('del');
const debounce = require('lodash.debounce');
const Ora = require('ora');
const log = require('@bolt/build-utils/log');
const { getConfig } = require('@bolt/build-utils/config-store');
const events = require('@bolt/build-utils/events');
const sh = require('@bolt/build-utils/sh');
const { readYamlFileSync } = require('@bolt/build-utils/yaml');
const manifest = require('@bolt/build-utils/manifest');
const timer = require('@bolt/build-utils/timer');
const { fileExists, dirExists } = require('@bolt/build-utils/general');
const shell = require('shelljs');

let plSource, plPublic, consolePath;
let config;
let initialBuild = true;
let isWatching = false;

async function asyncConfig() {
  if (config) {
    return config;
  } else {
    config = Object.assign(
      {
        plConfigFile: 'config/config.yml',
        watchedExtensions: ['twig', 'json', 'yaml', 'yml', 'md'],
        debounceRate: 1000,
      },
      await getConfig(),
    );

    const plConfig = readYamlFileSync(config.plConfigFile);
    const plRoot = path.join(config.plConfigFile, '../..');
    plSource = path.join(plRoot, plConfig.sourceDir);
    plPublic = path.join(plRoot, plConfig.publicDir);
    consolePath = path.join(plRoot, 'core/console');

    return config;
  }
}

async function compile(errorShouldExit, dataOnly = false) {
  config = config || (await asyncConfig());

  const plTaskName = dataOnly ? 'Pattern Lab Data' : 'Pattern Lab';

  return new Promise(async (resolve, reject) => {
    const startCompilingPlMsg = `Building ${plTaskName} for the first time...`;
    const startRecompilingPlMsg = `Recompiling ${plTaskName}...`;

    const failedCompilingPlMsg = `The initial ${plTaskName} compile failed!`;
    const failedRecompilingPlMsg = `Failed to recompile ${plTaskName}!`;

    const endCompilingPlMsg = function(startTime) {
      return `Compiled ${plTaskName} in ${chalk.bold(timer.end(startTime))}`;
    };

    const endRecompilingPlMsg = function(startTime) {
      return `${plTaskName} ${
        initialBuild ? 'compiled' : 'recompiled'
      } in ${chalk.bold(timer.end(startTime))}`;
    };

    const plSpinner = new Ora(
      chalk.blue(initialBuild ? startCompilingPlMsg : startRecompilingPlMsg),
    ).start();
    const startTime = timer.start();

    sh(
      'php',
      [
        '-d',
        'memory_limit=4048M',
        consolePath,
        '--generate',
        dataOnly ? '--dataonly' : '',
      ],
      errorShouldExit,
      false,
    )
      .then(output => {
        plSpinner.succeed(
          chalk.green(
            initialBuild
              ? endCompilingPlMsg(startTime)
              : endRecompilingPlMsg(startTime),
          ),
        );

        if (!dataOnly) {
          initialBuild = false;
        }

        if (config.verbosity > 2) {
          console.log('---');
          console.log(output);
          console.log('===\n');
        }

        if (dataOnly) {
          events.emit('build-tasks/pattern-lab:compiled-data');
        } else {
          events.emit('build-tasks/pattern-lab:compiled');
        }
        // events.emit('reload');

        resolve(output);
      })
      .catch(error => {
        plSpinner.fail(
          chalk.red(
            initialBuild ? failedCompilingPlMsg : failedRecompilingPlMsg,
          ),
        );

        if (!dataOnly) {
          initialBuild = false;
        }

        console.log(error);
        reject(error);
      });
  });
}

async function precompile() {
  config = config || (await asyncConfig());

  return new Promise(async (resolve, reject) => {
    const jsFolderExists = await dirExists(
      path.join(process.cwd(), config.wwwDir, 'pattern-lab/styleguide/js/'),
    );

    const scssFolderExists = await dirExists(
      path.join(process.cwd(), config.wwwDir, 'pattern-lab/styleguide/css/'),
    );

    const indexHtmlExists = await fileExists(
      path.join(process.cwd(), config.wwwDir, 'pattern-lab/index.html'),
    );

    const isPatternLabAlreadyCompiled =
      jsFolderExists && scssFolderExists && indexHtmlExists;

    await compile(true)
      .then(output => {
        // check if pattern lab's UIKIt assets exist -- automatically regenerate if the required assets are missing.
        if (!isPatternLabAlreadyCompiled || config.prod === true) {
          chalk.yellow(
            '⚠️ Uh-oh. Pattern Labs UIKit is missing... Regenerating!',
          );

          const result = shell.exec(
            `yarn --cwd ${path.join(
              process.cwd(),
              '../uikit-workshop',
            )} run build`,
          ).stdout;

          resolve(result);
        } else {
          resolve();
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

compile.description = 'Compile Pattern Lab';
compile.displayName = 'pattern-lab:compile';

async function compileWithNoExit() {
  await compile(true);
}

compileWithNoExit.displayName = 'pattern-lab:compile';

async function watch() {
  config = config || (await asyncConfig());
  const dirs = await manifest.getAllDirs();

  // Used by watches
  const debouncedCompile = debounce(compileWithNoExit, config.debounceRate);

  const globPattern = `**/*.{${config.watchedExtensions.join(',')}}`;
  const watchedFiles = [
    dirs.map(dir => path.join(dir, globPattern)),
    path.join(plSource, globPattern),
    path.join(config.dataDir, '**/*'),
    `!${path.join(config.dataDir, 'sassdoc.bolt.json')}`,
    `!${dirs.map(dir => path.join(dir, '**/*.schema.yml'))}`, // ignore watching schema files since the new schema file watcher below handles this
  ];

  // watch schema files for changes; regenerate the globally shared manifest data when updated
  //
  // @todo: include other data sources (like package.json) that get pulled into the global data store
  // @todo: update manifest.writeBoltManifest to only rewrite files on the filesystem when the data has ACTUALLY changed (avoid unnecessary recompiles)
  // @todo: move this entire
  const schemaFileWatcher = chokidar.watch(
    [
      dirs.map(dir => path.join(dir, `**/*.schema.yml`)),
      path.join(plSource, `**/*.schema.yml`),
      `!${path.join(config.dataDir, 'sassdoc.bolt.json')}`,
    ],
    {
      ignoreInitial: true,
      cwd: process.cwd(),
      ignored: ['**/node_modules/**', '**/vendor/**'],
    },
  );

  schemaFileWatcher.on('all', async (event, path) => {
    await manifest.writeBoltManifest();
  });
  // <!-- @todo: move this entire watch task to a separate top-level data task in the build tools (which would probably include build + watch functions)
  // right now this ^ only works when PL is running. this should run independently of PL + the Static site!

  let compileWhenReady = false;

  // listen for api prep work to complete before re-generating PL
  events.on('api-tasks/status-board:generated', async () => {
    if (isWatching === true) {
      await compileWithNoExit();
    } else {
      compileWhenReady = true;
    }
  });

  // auto-regenerate when pattern lab data emitted
  events.on('webpack-dev-server:compiled', async () => {
    if (isWatching === false) {
      isWatching = true;
    }

    if (compileWhenReady) {
      compileWhenReady = false;
      await compileWithNoExit();
    }

    const watcher = chokidar.watch(watchedFiles, {
      ignoreInitial: true,
      cwd: process.cwd(),
      ignored: ['**/node_modules/**', '**/vendor/**'],
    });

    // list of all events: https://www.npmjs.com/package/chokidar#methods--events
    watcher.on('all', (event, path) => {
      if (config.verbosity > 3) {
        console.log('Pattern Lab watch event: ', event, path);
      }
      debouncedCompile();
    });
  });
}

watch.description = 'Watch and rebuild Pattern Lab';
watch.displayName = 'pattern-lab:watch';

module.exports = {
  compile,
  precompile,
  watch,
};
