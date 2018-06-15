const log = require('../utils/log');
const path = require('path');
const webpackTasks = require('./webpack-tasks');
const manifest = require('../utils/manifest');
const internalTasks = require('./internal-tasks');
const imageTasks = require('./image-tasks');
const timer = require('../utils/timer');
const config = require('../utils/config-store').getConfig();

// These tasks are present based on optional conditions like `config.env` and should only be `require`-ed when it's the right env due to each file's setup where it tries to grab specific files - and of course the tasks should only run in the correct `env` as well.
const extraTasks = {};
switch (config.env) {
  case 'pl':
    extraTasks.patternLab = require('./pattern-lab-tasks');
    break;
  case 'static':
    extraTasks.static = require('./static-tasks');
    break;
}

if (config.wwwDir) {
  extraTasks.server = require('./server-tasks');
}

async function clean() {
  try {
    let dirs = [];
    switch (config.env) {
      case 'static':
        // If we have a pattern lab site built in a static site, like this folder structure:
        // - www/
        //   - build/
        //   - docs/
        //   - pattern-lab/
        //     - build/
        // We need to be careful; we want to delete everything in there but a `pattern-lab` folder (yes, that's a hard coded magic string that'll we'll have to update if we change `publicDir` in `config.yml` in pattern lab)
        // Also when we use `del` (our clean task), we have to explicitly ignore parent directories: https://www.npmjs.com/package/del#beware
        // On top of that, you can't do `!www/`, you must do `!www` - if you ignore a directory, it MUST NOT have a trailing slash, so we pass it through `path.resolve()` which handles that for us. That can't handle `**` though, but `path.join()` can.
        dirs = [
          path.join(path.resolve(config.wwwDir), '**'),
          `!${path.resolve(config.wwwDir)}`,
          `!${path.resolve(config.wwwDir, 'pattern-lab')}`, // @todo Remove hard-coded magic string of `pattern-lab` sub folder
          `!${path.join(path.resolve(config.wwwDir, 'pattern-lab'), '**')}`,
        ];
        break;
      case 'pl':
        dirs = [path.join(config.buildDir, '..')];
        break;
      default:
        dirs = [config.buildDir];
        break;
    }
    await internalTasks.clean(dirs);
  } catch (error) {
    log.errorAndExit('Clean failed', error);
  }
}

async function serve(buildTime) {
  try {
    const serverTasks = [];
    if (config.wwwDir) {
      serverTasks.push(extraTasks.server.serve());
      if (config.webpackDevServer) {
        serverTasks.push(webpackTasks.server(buildTime));
      }
    }
    return Promise.all(serverTasks);
  } catch (error) {
    log.errorAndExit('Serve failed', error);
  }
}

async function images() {
  try {
    await imageTasks.processImages();
  } catch (error) {
    log.errorAndExit('Images failed', error);
  }
}

async function build(returnTime = false) {
  const startTime = timer.start();
  try {
    if (!config.quick) {
      config.prod ? await clean() : '';
      await internalTasks.mkDirs();
    }
    await manifest.writeBoltManifest();
    await images();
    await webpackTasks.compile();
    await manifest.writeTwigNamespaceFile(process.cwd(), config.extraTwigNamespaces);
    switch (config.env) {
      case 'pl':
        await extraTasks.patternLab.compile();
        break;
      case 'static':
        await extraTasks.static.compile();
        break;
    }
    if (returnTime) {
      return startTime;
    } else {
      log.info(`Build completed in ${timer.end(startTime)}.`);
    }
  } catch (error) {
    log.errorAndExit('Build failed', error);
  }
}

async function watch() {
  try {
    const watchTasks = [

    ];

    switch (config.env) {
      case 'pl':
        watchTasks.push(extraTasks.patternLab.watch());
        break;
      case 'static':
        watchTasks.push(extraTasks.static.watch());
        break;
    }

    return Promise.all(watchTasks);
  } catch (error) {
    log.errorAndExit('Watch failed', error);
  }
}

async function start() {
  let buildTime;

  try {
    if (!config.quick) {
      buildTime = await build(true);
    }
    return Promise.all([
      serve(buildTime),
      watch(),
    ]);
  } catch (error) {
    log.errorAndExit('Start failed', error);
  }
}

module.exports = {
  serve,
  start,
  images,
  build,
  watch,
  clean,
};
