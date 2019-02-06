const chalk = require('chalk');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const chokidar = require('chokidar');
const del = require('del');
const debounce = require('lodash.debounce');
const Ora = require('ora');
const log = require('../utils/log');
const { getConfig } = require('../utils/config-store');
const events = require('../utils/events');
const sh = require('../utils/sh');
const { readYamlFileSync } = require('../utils/yaml');
const manifest = require('../utils/manifest');
const timer = require('../utils/timer');
const { fileExists, dirExists } = require('../utils/general');

let plSource, plPublic, consolePath;
let config;
let initialBuild = true;

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

async function plBuild(errorShouldExit) {
  config = config || (await asyncConfig());

  return new Promise(async (resolve, reject) => {
    const startCompilingPlMsg = 'Building Pattern Lab for the first time...';
    const startRecompilingPlMsg = 'Recompiling Pattern Lab...';

    const failedCompilingPlMsg = 'The initial Pattern Lab compile failed!';
    const failedRecompilingPlMsg = 'Failed to recompile Pattern Lab!';

    const endCompilingPlMsg = function(startTime) {
      return `Compiled Pattern Lab in ${chalk.bold(timer.end(startTime))}`;
    };

    const endRecompilingPlMsg = function(startTime) {
      return `Pattern Lab recompiled in ${chalk.bold(timer.end(startTime))}`;
    };

    const plSpinner = new Ora(
      chalk.blue(initialBuild ? startCompilingPlMsg : startRecompilingPlMsg),
    ).start();
    const startTime = timer.start();

    sh(
      'php',
      ['-d', 'memory_limit=4048M', consolePath, '--generate'],
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

        initialBuild = false;

        if (config.verbosity > 2) {
          console.log('---');
          console.log(output);
          console.log('===\n');
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

        initialBuild = false;

        console.log(error);
      });
  });
}

async function precompile(errorShouldExit = false) {
  config = config || (await asyncConfig());

  return new Promise(async (resolve, reject) => {
    let plSpinner;
    let startTime;

    const startCompilingPlMsg = 'Generating Pattern Lab Data...';
    const startRecompilingPlMsg = 'Regenerating Pattern Lab Data...';

    const failedCompilingPlMsg =
      'The initial Pattern Lab data generation failed!';
    const failedRecompilingPlMsg = 'Failed to regenerate Pattern Lab data!';

    const endCompilingPlMsg = function(startTime) {
      return `Generated Pattern Lab Data in ${chalk.bold(
        timer.end(startTime),
      )}`;
    };

    const endRecompilingPlMsg = function(startTime) {
      return `Pattern Lab regenerated data in ${chalk.bold(
        timer.end(startTime),
      )}`;
    };

    if (config.verbosity > 2) {
      plSpinner = new Ora(
        chalk.blue(initialBuild ? startCompilingPlMsg : startRecompilingPlMsg),
      ).start();
      startTime = timer.start();
    }

    sh(
      'php',
      ['-d', 'memory_limit=4048M', consolePath, '--generate', '--dataonly'],
      errorShouldExit,
      false,
    )
      .then(output => {
        if (config.verbosity > 2) {
          plSpinner.succeed(
            chalk.green(
              initialBuild
                ? endCompilingPlMsg(startTime)
                : endRecompilingPlMsg(startTime),
            ),
          );
        }

        // initialBuild = false;

        if (config.verbosity > 2) {
          console.log('---');
          console.log(output);
          console.log('===\n');
        }

        // events.emit('reload');
        events.emit('pl:precompiled');

        resolve(output);
      })
      .catch(error => {
        if (config.verbosity > 2) {
          plSpinner.fail(
            chalk.red(
              initialBuild ? failedCompilingPlMsg : failedRecompilingPlMsg,
            ),
          );
        }

        console.log(error);
      });
  });
}

async function compile() {
  config = config || (await asyncConfig());

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

  await plBuild(true).then(output => {
    // check if pattern lab's UIKIt assets exist -- automatically regenerate if the required assets are missing.
    if (!isPatternLabAlreadyCompiled || config.prod === true) {
      chalk.yellow('⚠️ Uh-oh. Pattern Labs UIKit is missing... Regenerating!');
      sh(
        'yarn',
        [
          '--cwd',
          path.join(process.cwd(), '../packages/uikit-workshop'),
          'run',
          'build',
        ],
        false,
        true,
      ).then(output => {
        // console.log(output);
      });
    }
  });
}

compile.description = 'Compile Pattern Lab';
compile.displayName = 'pattern-lab:compile';

// listen for api prep work to complete before re-generating PL
events.on('status-board:generated', async () => {
  return await plBuild(false);
});

async function compileWithNoExit() {
  await precompile();
}

compileWithNoExit.displayName = 'pattern-lab:compile';

async function watch() {
  config = config || (await asyncConfig());
  const dirs = await manifest.getAllDirs();

  // Used by watches
  const debouncedCompile = debounce(compileWithNoExit, config.debounceRate);

  const globPattern = `**/*.{${config.watchedExtensions.join(',')}}`;
  const watchedFiles = [
    path.join(__dirname, 'api-tasks/**/*.js'),
    dirs.map(dir => path.join(dir, globPattern)),
    path.join(plSource, globPattern),
    path.join(config.dataDir, '**/*'),
    `!${path.join(config.dataDir, 'sassdoc.bolt.json')}`,
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
    ignored: ['**/node_modules/**', '**/vendor/**'],
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

module.exports = {
  compile,
  precompile,
  compileWithNoExit,
  watch,
};
