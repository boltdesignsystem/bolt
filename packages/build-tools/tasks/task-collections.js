const path = require('path');
const log = require('@bolt/build-utils/log');
const manifest = require('@bolt/build-utils/manifest');
const timer = require('@bolt/build-utils/timer');
const { getConfig } = require('@bolt/build-utils/config-store');
const events = require('@bolt/build-utils/events');
const webpackTasks = require('./webpack-tasks');
// const criticalcssTasks = require('./criticalcss-tasks');
const internalTasks = require('./internal-tasks');
const imageTasks = require('./image-tasks');
const iconTasks = require('./icon-tasks');

const { writeBoltVersions } = require('./api-tasks/bolt-versions');
const extraTasks = [];
let config;

// These tasks are present based on optional conditions like `config.env` and should only be `require`-ed when it's the right env due to each file's setup where it tries to grab specific files - and of course the tasks should only run in the correct `env` as well.
async function getExtraTasks() {
  config = config || (await getConfig());

  switch (config.env) {
    case 'pl':
      extraTasks.patternLab = require('./pattern-lab-tasks');
      break;
    case 'static':
      extraTasks.static = require('./static-tasks');
      break;
    case 'pwa':
      delete require.cache[require.resolve('./api-tasks')];
      extraTasks.api = require('./api-tasks');
      extraTasks.patternLab = require('./pattern-lab-tasks');
      extraTasks.static = require('./static-tasks');
      break;
  }

  if (config.wwwDir) {
    extraTasks.server = require('./server-tasks');
  }

  return extraTasks;
}

async function compileBasedOnEnvironment() {
  await getExtraTasks();

  const promiseTasks = [];

  switch (config.env) {
    case 'pl':
      promiseTasks.push(await extraTasks.patternLab.precompile());
      break;
    case 'static':
      promiseTasks.push(await extraTasks.static.compile());
      break;
    case 'pwa':
      promiseTasks.push(
        new Promise(async (resolve, reject) => {
          await extraTasks.static.compile();
          resolve();
        }),
      );

      promiseTasks.push(
        new Promise(async (resolve, reject) => {
          await extraTasks.patternLab.compile(true, true).then(async () => {
            await extraTasks.api.generate().then(async () => {
              await extraTasks.patternLab.precompile();
            });
            resolve();
          });
        }),
      );
  }

  return promiseTasks;
}

async function clean(cleanAll = false) {
  config = config || (await getConfig());
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
          `!${path.resolve(config.wwwDir, 'pattern-lab/styleguide')}`, // @todo Remove hard-coded magic string of `pattern-lab` sub folder
          `!${path.join(
            path.resolve(config.wwwDir, 'pattern-lab/styleguide'),
            '**',
          )}`,
        ];
        break;
      case 'pl':
        dirs = [
          path.join(config.wwwDir, 'pattern-lab/**'),
          `!${path.join(config.wwwDir, 'pattern-lab')}`, // don't delete the pl folder itself
          `!${path.join(config.wwwDir, 'pattern-lab/index.html')}`, // or pl's index.html file
          `!${path.join(config.wwwDir, 'pattern-lab/styleguide')}`, // or the pl assets
          `!${path.join(config.wwwDir, 'pattern-lab/styleguide/**')}`,
        ];
        break;
      case 'pwa':
        dirs = [
          `${path.join(
            path.resolve(config.wwwDir, 'pattern-lab/patterns'),
            '**',
          )}`,
        ];
        break;
      default:
        dirs = [config.buildDir];
        break;
    }
    if (cleanAll === true) {
      dirs = [config.wwwDir];
    }
    await internalTasks.clean(dirs);
  } catch (error) {
    log.errorAndExit('Clean failed', error);
  }
}

async function serve(buildTime = timer.start()) {
  config = config || (await getConfig());
  await getExtraTasks();

  try {
    const serverTasks = [];
    // if (config.renderingService) {
    //   serverTasks.push(extraTasks.server.phpServer());
    // }
    if (config.wwwDir) {
      if (config.webpackDevServer && config.watch !== false) {
        serverTasks.push(webpackTasks.server());
      } else if (config.webpackDevServer === false && config.watch !== false) {
        serverTasks.push(extraTasks.server.serve());
      }
    }

    return Promise.all(serverTasks);
  } catch (error) {
    log.errorAndExit('Serve failed', error);
  }
}

// async function criticalcss() {
//   try {
//     const criticalTasks = [];
//     criticalTasks.push(criticalcssTasks.build());
//     return Promise.all(criticalTasks);
//   } catch (error) {
//     log.errorAndExit('Critical CSS failed', error);
//   }
// }

async function images() {
  try {
    await imageTasks.processImages();
  } catch (error) {
    log.errorAndExit('Images failed', error);
  }
}

async function buildPrep(cleanAll = false) {
  config = config || (await getConfig());
  try {
    await getExtraTasks();
    config.prod ? await clean(cleanAll) : '';
    await internalTasks.mkDirs();
    await manifest.writeBoltManifest();
    if (
      config.env === 'pl' ||
      config.env === 'static' ||
      config.env === 'pwa'
    ) {
      await writeBoltVersions();
    }
    await manifest.writeTwigNamespaceFile();
  } catch (error) {
    log.errorAndExit('Build failed', error);
  }
}

async function build(shouldReturnTime = false) {
  const startTime = timer.start();
  config = config || (await getConfig());
  try {
    await buildPrep(startTime);

    // don't try to process / convert SVG icons if the `@bolt/components-icon` package isn't part of the build
    if (
      (config.components.global &&
        config.components.global.includes('@bolt/components-icon')) ||
      (config.components.individual &&
        config.components.individual.includes('@bolt/components-icon'))
    ) {
      await iconTasks.build();
    }

    config.prod || config.watch === false ? await webpackTasks.compile() : '';
    await images().catch(error => {
      console.log(error);
      // log.errorAndExit('Image task failed', error);
    });

    config.prod || config.watch === false
      ? await Promise.all(await compileBasedOnEnvironment())
      : '';

    await internalTasks.writeMetadata();

    if (shouldReturnTime) {
      return startTime;
    } else {
      log.info(`Build completed in ${timer.end(startTime)}.`);
    }
  } catch (error) {
    log.errorAndExit('Build failed', error);
  }
}

async function watch() {
  config = config || (await getConfig());

  try {
    const watchTasks = [];

    // if webpackDevServer isn't defined or is disabled, use webpack watch mode instead
    if (!config.webpackDevServer) {
      watchTasks.push(webpackTasks.watch());
    }

    switch (config.env) {
      case 'pl':
        watchTasks.push(extraTasks.patternLab.watch());
        break;
      case 'static':
        watchTasks.push(extraTasks.static.watch());
        break;
      case 'pwa':
        watchTasks.push(extraTasks.patternLab.watch());
        watchTasks.push(extraTasks.api.watch());
        watchTasks.push(extraTasks.static.watch());
        break;
    }

    // don't watch for SVG icon changes if the `@bolt/components-icon` package isn't part of the build
    if (
      config.components.global.includes('@bolt/components-icon') ||
      config.components.individual.includes('@bolt/components-icon')
    ) {
      watchTasks.push(iconTasks.watch());
    }

    return Promise.all(watchTasks);
  } catch (error) {
    log.errorAndExit('Watch failed', error);
  }
}

async function start() {
  let buildTime;
  config = config || (await getConfig());

  try {
    if (!config.quick) {
      buildTime = await build({
        shouldReturnTime: true,
      });
    }
    await Promise.all(await compileBasedOnEnvironment()).then(async () => {
      await watch();
      await serve(buildTime, true);
    });
  } catch (error) {
    log.errorAndExit('Start failed', error);
  }
}

module.exports = {
  serve,
  start,
  images,
  build,
  buildPrep,
  watch,
  clean,
  // criticalcss,
};
