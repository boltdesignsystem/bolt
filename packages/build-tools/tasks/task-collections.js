const log = require('../utils/log');
const webpackTasks = require('./webpack-tasks');
const patternLabTasks = require('./pattern-lab-tasks');
const serverTasks = require('./server-tasks');
const manifest = require('../utils/manifest');
const internalTasks = require('./internal-tasks');
const config = require('../utils/config-store').getConfig();

async function clean() {
  try {
    await patternLabTasks.clean();
  } catch (error) {
    log.errorAndExit('Clean failed', error);
  }
}

async function serve() {
  try {
    return Promise.all([
      webpackTasks.server(),
      serverTasks.serve(),
    ]);
  } catch (error) {
    log.errorAndExit('Serve failed', error);
  }
}

async function build() {
  try {
    if (!config.quick) {
      await clean();
    }
    await internalTasks.mkDirs();
    await manifest.writeBoltManifest();
    await manifest.writeTwigNamespaceFile(process.cwd(), config.extraTwigNamespaces);
    await webpackTasks.compile();
    await patternLabTasks.compile();
  } catch (error) {
    log.errorAndExit('Build failed', error);
  }
}

async function watch() {
  try {
    return Promise.all([
      webpackTasks.watch(),
      patternLabTasks.watch(),
    ]);
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
  build,
  watch,
  clean,
};
