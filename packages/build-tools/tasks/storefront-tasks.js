const chalk = require('chalk');
const sh = require('../utils/sh');
const childProcess = require('child_process');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const mkdirp = promisify(require('mkdirp'));
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const events = require('../utils/events');
const chokidar = require('chokidar');
const del = require('del');
const log = require('../utils/log');
const globby = require('globby');
const debounce = require('lodash.debounce');
const config = require('../utils/config-store').getConfig();
const fm = require('front-matter');
const ora = require('ora');
const marked = require('marked');
const timer = require('../utils/timer');
const manifest = require('../utils/manifest');

/**
 * Prep a JSON string for use in bash
 * @param {string} string
 * @returns {string}
 */
function escapeNestedSingleQuotes(string) {
  return string.replace(/'/g, "'\\''");
}

async function getFileInfo(file) {
  if (config.verbosity > 3) {
    log.dim(`Getting info for: ${file}`);
  }

  const distPath = path.relative(config.srcDir, file).replace('\.md', '\.html');
  const fileContents = await readFile(file, 'utf8');

  // https://www.npmjs.com/package/front-matter
  const { attributes, body, frontmatter } = fm(fileContents);

  const fileInfo = {
    srcPath: file,
    distPath,
    page: attributes,
    body: file.endsWith('.md') ? marked(body) : body,
  };

  return fileInfo;
}

async function getAllFilesInfo(files) {
  const allFilePaths = await globby(path.join(files, '**/*.{md,html}'));
  return Promise.all(allFilePaths.map(getFileInfo)).then((allInfo) => {
    if (config.verbosity > 4) {
      log.dim('All data for Storefront content files:');
      console.log(allInfo);
      log.dim('END: All data for Storefront content files.');
    }
    return allInfo;
  });
}

async function compile() {
  const startMessage = chalk.blue('Compiling Storefront...');
  const startTime = timer.start();
  let spinner;
  if (config.verbosity > 2) {
    console.log(startMessage);
  } else {
    spinner = ora(startMessage).start();
  }

  const allInfo = await getAllFilesInfo(config.srcDir);

  return Promise.all(allInfo.map(async (page) => {

    try {
      const dataArg = escapeNestedSingleQuotes(JSON.stringify(page));
      const cmd = `php index.php default.twig '${dataArg}'`;
      const output = await sh(cmd, true);

      const htmlFilePath = path.join(config.wwwDir, page.distPath);
      await mkdirp(path.dirname(htmlFilePath));
      await writeFile(htmlFilePath, output);
      if (config.verbosity > 3) {
        log.dim(`Wrote: ${htmlFilePath}`);
      }
    } catch (error) {
      log.errorAndExit('Compiling Storefront', error);
    }

  })).then(() => {
    const endMessage = chalk.green(`Compiled Storefront in ${timer.end(startTime)}`);
    if (config.verbosity > 2) {
      console.log(endMessage);
    } else {
      spinner.succeed(endMessage);
    }
  });
}

const debouncedCompile = debounce(compile, 500);

function watch() {
  const watchedFiles = [
    './templates/**/*.twig',
    './content/**/*.{md,html}',
  ];

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
      console.log('Storefront watch event: ', event, path);
    }
    debouncedCompile();
  });

}

async function clean() {
  const spinner = ora(chalk.blue('Cleaning files...')).start();
  const startTime = timer.start();
  await del([
    config.wwwDir,
  ]);
  spinner.succeed(chalk.green(`Cleaned files in ${timer.end(startTime)}`));
  return true;
}

module.exports = {
  compile,
  watch,
  clean,
};
