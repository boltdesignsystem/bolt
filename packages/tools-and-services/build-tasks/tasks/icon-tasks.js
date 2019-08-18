const fs = require('fs-extra');
const globby = require('globby');
const uppercamelcase = require('uppercamelcase');
const path = require('path');
const cheerio = require('cheerio');
const prettier = require('prettier');
const SVGO = require('svgo');
const yaml = require('js-yaml');
const resolve = require('resolve');
const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const Ora = require('ora');
const chalk = require('chalk');
const { getConfig } = require('@bolt/build-utils/config-store');
const log = require('@bolt/build-utils/log');

let initialBuild = true;
let iconSpinner;

const startBuildingIconsMsg = 'Building Bolt SVG Icons for the first time...';
const startRebuildingIconsMsg = 'Rebuilding Bolt SVG Icons...';

const finishedBuildingIconsMsg = 'Finished building Bolt SVG Icons and schema!';
const finishedRebuildingIconsMsg =
  'Finished rebuilding Bolt SVG Icons and schema!';

const failedBuildingIconsMsg = 'Initial build of the Bolt SVG Icons failed!';
const failedRebuildingIconsMsg = 'Failed to rebuild Bolt SVG Icons!';

const svgo = new SVGO({
  plugins: [
    {
      removeViewBox: false,
    },
    {
      removeXMLNS: true,
    },
    {
      cleanupAttrs: true,
    },
    {
      removeDoctype: true,
    },
    {
      removeXMLProcInst: true,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      removeViewBox: false,
    },
    {
      cleanupEnableBackground: true,
    },
    {
      convertStyleToAttrs: true,
    },
    {
      convertColors: true,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: true,
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeNonInheritableGroupAttrs: true,
    },
    {
      removeUselessStrokeAndFill: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      cleanupIDs: true,
    },
    {
      cleanupNumericValues: true,
    },
    {
      moveElemsAttrsToGroup: true,
    },
    {
      moveGroupAttrsToElems: true,
    },
    {
      collapseGroups: true,
    },
    {
      removeRasterImages: false,
    },
    {
      mergePaths: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      sortAttrs: true,
    },
    {
      removeDimensions: true,
    },
  ],
});

const rootDir = path.dirname(
  resolve.sync('@bolt/components-icons/package.json'),
);
const buildDir = path.join(rootDir, 'src/icons');
const globPattern = '**/*.svg';

/**
 * Transpile Icons
 * @param {array} icons
 * @returns {Promise<[{ id, fileName, location, icon}]>} - Returns an array of objects about each icon with props: id, fileName, location, & icon
 */
async function transpileIcons(icons) {
  await fs.mkdirp(buildDir);

  return Promise.all(
    icons.map(async icon => {
      const svg = await fs.readFile(icon, 'utf-8');
      const id = path
        .basename(icon, '.svg')
        .replace(/ /g, '-')
        .replace('.colored', '-colored');

      const $ = cheerio.load(svg, {
        xmlMode: true,
      });

      const fileName = path
        .basename(icon)
        .replace(/ /g, '-')
        .replace('.colored', '-colored')
        .replace('.svg', '.js');
      const location = path.join(buildDir, fileName);

      $('*').each((index, el) => {
        Object.keys(el.attribs).forEach(x => {
          if (x === 'stroke') {
            $(el).attr(x, 'currentColor');
          }

          if (x === 'fill') {
            $(el).attr(x, 'currentColor');
          }
        });

        if (el.name === 'svg') {
          $(el).attr('otherProps', '...');
        }

        // Remove artboard rectangle that sometimes pops up in exported SVGs
        if ($(el).attr('id') === 'Rectangle-6') {
          $(el).remove();
        }

        $(el).removeAttr('xmlns:xlink');

        if ($(el).attr('xlink:href')) {
          const xlinkHrefVal = $(el).attr('xlink:href');
          $(el).removeAttr('xlink:href');
          $(el).attr('xlinkHref', xlinkHrefVal);
        }

        if ($(el).attr('xlink:href')) {
          const xlinkHrefVal = $(el).attr('xlink:href');
          $(el).removeAttr('xlink:href');
          $(el).attr('xlinkHref', xlinkHrefVal);
        }
      });

      const result = await svgo.optimize(svg);
      const optimizedSVG = result.data;

      const element = `
  import { h } from '@bolt/core/renderers';

  export const ${uppercamelcase(
    id,
  )} = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        ${
          fileName.includes('-color')
            ? $(optimizedSVG)
                .toString()
                .replace('viewBox', '{...otherProps} viewBox') // tack on extra props next to viewBox attribute
                .replace('d="M0 0h24v24H0z"', '')
                .replace(/width=".*?"/, 'width={size}')
                .replace(/height=".*?"/, 'height={size}')
                .replace('otherProps="..."', '{...otherProps}')
            : $(optimizedSVG)
                .toString()
                .replace('fill="#FFF"', 'fill={fgColor}')
                .replace('stroke="#FFF"', 'stroke={fgColor}')
                .replace(new RegExp(/ stroke=".*?"/, 'g'), ' stroke={bgColor}')
                .replace(
                  new RegExp(/ fill="(?!#fff|none).*?"/, 'g'),
                  ' fill={bgColor}',
                )
                .replace('viewBox', '{...otherProps} viewBox') // tack on extra props next to viewBox attribute
                .replace('d="M0 0h24v24H0z"', '')
                .replace(/width=".*?"/, 'width={size}')
                .replace(/height=".*?"/, 'height={size}')
                .replace('otherProps="..."', '{...otherProps}')
        }
      )
};
`;

      const component = prettier.format(element, {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'flow',
      });

      await fs.outputFile(location, component, 'utf-8');
      // Later when we call `const icons = await transpileIcons(iconPaths);` - `icons` will be an array of these objects:
      return {
        location,
        id,
        icon,
        fileName,
      };
    }),
  );
}

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

async function build() {
  try {
    const config = await getConfig();

    const extendedIconDirs = config.iconDir ? config.iconDir : [];

    const dirs = [rootDir, ...extendedIconDirs];
    const allIcons = dirs.map(dir => path.join(dir, globPattern));

    const iconPaths = await globby(allIcons);

    iconSpinner = new Ora(
      chalk.blue(
        initialBuild ? startBuildingIconsMsg : startRebuildingIconsMsg,
      ),
    ).start();

    await fs.remove(path.join(rootDir, 'src/icons')); // Clean folder
    await fs.outputFile(path.join(rootDir, 'src', 'index.js'), '', 'utf-8');

    const icons = await transpileIcons(iconPaths);
    const allExports = icons
      .sort(alphabetizeIconList) // we alphabetize the list so multiple compiles on same set doesn't result in a change that git notices
      .map(icon => `export * from './icons/${icon.id}';`); // building up `export` lines
    allExports.push(''); // Adding empty item to end of array so file has empty line at bottom to conform to `.editorconfig`

    await fs.outputFile(
      path.join(rootDir, 'src', 'index.js'),
      allExports.join('\n'),
      'utf-8',
    );
    await generateFile(icons);

    if (config.verbosity > 2) {
      log.dim(`Built ${iconPaths.length} icons.`);
    }
  } catch (error) {
    iconSpinner.fail(
      chalk.red(
        initialBuild
          ? `${failedBuildingIconsMsg} : ${error}`
          : `${failedRebuildingIconsMsg} : ${error}`,
      ),
    );

    process.exitCode = 1;
  }
}

build.description = 'Minify & convert raw SVG files to browser-friendly icons.';
build.displayName = 'icons:build';

async function generateFile(icons) {
  try {
    const config = await getConfig();
    const iconComponentDir = path.dirname(
      resolve.sync('@bolt/components-icon/package.json'),
    );
    const iconComponentSchema = path.join(iconComponentDir, 'icon.schema.yml');
    const names = icons.map(icon => icon.id);
    const schema = yaml.safeLoad(fs.readFileSync(iconComponentSchema, 'utf8'));
    schema.properties.name.enum = names;

    // update bolt-icon schema with newest icons from svgs folder
    await fs.writeFile(iconComponentSchema, yaml.safeDump(schema));
    // generate `icons.bolt.json` file with newest icons array
    await fs.writeFile(
      path.join(config.dataDir, 'icons.bolt.json'),
      JSON.stringify(names, null, 4),
    );

    iconSpinner.succeed(
      chalk.green(
        initialBuild ? finishedBuildingIconsMsg : finishedRebuildingIconsMsg,
      ),
    );

    initialBuild = false;
  } catch (error) {
    iconSpinner.fail(
      chalk.red(
        initialBuild
          ? `Error trying to generate Icon YAML document for "@bolt/components-icon". ${error}`
          : `Error trying to regenerate Icon YAML document for "@bolt/components-icon". ${error}`,
      ),
    );

    process.exitCode = 1;
  }
}

async function watch() {
  const config = await getConfig();

  // for now, only watch the main @bolt/components-icons folder for .svg file changes.
  const extendedIconDirs = config.iconDir ? config.iconDir : [];
  const dirs = [rootDir, ...extendedIconDirs];

  // Used by watches
  const debouncedCompile = debounce(build, config.debounceRate);

  const watchedFiles = dirs.map(dir => path.join(dir, globPattern));

  // The watch event ~ same engine gulp uses https://www.npmjs.com/package/chokidar
  const watcher = chokidar.watch(watchedFiles, {
    ignoreInitial: true,
    cwd: process.cwd(),
    ignored: ['**/node_modules/**', '**/vendor/**'],
  });

  // list of all events: https://www.npmjs.com/package/chokidar#methods--events
  watcher.on('all', (event, path) => {
    if (config.verbosity > 3) {
      console.log('Re-building Bolt Icon: ', event, path);
    }
    debouncedCompile();
  });
}

watch.description = 'Watch and rebuild Bolt SVG Icons';
watch.displayName = 'icons:watch';

module.exports = {
  build,
  watch,
};
