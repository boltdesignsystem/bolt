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

/**
 * Get data for a single page that is Markdown or HTML with Yaml front matter
 * @param {string} file - Path to source file
 * @returns {Promise<{srcPath: string, distPath: string, meta: object, body: string}>} page - Page Data
 */
async function getPage(file) {
  if (config.verbosity > 3) {
    log.dim(`Getting info for: ${file}`);
  }

  const url = path.relative(config.srcDir, file)
    .replace('\.md', '\.html')
    .split('/')
    .map(x => x.replace(/^[0-9]*-/, '')) // Removing number prefix `05-item` => `item`
    .join('/');
  const fileContents = await readFile(file, 'utf8');

  // https://www.npmjs.com/package/front-matter
  const { attributes, body, frontmatter } = fm(fileContents);

  const page = {
    srcPath: file,
    url,
    meta: attributes,
    body: file.endsWith('.md') ? marked(body) : body,
  };

  return page;
}

/**
 * Get data for all pages
 * @param {string} files - Source directory
 * @see getPage
 * @returns {Promise<object[]>} - An array of page data objects
 */
async function getPages(srcDir) {
  /** @type Array<String> */
  const allPaths = await globby(path.join(srcDir, '**/*.{md,html}'));

  return Promise.all(allPaths.map(getPage)).then((pages) => {
    if (config.verbosity > 4) {
      log.dim('All data for Static pages:');
      console.log(pages);
      log.dim('END: All data for Static pages.');
    }
    return pages;
  });
}

/**
 * Get the site data based on the pages
 * @param {object} pages
 * @returns {{pages}}
 */
function getSiteData(pages) {
  const site = {
    pages: pages.map((page) => ({
      url: page.url,
      meta: page.meta,
      // choosing not to have `page.body` in here on purpose
    })),
  };

  return site;
}

/**
 * The main event - compile the whole site
 * @returns {Promise<any[]>}
 */
async function compile(exitOnError = true) {
  const startMessage = chalk.blue('Compiling Static Site...');
  const startTime = timer.start();
  let spinner;
  if (config.verbosity > 2) {
    console.log(startMessage);
  } else {
    spinner = ora(startMessage).start();
  }

  const pages = await getPages(config.srcDir);
  const site = getSiteData(pages);

  return Promise.all(pages.map(async (page) => {
    const data = {
      page,
      site,
    };
    const dataArg = escapeNestedSingleQuotes(JSON.stringify(data));
    const layout = page.meta.layout ? page.meta.layout : 'default';
    const cmd = `php renderTwig.php ${layout}.twig '${dataArg}'`;
    const output = await sh(cmd, exitOnError, false);

    const htmlFilePath = path.join(config.wwwDir, page.url);
    await mkdirp(path.dirname(htmlFilePath));
    await writeFile(htmlFilePath, output);
    if (config.verbosity > 3) {
      log.dim(`Wrote: ${htmlFilePath}`);
    }
  })).then(() => {
    const endMessage = chalk.green(`Compiled Static Site in ${timer.end(startTime)}`);
    if (config.verbosity > 2) {
      console.log(endMessage);
    } else {
      spinner.succeed(endMessage);
    }
  }).catch((error) => {
    console.log(error);
    const endMessage = chalk.red(`Compiling Static Site failed in ${timer.end(startTime)}`);
    spinner.fail(endMessage);
  });
}

function compileWithNoExit() {
  return compile(false);
}
const debouncedCompile = debounce(compileWithNoExit, 200);

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
      console.log('Static Site watch event: ', event, path);
    }
    debouncedCompile();
  });

}

module.exports = {
  compile,
  watch,
};
