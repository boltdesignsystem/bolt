
const gutil = require('gulp-util');
const through = require('through2');
const colorguard = require('colorguard');

const pluginName = 'gulp-colorguard';
const PluginError = gutil.PluginError;

const logNoCollisions = function (filePath) {
  gutil.log(gutil.colors.magenta(filePath), 'has no css color collisions');
};

module.exports = function (options) {
  options = options || {};
  const logOk = Boolean(options.logOk);
  delete options.logOk;

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }
    if (file.isStream()) {
      cb(new PluginError(pluginName, 'Streaming not supported'));
      return;
    }
    let results;
    try {
      results = colorguard.process(file.contents.toString(), options);
    } catch (err) {
      err.message = `${pluginName}: ${err.message}`;
      cb(new PluginError(pluginName, err));
      return;
    }

    if (!results || !results.collisions) {
      if (logOk) {
        logNoCollisions(file.path);
      }
    } else {
      results.collisions.forEach(function (err) {
        this.emit('error', new PluginError(pluginName, `${gutil.colors.magenta(file.path)}: ${err.message}`, {
          showStack: false
        }));
      }, this);
    }
    cb(null, file);
  });
};
