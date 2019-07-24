const globby = require('globby');
const cpy = require('cpy');
const fs = require('fs');
const https = require('https');
const path = require('path');
const axios = require('axios');

const cosmiconfig = require('cosmiconfig');
const explorer = cosmiconfig('bolt');
let boltConfig;

const searchedFor = explorer.searchSync();
if (searchedFor) {
  if (searchedFor.config) {
    boltConfig = searchedFor.config;
  } else {
    console.log('.boltrc config not found');
  }
}

// downloads a copy of Bolt manifest data from the live site when a local copy cannot be found
async function downloadBoltManifestData() {
  const url = 'https://boltdesignsystem.com/build/data/full-manifest.bolt.json';

  await fs.writeFileSync(
    path.resolve(__dirname, 'data', 'full-manifest.bolt.json'),
    {},
  );
  const filePath = path.resolve(__dirname, 'data', 'full-manifest.bolt.json');
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

// default shared-config.json
const config = {
  relativeFrom: './',
  src: {
    roots: [''],
    namespaces: [
      {
        id: `bolt-data`,
        paths: ['data'],
      },
    ],
  },
  debug: true,
  alterTwigEnv: [
    {
      file: 'SetupTwigRenderer.php',
      functions: ['addBoltCoreExtensions'],
    },
  ],
  hasExtraInfoInResponses: false,
  maxConcurrency: 50,
  keepAlive: false,
  autoescape: false,
  verbose: false,
};

/**
 *
 * @param {string[]} paths
 * @returns {string[]}
 */
function convertTwigPathsToNamespacePaths(paths) {
  const results = [];

  paths.forEach(function(str, index) {
    results[index] = str.substring(0, str.lastIndexOf('/'));
  });

  return results;
}

(async () => {
  await cpy(['node_modules/@bolt/**/*.twig'], 'templates', {
    parents: true,
  });

  console.log(searchedFor);
  // pull in the full manifest data + adjust data structure
  if (searchedFor) {
    await cpy(
      [
        `${path.resolve(
          path.dirname(searchedFor.filepath),
          boltConfig.buildDir,
        )}/data/full-manifest.bolt.json`,
      ],
      './data',
    );
  }

  try {
    fs.statSync(path.resolve(__dirname, 'data'));
    // console.log('data folder exists');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdirSync(path.resolve(__dirname, 'data'));
      // console.log('data folder does not exist');
    }
  }

  try {
    fs.statSync(path.resolve(__dirname, 'data/full-manifest.bolt.json'));
    // console.log('using full-manifest.bolt.json found locally');
  } catch (err) {
    if (err.code === 'ENOENT') {
      // console.log(
      //   'cannot find a full-manifest.bolt.json file locally - downloading from boltdesignsystem.com',
      // );
      await downloadBoltManifestData();
    }
  }

  /** @type {object} */
  const fullManifest = require('./data/full-manifest.bolt.json');

  /** @type {array} */
  const components = fullManifest.components.global;

  components.forEach(component => {
    if (component.schema) {
      fullManifest.components[component.twigNamespace] = {
        schema: component.schema,
      };
    }
  });
  fs.writeFileSync(
    'data/full-manifest.bolt.json',
    JSON.stringify(fullManifest),
  );

  // all twig namespaces
  /** @type {string[]} */
  const allTwigPaths = await globby('templates/node_modules/@bolt/**/*', {
    onlyDirectories: true,
  });

  const allPaths = convertTwigPathsToNamespacePaths(allTwigPaths);

  config.src.namespaces.push({
    id: `bolt`,
    paths: allPaths,
  });

  // package-specific Twig namespaces
  const boltComponentNamespaces = await globby(
    'templates/node_modules/@bolt/*',
    {
      onlyDirectories: true,
    },
  );

  boltComponentNamespaces.forEach(namespace => {
    const componentName = namespace.substring(
      namespace.lastIndexOf('/') + 1,
      namespace.length,
    );

    let paths = globby.sync(
      `templates/node_modules/@bolt/${componentName}/**/*.twig`,
    );

    paths = convertTwigPathsToNamespacePaths(paths);

    config.src.namespaces.push({
      id: `bolt-${componentName}`,
      paths,
    });
  });

  fs.writeFileSync('data/shared-config.json', JSON.stringify(config));
})();
