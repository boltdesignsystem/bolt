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
const prettier = require('prettier');

let initialBuild = true;

const startBuildingIconsMsg = 'Generating the Bolt Element Icon JSON schema...';
const startRebuildingIconsMsg =
  'Regenerating the Bolt Element Icon JSON schema...';

const finishedBuildingIconsMsg =
  'Finished generating the Bolt Element Icon schema!';
const finishedRebuildingIconsMsg =
  'Finished regenerating the Bolt Element Icon schema!';

const failedBuildingIconsMsg =
  'Initially generating the Bolt Element Icon schema failed!';
const failedRebuildingIconsMsg =
  'Failed to regenerate the Bolt Element Icon schema!';

// update bolt-icon element schema with newest icons from the local svgs folder
async function generateElementSchemaFile() {
  const config = await getConfig();
  const getElementNames = iconPath => {
    let svgs = [];
    const svgFiles = fs.readdirSync(iconPath);
    svgFiles.forEach(svg => {
      if (path.extname(svg) === '.twig') {
        const svgName = svg.split('.twig');
        svgs.push(svgName[0]);
      }
    });
    return svgs;
  };
  const iconElementDir = path.dirname(
    resolve.sync('@bolt/elements-icon/package.json'),
  );
  const elementSchema = path.join(iconElementDir, 'icon.schema.json');
  const schema = await fs.readJson(elementSchema);
  const iconElementIcons = path.join(iconElementDir, '/src/icons');
  const elementNames = getElementNames(iconElementIcons);
  schema.properties.name.enum = elementNames;
  const formattedSchema = prettier.format(JSON.stringify(schema), {
    parser: 'json',
  });
  await fs.writeFile(elementSchema, formattedSchema);

  // generate `element-icons.bolt.json` file with newest icons array
  await fs.writeFile(
    path.join(config.dataDir, 'element-icons.bolt.json'),
    JSON.stringify(elementNames, null, 4),
  );
}

async function build() {
  const iconSpinner = new Ora(
    chalk.blue(initialBuild ? startBuildingIconsMsg : startRebuildingIconsMsg),
  ).start();

  try {
    await generateElementSchemaFile();
    iconSpinner.succeed(
      chalk.green(
        initialBuild ? finishedBuildingIconsMsg : finishedRebuildingIconsMsg,
      ),
    );
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

async function watch() {
  const config = await getConfig();

  // Used by watches
  const debouncedCompile = debounce(build, config.debounceRate);

  // Revist this!
  const watchedFiles = await iconGenerator.getIconSourcePaths(
    '@bolt/elements-icon',
    '.twig',
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

watch.description = 'Watch and rebuild Bolt Element Icons';
watch.displayName = 'icons:watch';

module.exports = {
  build,
  watch,
};
