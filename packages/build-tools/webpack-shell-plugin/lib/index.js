'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var os = require('os');

var defaultOptions = {
  onBeforeBuild: [],
  onBuildStart: [],
  onBuildEnd: [],
  onBuildExit: [],
  dev: true,
  verbose: false,
  safe: false
};

var WebpackShellPlugin = function () {
  function WebpackShellPlugin(options) {
    classCallCheck(this, WebpackShellPlugin);

    this.options = this.validateInput(this.mergeOptions(options, defaultOptions));
  }

  createClass(WebpackShellPlugin, [{
    key: 'puts',
    value: function puts(error, stdout, stderr) {
      if (error) {
        throw error;
      }
    }
  }, {
    key: 'spreadStdoutAndStdErr',
    value: function spreadStdoutAndStdErr(proc) {
      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stdout);
    }
  }, {
    key: 'serializeScript',
    value: function serializeScript(script) {
      if (typeof script === 'string') {
        var _script$split = script.split(' '),
            _script$split2 = toArray(_script$split),
            _command = _script$split2[0],
            _args = _script$split2.slice(1);

        return { command: _command, args: _args };
      }
      var command = script.command,
          args = script.args;

      return { command: command, args: args };
    }
  }, {
    key: 'handleScript',
    value: function handleScript(script) {
      if (os.platform() === 'win32' || this.options.safe) {
        this.spreadStdoutAndStdErr(exec(script, this.puts));
      } else {
        var _serializeScript = this.serializeScript(script),
            command = _serializeScript.command,
            args = _serializeScript.args;

        var proc = spawn(command, args, { stdio: 'inherit' });
        proc.on('close', this.puts);
      }
    }
  }, {
    key: 'validateInput',
    value: function validateInput(options) {
      if (typeof options.onBeforeBuild === 'string') {
        options.onBeforeBuild = options.onBeforeBuild.split('&&');
      }
      if (typeof options.onBuildStart === 'string') {
        options.onBuildStart = options.onBuildStart.split('&&');
      }
      if (typeof options.onBuildEnd === 'string') {
        options.onBuildEnd = options.onBuildEnd.split('&&');
      }
      if (typeof options.onBuildExit === 'string') {
        options.onBuildExit = options.onBuildExit.split('&&');
      }
      return options;
    }
  }, {
    key: 'mergeOptions',
    value: function mergeOptions(options, defaults) {
      for (var key in defaults) {
        if (options.hasOwnProperty(key)) {
          defaults[key] = options[key];
        }
      }
      return defaults;
    }
  }, {
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('invalid', function () {
        if (_this.options.onBeforeBuild.length) {
          console.log('Executing before build scripts');
          for (var i = 0; i < _this.options.onBeforeBuild.length; i++) {
            _this.handleScript(_this.options.onBeforeBuild[i]);
          }
        }
      });

      compiler.plugin('compilation', function (compilation) {
        if (_this.options.verbose) {
          console.log('Report compilation: ' + compilation);
          console.warn('WebpackShellPlugin [' + new Date() + ']: Verbose is being deprecated, please remove.');
        }
        if (_this.options.onBuildStart.length) {
          console.log('Executing pre-build scripts');
          for (var i = 0; i < _this.options.onBuildStart.length; i++) {
            _this.handleScript(_this.options.onBuildStart[i]);
          }
          if (_this.options.dev) {
            _this.options.onBuildStart = [];
          }
        }
      });

      compiler.plugin('after-emit', function (compilation, callback) {
        if (_this.options.onBuildEnd.length) {
          console.log('Executing post-build scripts');
          for (var i = 0; i < _this.options.onBuildEnd.length; i++) {
            _this.handleScript(_this.options.onBuildEnd[i]);
          }
          if (_this.options.dev) {
            _this.options.onBuildEnd = [];
          }
        }
        callback();
      });

      compiler.plugin('done', function () {
        if (_this.options.onBuildExit.length) {
          console.log('Executing additional scripts before exit');
          for (var i = 0; i < _this.options.onBuildExit.length; i++) {
            _this.handleScript(_this.options.onBuildExit[i]);
          }
        }
      });
    }
  }]);
  return WebpackShellPlugin;
}();

module.exports = WebpackShellPlugin;