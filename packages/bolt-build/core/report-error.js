const gutil = require('gulp-util');
const notify = require('gulp-notify');
const notifier = require('node-notifier');

function reportError(error) {
    // [log]
    // console.log(error);

    // Format and ouput the whole error object
    // console.log(error.toString());


    // ----------------------------------------------
    // Pretty error reporting

  let report = '\n';
  const chalk = gutil.colors.white.bgRed;

  if (error.plugin) {
    report += `${chalk('PLUGIN:')} [${error.plugin}]\n`;
  }

  if (error.message) {
    report += `${chalk('ERROR:\x20')} ${error.message}\n`;
  }

  // console.error(report);

    // ----------------------------------------------
    // Notification

  if (error.line && error.column) {
    var notifyMessage = `LINE ${error.line}:${error.column} -- `;
  } else {
    var notifyMessage = '';
  }


  console.log(`atm://open?url=file://${error.file}&line=${error.line}&column=${error.column}`);


  notifier.notify({
    title: `FAIL: ${error.plugin}`,
    message: `${notifyMessage}See console.`,
    open: `atm://open?url=file://${error.file}&line=${error.line}&column=${error.column}`,
    sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  // }).write(error);
  }, (error, response, metadata) => {
    console.log(response, metadata);
  });

  gutil.beep(); // System beep (backup)


    // ----------------------------------------------
    // Prevent the 'watch' task from stopping

  this.emit('end');
}

module.exports = {
  reportError
};
