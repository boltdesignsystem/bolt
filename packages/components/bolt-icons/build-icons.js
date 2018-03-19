const fs = require('fs-extra');
const globby = require('globby');
const uppercamelcase = require('uppercamelcase');
const path = require('path');
const cheerio = require('cheerio');
const prettier = require('prettier');
const SVGO = require('svgo');

const svgo = new SVGO({
  plugins: [
    {
      removeViewBox: false,
    },
    {
      removeXMLNS: true,
    },
  ],
});

const rootDir = path.join(__dirname);
const buildDir = path.join(rootDir, 'src/icons');

/**
 * Transpile Icons
 * @param {array} icons
 * @returns {Promise<[{ id, fileName, location, icon}]>} - Returns an array of objects about each icon with props: id, fileName, location, & icon
 */
async function transpileIcons(icons) {
  await fs.mkdirp(buildDir);

  return Promise.all(icons.map(async (icon) => {
    // icons.forEach(async (i) => {
    const svg = await fs.readFile(icon, 'utf-8');
    const id = path.basename(icon, '.svg').replace(/ /g, '-');

    const $ = cheerio.load(svg, {
      xmlMode: true,
    });

    const fileName = path.basename(icon).replace(/ /g, '-').replace('.svg', '.js');
    const location = path.join(buildDir, fileName);

    $('*').each((index, el) => {
      Object.keys(el.attribs).forEach((x) => {
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
  import { h } from '@bolt/core';

  export const ${uppercamelcase(id)} = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        ${
          $(optimizedSVG).toString()
            .replace('fill="#FFF"', 'fill={fgColor}')
            .replace('stroke="#FFF"', 'stroke={fgColor}')
            .replace(new RegExp(/ stroke=".*?"/, 'g'), ' stroke={bgColor}')
            .replace(new RegExp(/ fill=".*?"/, 'g'), ' fill={bgColor}')
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
  }));
}

function alphabetizeIconList(a, b) {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

async function build() {
  try {
    const iconPaths = await globby(path.join(rootDir, 'src/svgs/**/*.svg'));
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
    console.log(`Built ${iconPaths.length} icons.`);
  } catch (error) {
    console.error(error);
    console.error('Error trying to run "npm run build" for "@bolt/components-icons".');
    process.exitCode = 1;
  }
}

build();
