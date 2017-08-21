'use strict';

const _ = require('lodash');
const twig = require('./engine.js').renderFile;
const Fractal = require('@frctl/fractal');
const Adapter = require('@frctl/fractal').Adapter;
const utils = Fractal.utils;

class TwigAdapter extends Adapter {

  constructor(source, app, config) {
  // constructor(source, app) {
    super(null, source);

    // super(Twig, source);
    this._app = app;
    this._config = config;
    let self = this;
  }

  render(path, str, context, meta) {
    const partials = {};
    const self = this;
    meta = meta || {};

    setEnv('_self', meta.self, context);
    setEnv('_target', meta.target, context);
    setEnv('_env', meta.env, context);
    setEnv('_config', this._app.config(), context);

    _.each(this._views, function (view) {
      if (path == view.path) return;
      partials[view.handle] = view.path;
    });

    // console.log(self._config);
    //  name: meta.self ? `${self._config.handlePrefix}${meta.self.handle}` : tplPath,

    const options = {
      context: context,
      aliases: partials,
      root: this._source.fullPath,
      staticRoot: !meta.env.request && !meta._request
        ? '/'
        : utils.relUrlPath(
            '/file',
            _.get(meta.env.request || meta._request, 'path', '/'),
            { ext: '' }
          ).replace('/file', '/')
    };

    return new Promise(function (res, rej) {
      twig(path, options, function (err, html) {
        err ? rej(err) : res(html);
      });
    });
  }

}

function setEnv(key, value, context) {
  if (_.isUndefined(context[key]) && !_.isUndefined(value)) {
    context[key] = value;
  }
}

module.exports = function(config) {

  config = _.defaults(config || {}, {
    pristine: false,
    handlePrefix: '@',
    importContext: false
  });

  return {
    register(source, app) {
      const adapter = new TwigAdapter(source, app, config);

      adapter.setHandlePrefix(config.handlePrefix);

      return adapter;

      // return new TwigAdapter(source, app, config);
    }
  }

};
