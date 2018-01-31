const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const symlink = promisify(fs.symlink);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(require('mkdirp'));
const chokidar = require('chokidar');
const chalk = require('chalk');
const log = require('../utils/log');
const globby = require('globby');
const timer = require('../utils/timer');
const ora = require('ora');
const sharp = require('sharp');
const config = require('../utils/config-store').getConfig();
const { flattenArray } = require('../utils/general');
const isProd = process.env.NODE_ENV === 'production';

// @todo Consider moving this to a place to share
const boltImageSizes = [
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

function  makeWebPath(imagePath) {
  return `/${path.relative(config.wwwDir, imagePath)}`;
}

async function writeImageManifest(imgManifest) {
  await writeFile(
    path.join(config.dataDir, 'bolt-image-manifest.json'),
    JSON.stringify(imgManifest, null, '  ')
  );
}

async function processImage(file, set) {
  if (config.verbosity > 2) {
    log.dim(`Processing image: ${file}`);
  }
  // If `set.base` is `images/` and `file` is `images/header/main.png`, then `fileId` is `header/main.png`
  const fileId = path.relative(set.base, file);
  const newPath = path.join(set.dist, fileId);
  const pathInfo = path.parse(newPath);
  // pathInfo.ext and pathInfo.name are ignored if pathInfo.base exists
  delete pathInfo.base;

  await mkdirp(pathInfo.dir);

  // We add `null` to beginning b/c we want the original file too
  const sizes = [null, ...boltImageSizes];

  // let originalFileBuffer;
  // if (isProd) {
  // }
  // we want to read the original file once, instead of reading for each size
  const originalFileBuffer = await readFile(file);
  // http://sharp.pixelplumbing.com/en/stable/api-input/#metadata
  const { width, height } = await sharp(originalFileBuffer).metadata();

  return Promise.all(sizes.map(async (size) => {
    const isOrig = size === null; // original file
    if (!isOrig) {
      // no need to resize these file extensions
      if (pathInfo.ext === '.svg' || pathInfo.ext === '.gif') {
        return;
      }
    }

    // Goes on end of filename
    const sizeSuffix = size ? `-${size}` : '';
    const thisPathInfo = Object.assign({}, pathInfo, {
      name: `${pathInfo.name}${sizeSuffix}`,
    });
    const newSizedPath = path.format(thisPathInfo);
    const newSizeWebPath = makeWebPath(newSizedPath);

    if (isProd) {
      if (isOrig) {
        await writeFile(newSizedPath, originalFileBuffer);
      } else {
        // http://sharp.pixelplumbing.com/en/stable/
        await sharp(originalFileBuffer)
          .resize(size)
          .toFile(newSizedPath);
      }
    } else {
      // Not prod, so let's be quick.
      // Symlinking works even if the original file is not served
      const symlinkPath = path.relative(thisPathInfo.dir, file);
      try {
        await symlink(symlinkPath, newSizedPath);
      } catch (error) {
        // If it's the error for symlink already exists, we don't care.
        if (error.code !== 'EEXIST') {
          log.errorAndExit(`Problem when attempting to symlink ${file} to ${newSizedPath}.`, error);
        }
      }
    }

    if (!isOrig) {
      return newSizeWebPath;
    }
  })).then((resizedImagePaths) => {
    const imageMeta = {
      original: file,
      width,
      height,
      fileId,
      fullSizePath: makeWebPath(newPath),
      sizePaths: resizedImagePaths.filter(resizedImagePath => resizedImagePath), // removes `undefined` & other non-truthy values (mainly original images & non processed file types like SVG or GIF)
    };

    return imageMeta;
  });
}

async function processImages() {
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

  return Promise.all(config.images.sets.map(async (set) => {
    const imagePaths = await globby(path.join(set.base, set.glob));
    return Promise.all(imagePaths.map(imagePath => processImage(imagePath, set)));
  })).then(async (setsOfImageMetas) => {// When it's all done
    const imageMetas = flattenArray(setsOfImageMetas);
    const imageManifest = {};
    imageMetas.forEach((imageMeta) => {
      imageManifest[imageMeta.fileId] = imageMeta;
    });
    await writeImageManifest(imageManifest);

    const endMessage = chalk.green(`Processed images in ${timer.end(startTime)}`);
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
