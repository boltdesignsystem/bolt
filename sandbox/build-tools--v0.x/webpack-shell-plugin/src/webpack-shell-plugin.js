const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const os = require('os');

const defaultOptions = {
  onBeforeBuild: [],
  onBuildStart: [],
  onBuildEnd: [],
  onBuildExit: [],
  dev: true,
  verbose: false,
  safe: false
};

export default class WebpackShellPlugin {
  constructor(options) {
    this.options = this.validateInput(this.mergeOptions(options, defaultOptions));
  }

  puts(error, stdout, stderr) {
    if (error) {
      throw error;
    }
  }

  spreadStdoutAndStdErr(proc) {
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stdout);
  }

  serializeScript(script) {
    if (typeof script === 'string') {
      const [command, ...args] = script.split(' ');
      return {command, args};
    }
    const {command, args} = script;
    return {command, args};
  }

  handleScript(script) {
    if (os.platform() === 'win32' || this.options.safe) {
      this.spreadStdoutAndStdErr(exec(script, this.puts));
    } else {
      const {command, args} = this.serializeScript(script);
      const proc = spawn(command, args, {stdio: 'inherit'});
      proc.on('close', this.puts);
    }
  }

  validateInput(options) {
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

  mergeOptions(options, defaults) {
    for (const key in defaults) {
      if (options.hasOwnProperty(key)) {
        defaults[key] = options[key];
      }
    }
    return defaults;
  }

  apply(compiler) {
    compiler.plugin('invalid', function () {
      if (this.options.onBeforeBuild.length) {
        console.log('Executing before build scripts');
        for (var i = 0; i < this.options.onBeforeBuild.length; i++) {
          this.handleScript(this.options.onBeforeBuild[i]);
        }
      }
    });

    compiler.plugin('compilation', (compilation) => {
      if (this.options.verbose) {
        console.log(`Report compilation: ${compilation}`);
        console.warn(`WebpackShellPlugin [${new Date()}]: Verbose is being deprecated, please remove.`);
      }
      if (this.options.onBuildStart.length) {
        console.log('Executing pre-build scripts');
        for (let i = 0; i < this.options.onBuildStart.length; i++) {
          this.handleScript(this.options.onBuildStart[i]);
        }
        if (this.options.dev) {
          this.options.onBuildStart = [];
        }
      }
    });

    compiler.plugin('after-emit', (compilation, callback) => {
      if (this.options.onBuildEnd.length) {
        console.log('Executing post-build scripts');
        for (let i = 0; i < this.options.onBuildEnd.length; i++) {
          this.handleScript(this.options.onBuildEnd[i]);
        }
        if (this.options.dev) {
          this.options.onBuildEnd = [];
        }
      }
      callback();
    });

    compiler.plugin('done', () => {
      if (this.options.onBuildExit.length) {
        console.log('Executing additional scripts before exit');
        for (let i = 0; i < this.options.onBuildExit.length; i++) {
          this.handleScript(this.options.onBuildExit[i]);
        }
      }
    });
  }
}
