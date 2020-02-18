const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(require('mkdirp'));
const chokidar = require('chokidar');
const chalk = require('chalk');
const globby = require('globby');
const ora = require('ora');
const sharp = require('sharp');
const SVGO = require('svgo');
const log = require('@bolt/build-utils/log');
const timer = require('@bolt/build-utils/timer');
const { getConfig } = require('@bolt/build-utils/config-store');
const { flattenArray } = require('@bolt/build-utils/general');
const sizeOf = promisify(require('image-size'));
const cacache = require('cacache');
const cachePath = path.join(process.cwd(), './cache');
let config;

const svgo = new SVGO({
  plugins: [
    {
      removeViewBox: false,
    },
    {
      removeXMLNS: false,
    },
  ],
});

// full set of image sizes used by default unless being run on a feature-specific branch
let boltImageSizes = [
  50,
  100,
  200,
  320,
  480,
  640,
  800,
  1024,
  1366,
  1536,
  1920,
  2560,
  2880,
];

function makeWebPath(imagePath) {
  return `/${path.relative(config.wwwDir, imagePath)}`;
}

async function writeImageManifest(imgManifest) {
  config = config || (await getConfig());

  await writeFile(
    path.join(config.dataDir, 'images.bolt.json'),
    JSON.stringify(imgManifest, null, '  '),
  );
}

async function processImage(file, set, skipOptimization = false) {
  config = config || (await getConfig());

  if (config.verbosity > 3) {
    log.dim(`Processing image: ${file}`);
  }
  // If `set.base` is `images/` and `file` is `images/header/main.png`, then `fileId` is `header/main.png`
  const fileId = path.relative(set.base, file);
  const newPath = path.join(set.dist, fileId);
  const pathInfo = path.parse(newPath);
  // pathInfo.ext and pathInfo.name are ignored if pathInfo.base exists
  delete pathInfo.base;

  await mkdirp(pathInfo.dir);

  let dimensions, sizes;

  try {
    dimensions = await sizeOf(file);
  } catch (err) {
    console.error(err);
  }

  const width = dimensions.width;

  if (pathInfo.ext === '.svg') {
    sizes = [null];
  } else {
    sizes = [...boltImageSizes, null].filter(size => width >= size);
  }

  // looping through all sizes and resizing
  return Promise.all(
    sizes.map(async size => {
      // Goes on end of filename
      const sizeSuffix = size ? `-${size}` : '';
      const thisPathInfo = Object.assign({}, pathInfo, {
        name: `${pathInfo.name}${sizeSuffix}`,
      });
      const newSizedPath = path.format(thisPathInfo);
      const newSizeWebPath = makeWebPath(newSizedPath);

      if (pathInfo.ext === '.svg') {
        const svgBuffer = await readFile(file);
        const result = await svgo.optimize(svgBuffer);
        const optimizedSVG = result.data;
        await writeFile(newSizedPath, optimizedSVG);
      } else {
        // keep track of the asset's original file size + name to bust the cache
        const results = await cacache.get.info(cachePath, newSizedPath);
        const currentFileSize = await fs.statSync(file).size;
        const currentFileName = path.basename(file);

        if (
          results &&
          results.metadata &&
          results.metadata.originalFileSize === currentFileSize &&
          results.metadata.originalFileName === currentFileName
        ) {
          cacache.get
            .stream(cachePath, newSizedPath)
            .pipe(fs.createWriteStream(newSizedPath));
        } else {
          // clear cache if something already exists but doesn't match up 100%
          if (results) {
            await cacache.rm.entry(cachePath, newSizedPath);
          }

          // then resize the asset + cache the results
          sharp(file)
            .resize(size !== null ? size : width)
            .jpeg({
              quality: 80,
              progressive: true,
              optimiseScans: true,
              force: false,
            })
            .png({
              progressive: true,
              force: false,
            })
            .toBuffer()
            .then(data => {
              cacache
                .put(cachePath, newSizedPath, data, {
                  metadata: {
                    originalFileName: currentFileName,
                    originalFileSize: currentFileSize,
                  },
                })
                .then(integrity => {
                  writeFile(newSizedPath, data);
                });
            });
        }
      }

      return {
        path: newSizeWebPath,
        size: size !== null ? size : width,
      };
    }),
  ).then(resizedImagePaths => {
    // removes `undefined` & other non-truthy values (mainly original images & non processed file types like SVG or GIF)
    const sets = resizedImagePaths.filter(resizedImagePath => resizedImagePath);
    const imageMeta = {
      fileId,
      src: makeWebPath(newPath),
      sizePaths: sets,
      srcset: sets
        .map(
          set => `${set.path} ${pathInfo.ext !== '.svg' ? `${set.size}w` : ''}`,
        )
        .join(', ')
        .trim(),
    };

    return imageMeta;
  });
}

async function processImages(skipOptimization = false) {
  config = config || (await getConfig());
  if (!config.images) {
    return;
  }
  const startMessage = chalk.blue('Processing images...');
  const startTime = timer.start();
  let spinner;
  if (config.verbosity > 2) {
    console.log(startMessage);
  } else {
    spinner = ora(startMessage).start();
  }

  return Promise.all(
    config.images.sets.map(async set => {
      const imagePaths = await globby.sync(path.join(set.base, set.glob));
      return Promise.all(
        imagePaths.map(imagePath =>
          processImage(imagePath, set, skipOptimization),
        ),
      );
    }),
  ).then(async setsOfImageMetas => {
    // When it's all done
    const imageMetas = flattenArray(setsOfImageMetas);
    const imageManifest = {};
    imageMetas.forEach(imageMeta => {
      imageManifest[imageMeta.src] = imageMeta;
    });
    await writeImageManifest(imageManifest);

    const endMessage = chalk.green(
      `Processed images in ${timer.end(startTime)}`,
    );
    if (config.verbosity > 2) {
      console.log(endMessage);
    } else {
      spinner.succeed(endMessage);
    }
  });
}

module.exports = {
  processImages,
};
