// modified version of https://raw.githubusercontent.com/JetBrains/svg-mixer/master/packages/svg-transform-loader/lib/loader.js

const postsvg = require('postsvg');
const transformPlugin = require('posthtml-transform');
const { getOptions, parseQuery } = require('loader-utils');
const { stringify: stringifyQuery } = require('query-string');
const isEmpty = require('lodash.isempty');
const path = require('path');
const merge = require('merge-options');

const defaultConfig = {
  raw: true,
  transformQuery: null
};

function generateLoaderResult(content, raw = true) {
  return raw ? content : `module.exports = ${JSON.stringify(content)}`;
}

// eslint-disable-next-line func-names,consistent-return
module.exports = function (content, map) {

  if (this.version === 1 && this.cacheable) {
    this.cacheable();
  }

  const callback = this.async();

  const {
    raw,
    transformQuery,
    ...transformPluginCfg
  } = merge(defaultConfig, getOptions(this) || {});

  const query = this.resourceQuery ? parseQuery(this.resourceQuery) : null;

  const fileName = path.basename(this.resourcePath);
  let optimizedContent;

  if (fileName.includes('-color')){
    optimizedContent = content.replace('d="M0 0h24v24H0z"', '')
      .replace(/width=".*?"/, 'width={size}')
      .replace(/height=".*?"/, 'height={size}');
  } else {
    optimizedContent = content
        .replace(
          new RegExp(/ fill="(?!#fff|#FFF|#FFFFFF|none).*?"/, 'g'),
          ' fill="var(--bolt-icon-primary-color)"',
          )
        .replace(
          new RegExp(/ stroke="(?!#fff|#FFF|#FFFFFF|none).*?"/, 'g'),
          ' stroke="var(--bolt-icon-primary-color)"',
        )
        .replace(
          new RegExp(/ fill="(#fff|#FFF|#FFFFFF).*?"/, 'g'),
          ' fill="var(--bolt-icon-secondary-color)"',
        )
        .replace(
          new RegExp(/ stroke="(#fff|#FFF|#FFFFFF).*?"/, 'g'),
          ' stroke="var(--bolt-icon-secondary-color)"',
        )
        // .replace(
        //   new RegExp(/ fill="(?#fff|#FFF|#FFFFFF).*?"/, 'g'),
        //   ' fill="var(--bolt-icon-secondary-color);"',
        //   )
        // )
        // .replace('fill="#FFF"', 'fill="var(--bolt-icon-secondary-color);"')
        // .replace('fill="#FFFFFF"', 'fill="var(--bolt-icon-secondary-color);"')

        // .replace('stroke="#FFF"', 'stroke="var(--bolt-icon-secondary-color);"')
        // .replace('stroke="#FFFFFF"', 'stroke="var(--bolt-icon-secondary-color);"')f
        // .replace(new RegExp(/ stroke=".*?"/, 'g'), ' stroke={bgColor}')
        // .replace('viewBox', '{...otherProps} viewBox') // tack on extra props next to viewBox attribute
        .replace('d="M0 0h24v24H0z"', '')
        .replace(/width=".*?"/, 'width={size}')
        .replace(/height=".*?"/, 'height={size}');
        // .replace('otherProps="..."', '{...otherProps}')
  }

  // console.log(content);
  // console.log(optimizedContent);
    // ?

    // $(optimizedSVG)
    //     .toString()

  // console.log(raw);

  // const svg = content;
  // const id = path
  //   .basename(content, '.svg')
  //   .replace(/ /g, '-')
  //   .replace('.colored', '-colored');

  // const $ = cheerio.load(svg, {
  //   xmlMode: true,
  // });

  // const fileName = path
  //   .basename(content)
  //   .replace(/ /g, '-')
  //   .replace('.colored', '-colored')
  //   .replace('.svg', '.js');
  // // const location = path.join(outputDir, fileName);

  // $('*').each((index, el) => {
  //   Object.keys(el.attribs).forEach(x => {
  //     if (x === 'stroke') {
  //       $(el).attr(x, 'currentColor');
  //     }

  //     if (x === 'fill') {
  //       $(el).attr(x, 'currentColor');
  //     }
  //   });

  //   if (el.name === 'svg') {
  //     $(el).attr('otherProps', '...');
  //   }

  //   // Remove artboard rectangle that sometimes pops up in exported SVGs
  //   if ($(el).attr('id') === 'Rectangle-6') {
  //     $(el).remove();
  //   }

  //   $(el).removeAttr('xmlns:xlink');

  //   if ($(el).attr('xlink:href')) {
  //     const xlinkHrefVal = $(el).attr('xlink:href');
  //     $(el).removeAttr('xlink:href');
  //     $(el).attr('xlinkHref', xlinkHrefVal);
  //   }

  //   if ($(el).attr('xlink:href')) {
  //     const xlinkHrefVal = $(el).attr('xlink:href');
  //     $(el).removeAttr('xlink:href');
  //     $(el).attr('xlinkHref', xlinkHrefVal);
  //   }
  // });


  // const result = await svgo.optimize(svg);
  // const optimizedSVG = result.data;

  if (!query || isEmpty(query)) {
    return callback(null, generateLoaderResult(optimizedContent, raw), map);
  }

  if (typeof transformQuery === 'function') {
    transformQuery(query);
  }

  Object.keys(query).forEach(param => {
    query[param] = decodeURIComponent(query[param]);
  });

  postsvg()
    .use(transformPlugin(stringifyQuery(query), transformPluginCfg))
    .process(optimizedContent)
    .then(res => {
      callback(null, generateLoaderResult(res.svg, raw), map, {
        ast: res.tree
      });
    })
    .catch(callback);
};