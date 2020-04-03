const resolve = require('resolve');
const fs = require('fs-extra');
const path = require('path');
const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const Ora = require('ora');
const chalk = require('chalk');
const { getConfig } = require('@bolt/build-utils/config-store');
const log = require('@bolt/build-utils/log');
const iconGenerator = require('@bolt/build-utils/icon-generator');

let initialBuild = true;

const startBuildingIconsMsg = 'Generating the Bolt SVG Icon JSON schema...';
const startRebuildingIconsMsg = 'Regenerating the Bolt SVG Icon JSON schema...';

const finishedBuildingIconsMsg =
  'Finished generating the Bolt SVG Icon schema!';
const finishedRebuildingIconsMsg =
  'Finished regenerating the Bolt SVG Icon schema!';

const failedBuildingIconsMsg =
  'Initially generating the Bolt SVG Icon schema failed!';
const failedRebuildingIconsMsg =
  'Failed to regenerate the Bolt SVG Icon schema!';

async function build() {
  const iconSpinner = new Ora(
    chalk.blue(initialBuild ? startBuildingIconsMsg : startRebuildingIconsMsg),
  ).start();

  try {
    const config = await getConfig();
    const extendedIconDirs = config.iconDir ? config.iconDir : [];

    const icons = await iconGenerator.generate(
      '@bolt/components-icons',
      extendedIconDirs,
    );

    await generateSchemaFile(icons);

    iconSpinner.succeed(
      chalk.green(
        initialBuild ? finishedBuildingIconsMsg : finishedRebuildingIconsMsg,
      ),
    );

    if (config.verbosity > 2) {
      log.dim(`Built ${iconPaths.length} icons.`);
    }
  } catch (error) {
    iconSpinner.fail(
      chalk.red(
        initialBuild
          ? `${failedBuildingIconsMsg} : ${error}`
          : `${failedRebuildingIconsMsg} : ${error}`,
      ),
    );

    process.exitCode = 1;
  }
}

build.description = 'Minify & convert raw SVG files to browser-friendly icons.';
build.displayName = 'icons:build';

async function generateSchemaFile(icons) {
  const config = await getConfig();
  const iconComponentDir = path.dirname(
    resolve.sync('@bolt/components-icon/package.json'),
  );
  const iconComponentSchema = path.join(iconComponentDir, 'icon.schema.json');
  const names = icons.map((icon) => icon.id);
  const schema = await fs.readJson(iconComponentSchema);
  schema.properties.name.anyOf[0].enum = names;

  // update bolt-icon schema with newest icons from svgs folder
  await fs.writeJson(iconComponentSchema, schema, { spaces: 2 });
  // generate `icons.bolt.json` file with newest icons array
  await fs.writeFile(
    path.join(config.dataDir, 'icons.bolt.json'),
    JSON.stringify(names, null, 4),
  );
}

async function watch() {
  const config = await getConfig();

  // for now, only watch the main @bolt/components-icons folder for .svg file changes.
  const extendedIconDirs = config.iconDir ? config.iconDir : [];

  // Used by watches
  const debouncedCompile = debounce(build, config.debounceRate);

  const watchedFiles = await iconGenerator.getIconSourcePaths(
    '@bolt/components-icons',
    extendedIconDirs,
  );

  // The watch event ~ same engine gulp uses https://www.npmjs.com/package/chokidar
  const watcher = chokidar.watch(watchedFiles, {
    ignoreInitial: true,
    cwd: process.cwd(),
    ignored: ['**/node_modules/**', '**/vendor/**'],
  });

  // list of all events: https://www.npmjs.com/package/chokidar#methods--events
  watcher.on('all', (event, path) => {
    if (config.verbosity > 3) {
      console.log('Re-building Bolt Icon: ', event, path);
    }
    debouncedCompile();
  });
}

watch.description = 'Watch and rebuild Bolt SVG Icons';
watch.displayName = 'icons:watch';

module.exports = {
  build,
  watch,
};
