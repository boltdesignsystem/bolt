const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const symlink = promisify(fs.symlink);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(require('mkdirp'));
const chokidar = require('chokidar');
const chalk = require('chalk');
const globby = require('globby');
const ora = require('ora');
const sharpImport = require('sharp');
const SVGO = require('svgo');
const { spawnSync } = require('child_process');
const log = require('@bolt/build-utils/log');
const timer = require('@bolt/build-utils/timer');
const { getConfig } = require('@bolt/build-utils/config-store');
const { flattenArray } = require('@bolt/build-utils/general');
let config, sharp;

// https://github.com/lovell/sharp/issues/1593#issuecomment-491171982
function warmupSharp(sharp) {
  return sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" /></svg>`,
      'utf-8',
    ),
  )
    .metadata()
    .then(() => sharp, () => sharp);
}

const {
  TRAVIS,
  TRAVIS_BRANCH,
  TRAVIS_PULL_REQUEST_BRANCH,
  TRAVIS_PULL_REQUEST,
} = process.env;

let branchName = 'detached-HEAD';
try {
  branchName = spawnSync('git', ['symbolic-ref', 'HEAD'], {
    encoding: 'utf8',
  })
    .stdout.replace('refs/heads/', '')
    .replace(/\//g, '-')
    .trim();
} catch (error) {
  process.exit(1);
}

if (TRAVIS === 'true') {
  if (TRAVIS_PULL_REQUEST === 'false') {
    branchName = TRAVIS_BRANCH;
  } else {
    branchName = TRAVIS_PULL_REQUEST_BRANCH;
  }
}

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

// don't resize images to all available options on feature-specific branches to speed up build times
if (
  branchName.includes('feature') === true &&
  process.env.NODE_ENV !== 'test' &&
  TRAVIS === true
) {
  boltImageSizes = [320, 640, 1024, 1920];
}

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

async function processImage(file, set) {
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

  // we want to read the original file once, instead of reading for each size
  const originalFileBuffer = await readFile(file);
  // http://sharp.pixelplumbing.com/en/stable/api-input/#metadata
  const { width, height } = await sharp(originalFileBuffer).metadata();

  // We add `null` to beginning b/c we want the original file too
  // Filter the list to not include sizes bigger than our file
  const sizes = [null, ...boltImageSizes].filter(size => width >= size);

  // looping through all sizes and resizing
  return Promise.all(
    sizes.map(async size => {
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

      if (config.prod) {
        if (isOrig) {
          if (
            pathInfo.ext === '.jpeg' ||
            pathInfo.ext === '.jpg' ||
            pathInfo.ext === '.png'
          ) {
            await sharp(originalFileBuffer)
              .resize(size)
              .jpeg({
                quality: 50,
                progressive: true,
                optimiseScans: true,
                force: false,
              })
              .png({
                progressive: true,
                force: false,
              })
              .toFile(newSizedPath);
          } else if (pathInfo.ext === '.svg') {
            const result = await svgo.optimize(originalFileBuffer);
            const optimizedSVG = result.data;
            await writeFile(newSizedPath, optimizedSVG);
          } else {
            await sharp(originalFileBuffer)
              .jpeg({
                quality: 50,
                progressive: true,
                optimiseScans: true,
                force: false,
              })
              .png({
                progressive: true,
                force: false,
              })
              .toFile(newSizedPath);
          }
        } else {
          // http://sharp.pixelplumbing.com/en/stable/
          if (
            pathInfo.ext === '.jpeg' ||
            pathInfo.ext === '.jpg' ||
            pathInfo.ext === '.png'
          ) {
            await sharp(originalFileBuffer)
              .resize(size)
              .jpeg({
                quality: 50,
                progressive: true,
                optimiseScans: true,
                force: false,
              })
              .png({
                progressive: true,
                force: false,
              })
              .toFile(newSizedPath);
          } else {
            await sharp(originalFileBuffer)
              .resize(size)
              .toFile(newSizedPath);
          }
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
            log.errorAndExit(
              `Problem when attempting to symlink ${file} to ${newSizedPath}.`,
              error,
            );
          }
        }
      }

      if (!isOrig) {
        return {
          path: newSizeWebPath,
          size,
        };
      }
    }),
  ).then(resizedImagePaths => {
    // removes `undefined` & other non-truthy values (mainly original images & non processed file types like SVG or GIF)
    const sets = resizedImagePaths.filter(resizedImagePath => resizedImagePath);
    const imageMeta = {
      original: file,
      // width,
      // height,
      fileId,
      src: makeWebPath(newPath),
      sizePaths: sets,
      srcset: sets.map(set => `${set.path} ${set.size}w`).join(', '),
    };

    return imageMeta;
  });
}

async function processImages() {
  config = config || (await getConfig());
  sharp = await warmupSharp(sharpImport);

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
      const imagePaths = await globby(path.join(set.base, set.glob));
      return Promise.all(
        imagePaths.map(imagePath => processImage(imagePath, set)),
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
