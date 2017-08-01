

const exec = require('child_process').exec;
const notifier = require('node-notifier');
const gutil = require('gulp-util');

function sh(cmd, exitOnError, cb) {
  const child = exec(cmd, {
    encoding: 'utf8',
    timeout: 1000 * 60 * 2, // 2 min; just want to make sure nothing gets detached forever.
  });
  let stdout = '';
  child.stdout.on('data', (data) => {
    stdout += data;
    process.stdout.write(data);
  });
  child.stderr.on('data', (data) => {
    process.stdout.write(data);
  });
  child.on('close', (code) => {
    if (code > 0) {
      gutil.log(`Error with code ${code} after running: ${cmd}`);
      if (exitOnError) {
        process.exit(code);
      } else {
        notifier.notify({
          title: cmd,
          message: stdout,
          sound: true
        });
      }
    }
    if (typeof cb === 'function') cb();
  });
}

module.exports = {
  sh
};
