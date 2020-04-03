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
  transformQuery: null,
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

  const { raw, transformQuery, ...transformPluginCfg } = merge(
    defaultConfig,
    getOptions(this) || {},
  );

  const query = this.resourceQuery ? parseQuery(this.resourceQuery) : null;

  const fileName = path.basename(this.resourcePath);
  let optimizedContent;

  if (fileName.includes('-color')) {
    optimizedContent = content
      .replace('d="M0 0h24v24H0z"', '')
      .replace(/ width=".*?"/, ' width={size}')
      .replace(/ height=".*?"/, ' height={size}');
  } else {
    optimizedContent = content
      .replace(
        new RegExp(/ fill="(?!#fff|#FFF|#FFFFFF|none).*?"/, 'g'),
        ' fill="var(--bolt-theme-icon, currentColor)"',
      )
      .replace(
        new RegExp(/ stroke="(?!#fff|#FFF|#FFFFFF|none).*?"/, 'g'),
        ' stroke="var(--bolt-theme-icon, currentColor)"',
      )
      .replace(
        new RegExp(/ fill="(#fff|#FFF|#FFFFFF).*?"/, 'g'),
        ' fill="var(--bolt-theme-icon-background,var(--bolt-theme-primary-text-default, currentColor))"',
      )
      .replace(
        new RegExp(/ stroke="(#fff|#FFF|#FFFFFF).*?"/, 'g'),
        ' stroke="var(--bolt-theme-icon-background,var(--bolt-theme-primary-text-default, currentColor))"',
      )
      .replace('d="M0 0h24v24H0z"', '')
      .replace(/ width=".*?"/, ' width={size}')
      .replace(/ height=".*?"/, ' height={size}');
  }

  if (!query || isEmpty(query)) {
    return callback(null, generateLoaderResult(optimizedContent, raw), map);
  }

  if (typeof transformQuery === 'function') {
    transformQuery(query);
  }

  Object.keys(query).forEach((param) => {
    query[param] = decodeURIComponent(query[param]);
  });

  postsvg()
    .use(transformPlugin(stringifyQuery(query), transformPluginCfg))
    .process(optimizedContent)
    .then((res) => {
      callback(null, generateLoaderResult(res.svg, raw), map, {
        ast: res.tree,
      });
    })
    .catch(callback);
};
