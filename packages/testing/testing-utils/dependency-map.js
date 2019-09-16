const globby = require('globby');
const findPkg = require('find-pkg');
const { readFile, readJSON, readJSONSync, existsSync } = require('fs-extra');
const { join, dirname } = require('path');

const repoRoot = join(__dirname, '../../..');

const twigNamespacesManifestPath = join(
  repoRoot,
  'www/build/data/twig-namespaces.bolt.json',
);
if (!existsSync(twigNamespacesManifestPath)) {
  console.log(
    `Please do a build first, need to get this file: ${twigNamespacesManifestPath}`,
  );
  process.exit(1);
}

const fullConfigPath = join(repoRoot, 'www/build/data/config.bolt.json');
if (!existsSync(fullConfigPath)) {
  console.log(
    `Please do a build first, need to get this file: ${fullConfigPath}`,
  );
  process.exit(1);
}

/**
 * @typedef {Object} TwigNamespace
 * @prop {boolean} recursive
 * @prop {string[]} paths
 */

/** @type {{ [key: string]: TwigNamespace }} */
const twigNamespaces = readJSONSync(twigNamespacesManifestPath);
const { configFileUsed } = readJSONSync(fullConfigPath);
const twigNamespaceRoot = dirname(configFileUsed);

/**
 * @param {string} templateName i.e. `@bolt/button.twig`
 * @returns {Promise<string>} file path to template file
 */
async function getTwigFilePath(templateName) {
  if (!templateName.startsWith('@')) {
    throw new Error(
      `This function only resolves Twig files using namespaces (i.e. starts with "@" or "@bolt") and instead this (probably a file path) was passed in: ${templateName}`,
    );
  }
  let [namespace, ...paths] = templateName.split('/');
  namespace = namespace.replace('@', '');
  const relPath = paths.join('/');
  const namespaceConfig = twigNamespaces[namespace];
  if (!namespaceConfig) {
    throw new Error(
      `No Twig Namespace registered for "${namespace}". Looking for "${templateName}".`,
    );
  }

  const globPatterns = namespaceConfig.paths.map(path => {
    const suffix = namespaceConfig.recursive ? join('**', relPath) : relPath;
    return join(twigNamespaceRoot, path, suffix);
  });

  const files = await globby(globPatterns);

  if (files.length === 0) {
    throw new Error(`No Twig files found when looking for "${templateName}".`);
  }

  // Return the first file found that matches, which is the behavior that PHP Twig does with Namespaces
  return files[0];
}

/**
 * @param {string} twigString - Twig code as a string to parse
 * @param {Object} [opt]
 * @param {boolean} [opt.unique=true]
 * @returns {string[]} list of other Twig files used in it via `include`, `embed`, or `extend`. i.e. `['@bolt/button.twig']`
 * @see {findTwigFilesUsedInFile}
 */
function findTwigFilesUsedInString(twigString, { unique = true } = {}) {
  /* eslint-disable prettier/prettier */
  const twigRegex = new RegExp(
    "(?<=" + // begin lookahead assertion; these patterns must appear before and will not be included in result
      "(include|extends|embed) " + // any of these words and then a space
      "[\"|']" + // either `"` or `'`
    ")" + // end lookahead assertion
    "(.*\.twig)" // this will be captured as result. any character `.` infinite times `*` followed by a literal period `\.` and then `twig`
    , 'g'); // Regex flags - `g`: global
  /* eslint-enable prettier/prettier */

  let results = twigString.match(twigRegex);
  // if nothing found, results `null` and we want to consistently return same types, in this case, an array
  results = results || [];
  if (unique) {
    results = [...new Set(results)];
  }
  return (
    results
      // don't include any Yeoman generator files
      .filter(r => !r.includes('<%='))
      // don't include any dynamic file includes
      .filter(r => !r.includes('~'))
  );
}

/**
 * @param {string} twigFilePath i.e. `path/to/file.twig`
 * @param {Object} [opt]
 * @param {boolean} [opt.unique=true]
 * @returns {Promise<string[]>} list of other Twig files used in it via `include`, `embed`, or `extend`. i.e. `['@bolt/button.twig']`
 * @see {findTwigFilesUsedInString}
 */
async function findTwigFilesUsedInFile(twigFilePath, { unique = true } = {}) {
  const twigString = await readFile(twigFilePath, {
    encoding: 'utf8',
  });

  return findTwigFilesUsedInString(twigString, { unique });
}

/**
 * Get a package's name from a path to any file in the package
 * @param {string} file
 * @return {Promise<string>} name of package, i.e. '@bolt/components-band'
 */
async function getFilesPkg(file) {
  const pkgPath = await findPkg(dirname(file));
  let pkg = await readJSON(pkgPath);
  // grab parent package of package.json that are used by Yeoman `generator-*`s
  if (pkg.name.includes('<%=')) {
    const pkgPath2 = findPkg(dirname(join(pkgPath, '..')));
    pkg = await readJSON(pkgPath2);
  }
  return pkg ? pkg.name : '';
}

module.exports = {
  findTwigFilesUsedInFile,
  findTwigFilesUsedInString,
  getTwigFilePath,
  getFilesPkg,
};
