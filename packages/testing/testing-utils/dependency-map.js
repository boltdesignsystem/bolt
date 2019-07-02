const globby = require('globby');
const { readFile, readJSON, readJSONSync, existsSync } = require('fs-extra');
const { join } = require('path');

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

/**
 * @typedef {Object} TwigNamespace
 * @prop {boolean} recursive
 * @prop {string[]} paths
 */

/** @type {{ [key: string]: TwigNamespace }} */
const twigNamespaces = readJSONSync(twigNamespacesManifestPath);

/**
 * @param {string} templateName i.e. `@bolt/button.twig`
 * @returns {Promise<string>} file path to template file
 */
async function getTwigFilePath(templateName) {
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
    return join(repoRoot, path, suffix);
  });

  const files = await globby(globPatterns);

  if (files.length > 1) {
    console.log({ templateName, files });
    throw new Error(
      `More than 1 possible Twig file found when looking for "${templateName}".`,
    );
  }

  if (files.length === 0) {
    console.log({ templateName, globPatterns });
    throw new Error(`No Twig files found when looking for "${templateName}".`);
  }

  return files[0];
}

/**
 * @param {string} twigFilePath i.e. `path/to/file.twig`
 * @returns {Promise<string[]>} list of other Twig files used in it via `include`, `embed`, or `extend`. i.e. `['@bolt/button.twig']`
 * @see {getTwigFilePath}
 */
async function findTwigFilesUsedInFile(twigFilePath) {
  const twigString = await readFile(twigFilePath, {
    encoding: 'utf8',
  });

  /* eslint-disable prettier/prettier */
  const twigRegex = new RegExp(
    "(?<=" + // begin lookahead assertion; these patterns must appear before and will not be included in result
      "[include|extends|embed] " + // any of these words and then a space
      "[\"|']" + // either `"` or `'`
    ")" + // end lookahead assertion
    "(.*\.twig)" // this will be captured as result. any character `.` infinite times `*` followed by a literal period `\.` and then `twig`
    , 'g'); // Regex flags - `g`: global
  /* eslint-enable prettier/prettier */

  const results = twigString.match(twigRegex);
  // if nothing found, results `null` and we want to consistently return same types, in this case, an array
  return results || [];
}

module.exports = {
  findTwigFilesUsedInFile,
  getTwigFilePath,
};
