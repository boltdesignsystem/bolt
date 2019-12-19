const fs = require('fs-extra');
const prettier = require('prettier');
const cheerio = require('cheerio');
const uppercamelcase = require('uppercamelcase');
const globby = require('globby');
const path = require('path');
const resolve = require('resolve');
const SVGO = require('svgo');

const globPattern = '**/*.svg';

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
 * Transpile Icons
 * @param {string} outputDir
 * @param {array} icons
 * @returns {Promise<[{ id, fileName, location, icon}]>} - Returns an array of objects about each icon with props: id, fileName, location, & icon
 */
async function transpileIcons(outputDir, icons) {
  await fs.mkdirp(outputDir);

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
      const location = path.join(outputDir, fileName);

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
      const upperCamelName = uppercamelcase(id);

      const element = `
  import * as Icons from '@bolt/components-icon/registry';
  import { h } from '@bolt/core-v3.x/renderers';

  export const ${upperCamelName} = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        ${
          fileName.includes('-color')
            ? $(optimizedSVG)
                .toString()
                .replace('viewBox', '{...otherProps} viewBox') // tack on extra props next to viewBox attribute
                .replace('d="M0 0h24v24H0z"', '')
                .replace(/ width=".*?"/, ' width={size}')
                .replace(/ height=".*?"/, ' height={size}')
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
                .replace(/ width=".*?"/, ' width={size}')
                .replace(/ height=".*?"/, ' height={size}')
                .replace('otherProps="..."', '{...otherProps}')
        }
      )
  };

  Icons.set('${id}', ${upperCamelName});
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
  return dirs.map(dir => path.join(dir, globPattern));
}

async function generate(outputPackageName, extendedIconDirs) {
  extendedIconDirs = extendedIconDirs || [];

  const packageDir = await getPackageBasePath(outputPackageName);
  const buildDir = path.join(packageDir, 'src/icons');
  const indexPath = path.join(packageDir, 'src', 'index.js');

  await fs.remove(buildDir);
  await fs.outputFile(indexPath, '', 'utf-8');

  const allIcons = await getIconSourcePaths(
    outputPackageName,
    extendedIconDirs,
  );
  const iconPaths = await globby(allIcons);

  const icons = (await transpileIcons(buildDir, iconPaths)).sort(
    alphabetizeIconList,
  ); // we alphabetize the list so multiple compiles on same set doesn't result in a change that git notices

  const allExports = icons.map(icon => `export * from './icons/${icon.id}';`); // building up `export` lines
  allExports.push('');

  await fs.outputFile(indexPath, allExports.join('\n'), 'utf-8');

  return icons;
}

module.exports = {
  generate,
  getIconSourcePaths,
};
