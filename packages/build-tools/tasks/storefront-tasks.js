const chalk = require('chalk');
const sh = require('../utils/sh');
const childProcess = require('child_process');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const mkdirp = require('mkdirp');
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
  return Promise.all(allFilePaths.map(getFileInfo));
}

async function compile() {
  const allInfo = await getAllFilesInfo(config.srcDir);
  if (config.verbosity > 3) {
    console.log(allInfo);
  }

  allInfo.forEach(async (page) => {
    if (config.verbosity > 3) {
      log.dim(`Attempting ${page.srcPath}`);
      // console.log(page);
    }

    try {
      const dataArg = escapeNestedSingleQuotes(JSON.stringify(page));
      const cmd = `php index.php default.twig '${dataArg}'`;
      // console.log(cmd);

      const output = await sh(cmd, true);
      // console.log(output);

      const htmlFilePath = path.join(config.wwwDir, page.distPath);
      mkdirp(path.dirname(htmlFilePath));
      await writeFile(htmlFilePath, output);
    } catch (error) {
      log.errorAndExit(error);
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

module.exports = {
  compile,
  watch,
};
