const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const webpack = require('webpack');
const webpackServe = require('webpack-serve/package.json');
const { getConfig } = require('../../utils/config-store');

const data = {
  webpackVersion: webpack.version,
  webpackServeVersion: webpackServe.version,
  progress: [[0]],
};

const defaultOptions = {
  title: 'Development Server',
  theme: 'default',
  disableWhenValid: true,
};

const webpackServeWaitpage = (wsOptions, options) => {
  if (!wsOptions || !wsOptions.compiler)
    throw new Error(
      'webpack-serve options must be supplied as first parameter',
    );

  options = Object.assign({}, defaultOptions, options);

  const compilers = wsOptions.compiler.compilers || [wsOptions.compiler];
  for (let i = 0; i < compilers.length; i++) {
    new webpack.ProgressPlugin(function() {
      data.progress[i] = arguments;
    }).apply(compilers[i]);
  }
  let template = options.template;
  if (!template) {
    if (
      fs
        .readdirSync(__dirname)
        .filter(x => x.endsWith('.ejs'))
        .map(x => x.slice(0, -4))
        .indexOf(options.theme) < 0
    )
      throw new Error(`Unknown theme provided: ${options.theme}`);
    template = fs.readFileSync(
      path.resolve(__dirname, options.theme + '.ejs'),
      'utf8',
    );
  }
  Object.keys(options).forEach(key => {
    // expend data with options
    data[key] = options[key];
  });

  let wasValid = false;
  return async (ctx, next) => {
    const valid = data.progress.every(p => p[0] === 1);
    wasValid = wasValid || valid;

    if (
      valid || // already valid
      (options.disableWhenValid && wasValid) || // if after valid state should be disabled
      ctx.method !== 'GET' || // request is not a browser GET
      ctx.body != null ||
      ctx.status !== 404
    ) {
      // redirect if redirectPath is set + a special header isn't set so we can avoid infinite redirects
      if (!ctx.request.header[options.proxyHeader] && options.redirectPath) {
        ctx.redirect(options.redirectPath);
      } else {
        return await next();
      }
    }
    ctx.type = 'html';
    ctx.body = ejs.render(template, data);
  };
};

module.exports = webpackServeWaitpage;
