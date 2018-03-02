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
      removeXMLNS: true,
    },
  ],
});

const rootDir = path.join(__dirname);


let allExports = '';

async function transpileIcons(icons) {
  try {
    icons.forEach((i) => {
      const svg = fs.readFileSync(i, 'utf-8');

      svgo.optimize(svg, (result) => {
        const optimizedSVG = result.data;
        let id = path.basename(i, '.svg');
        id = id.replace(/ /g, '-');

        const $ = cheerio.load(optimizedSVG, {
          xmlMode: true,
        });


        let fileName = path.basename(i);
        fileName = fileName.replace(/ /g, '-').replace('.svg', '.js');
        const location = path.join(rootDir, 'src/icons', fileName);

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
          $(el).removeAttr('xmlns:xlink');

          if ($(el).attr('xlink:href')) {
            const xlinkHrefVal = $(el).attr('xlink:href');
            $(el).removeAttr('xlink:href');
            $(el).attr('xlinkHref', xlinkHrefVal);
          }
        });


        const element = `
    const ${uppercamelcase(id)} = ({ color, size, ...otherProps }) => {
      color = color || 'currentColor';
      size = size || '24';
      return (
        ${
          $('svg').toString()
            .replace(new RegExp('stroke="currentColor"', 'g'), 'stroke={color}')
            .replace('class="c-bolt-icon--background c-bolt-icon--circle-background"', 'class="c-bolt-icon--background c-bolt-icon--circle-background" fill="none"')
            .replace('d="M0 0h24v24H0z"', 'd="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0" class="c-bolt-icon--background c-bolt-icon--circle-background" fill="none"')
            .replace(/width=".*?"/, 'width={size}')
            .replace(/height=".*?"/, 'height={size}')
            .replace('otherProps="..."', '{...otherProps}')
          }
      )
    };
    export default ${uppercamelcase(id)}
  `;

        const component = prettier.format(element, {
          singleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          parser: 'flow',
        });

        fs.mkdirp(path.dirname(location));
        fs.outputFile(location, component, 'utf-8');


        allExports += `export ${uppercamelcase(id)} from './icons/${id}';\r\n`;
      });
    });
  } catch (err) {
    console.error(err);
  }
}


(async () => {
  const icons = await globby(path.join(rootDir, 'src/svgs/**/*.svg'));
  await fs.remove(path.join(rootDir, 'src/icons')); // Clean folder
  await fs.outputFile(path.join(rootDir, 'src', 'index.js'), '', 'utf-8');
  await transpileIcons(icons);
  await fs.outputFile(path.join(rootDir, 'src', 'index.js'), allExports, 'utf-8');
})();
