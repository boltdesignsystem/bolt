const { exec } = require('child_process');
const notifier = require('node-notifier');

/**
 * Run shell command
 * @param cmd {string} - Command to run
 * @param exitOnError {boolean} - If that should exit non-zero or carry one.
 */
function sh(cmd, exitOnError) {
  return new Promise((resolve, reject) => {
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
        if (exitOnError) {
            process.stdout.write(`Error with code ${code} after running: ${cmd} \n`);
            process.exit(code);
            reject(`Error with code ${code} after running: ${cmd}`);
        } else {
          notifier.notify({
            title: cmd,
            message: stdout,
            sound: true,
          });
          reject(`Error with code ${code} after running: ${cmd}`);
        }
      }
      resolve();
    });
  });

}

module.exports = sh;
