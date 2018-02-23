const fs = require('fs');
const glob = require('glob');
const camelcase = require('camelcase');
const uppercamelcase = require('uppercamelcase');
const path = require('path');
const cheerio = require('cheerio');
const prettier = require('prettier');
const SVGO = require('svgo');
const svgo = new SVGO({
  plugins: [
    {
      removeXMLNS: true
    }
  ]
  // removeAttrs: { attrs: ['xmlns:xlink'] }
  /*{ custom config object }*/
});

const rootDir = path.join(__dirname);

glob(`${rootDir}/src/svgs/**/*.svg`, (err, icons) => {
  fs.writeFileSync(path.join(rootDir, 'src', 'index.js'), '', 'utf-8');

  let allExports = '';

  icons.forEach((i) => {
    const svg = fs.readFileSync(i, 'utf-8');

    svgo.optimize(svg, function (result) {

      const optimizedSVG = result.data;
      let id = path.basename(i, '.svg');
      id = id.replace(' ', '-');

      const $ = cheerio.load(optimizedSVG, {
        xmlMode: true,
      });

      let fileName = path.basename(i);
      fileName = fileName.replace('.svg', '.js');
      fileName = fileName.replace(' ', '-');
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
          var xlinkHrefVal = $(el).attr('xlink:href');
          $(el).removeAttr('xlink:href');
          $(el).attr('xlinkHref', xlinkHrefVal);
        }

      });


      const element = `
      // import { Preact, h } from '@bolt/core';
      const ${uppercamelcase(id)} = ({ color, size, ...otherProps }) => {
        color = color || 'currentColor';
        size = size || '24';
        return (
          ${
        $('svg').toString()
          .replace(new RegExp('stroke="currentColor"', 'g'), 'stroke={color}')
          .replace('class="c-bolt-icon--background c-bolt-icon--circle-background"', 'class="c-bolt-icon--background c-bolt-icon--circle-background" fill="none"')
          .replace('d="M0 0h24v24H0z"', 'd="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0" class="c-bolt-icon--background c-bolt-icon--circle-background" fill="none"')
          .replace('width="24"', 'width={size}')
          .replace('height="24"', 'height={size}')
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

      fs.writeFileSync(location, component, 'utf-8');

      allExports += `export ${uppercamelcase(id)} from './icons/${id}';\r\n`;

      //  .optimize(content, function (res) {
      // })
    });
  });

  fs.writeFileSync(path.join(rootDir, 'src', 'index.js'), allExports, 'utf-8');
});
