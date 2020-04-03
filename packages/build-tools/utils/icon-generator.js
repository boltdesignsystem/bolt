const globby = require('globby');
const path = require('path');
const resolve = require('resolve');

const globPattern = '**/*.svg';

function alphabetizeIconList(a, b) {
  if (a.id === b.id) {
    const iconDir = a.icon.includes('@bolt/components-icons') ? b.icon : a.icon;

    throw new TypeError(`SVG filenames must be unique but '${a.id}' is not.
  Please change filename in location: '${iconDir}'`);
  }

  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

/**
 * Aggregates Built-in SVG Icons
 * @param {string} outputDir
 * @param {array} icons
 * @returns {Promise<[{ id, fileName, location, icon}]>} - Returns an array of objects about each icon with props: id, fileName, location, & icon
 */
async function aggregateIcons(outputDir, icons) {
  // @ts-ignore
  return Promise.all(
    icons.map(async (icon) => {
      const id = path
        .basename(icon, '.svg')
        .replace(/ /g, '-')
        .replace('.colored', '-colored');

      const fileName = path
        .basename(icon)
        .replace(/ /g, '-')
        .replace('.colored', '-colored')
        .replace('.svg', '.js');
      const location = path.join(outputDir, fileName);

      return {
        location,
        id,
        icon,
        fileName,
      };
    }),
  );
}

async function getPackageBasePath(outputPackageName) {
  return path.dirname(
    await new Promise((accept, reject) => {
      resolve(`${outputPackageName}/package.json`, (err, res) => {
        err ? reject(err) : accept(res);
      });
    }),
  );
}

async function getIconSourcePaths(outputPackageName, extendedIconDirs) {
  const packageDir = await getPackageBasePath(outputPackageName);
  const dirs = [packageDir, ...extendedIconDirs];
  return dirs.map((dir) => path.join(dir, globPattern));
}

async function generate(outputPackageName, extendedIconDirs) {
  extendedIconDirs = extendedIconDirs || [];

  const packageDir = await getPackageBasePath(outputPackageName);
  const buildDir = path.join(packageDir, 'src/icons');

  const allIcons = await getIconSourcePaths(
    outputPackageName,
    extendedIconDirs,
  );
  const iconPaths = await globby(allIcons);

  const icons = (await aggregateIcons(buildDir, iconPaths)).sort(
    alphabetizeIconList,
  ); // we alphabetize the list so multiple compiles on same set doesn't result in a change that git notices

  return icons;
}

module.exports = {
  generate,
  getIconSourcePaths,
};
