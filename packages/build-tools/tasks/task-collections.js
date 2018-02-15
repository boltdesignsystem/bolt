const log = require('../utils/log');
const webpackTasks = require('./webpack-tasks');
const manifest = require('../utils/manifest');
const internalTasks = require('./internal-tasks');
const imageTasks = require('./image-tasks');
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
    const dirs = [config.buildDir];
    switch (config.env) {
      case 'pl':
      case 'static':
        dirs.push(config.wwwDir);
        break;
    }
    await internalTasks.clean(dirs);
  } catch (error) {
    log.errorAndExit('Clean failed', error);
  }
}

async function serve() {
  try {
    const serverTasks = [];
    if (config.wwwDir) {
      serverTasks.push(extraTasks.server.serve());
      serverTasks.push(webpackTasks.server());
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

async function build() {
  try {
    if (!config.quick) {
      await clean();
    }
    await internalTasks.mkDirs();
    await manifest.writeBoltManifest();
    await webpackTasks.compile();
    switch (config.env) {
      case 'pl':
        await manifest.writeTwigNamespaceFile(process.cwd(), config.extraTwigNamespaces);
        await extraTasks.patternLab.compile();
        break;
      case 'static':
        await extraTasks.static.compile();
        break;
    }
    await images();
  } catch (error) {
    log.errorAndExit('Build failed', error);
  }
}

async function watch() {
  try {
    const watchTasks = [
      webpackTasks.watch(),
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
  try {
    if (!config.quick) {
      await build();
    }
    return Promise.all([
      serve(),
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
