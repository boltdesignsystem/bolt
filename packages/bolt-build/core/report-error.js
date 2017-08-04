const gutil = require('gulp-util');
const notify = require('gulp-notify');
const notifier = require('node-notifier');
const open = require('open');
const { exec } = require('child_process');
const config = require('rc')('boltconfig', require('@bolt/config-global'));
const path = require('path');
const highlight = require('cli-highlight').highlight;


// const globalConfig = {}

// const nc = new notifier.NotificationCenter();

const actionLabel = 'View File';

function reportError(error) {
    // [log]

  const checkWhichAppToOpen = function (error) {
    if (config.editor === 'atom') {
      return `atm://open?url=file://${error.file}&line=${error.line}&column=${error.column}`;
    } else if (config.editor === 'sublime') {
      return `subl "${error.file}:${error.line}:${error.column}"`;
    }
    return false;
  };


  function openEditor(openInAppPath) {
    if (config.editor === 'atom') {
      open(openInAppPath); // Open file if not being dismissed
    } else if (config.editor === 'sublime') {
      exec(openInAppPath);
    }
  }

// ${error.line}:${error.column}

  let openInAppPath;

  if (error) {
    openInAppPath = checkWhichAppToOpen(error);
  }


    // Format and ouput the whole error object
    // console.log(error.toString());


    // ----------------------------------------------
    // Pretty error reporting

  let report = '\n';
  const chalk = gutil.colors.white.bgRed;

  if (error.plugin) {
    // report += `${chalk('PLUGIN:')} [${error.plugin}]\n`;
  }

  const message = highlight(error.message, { ignoreIllegals: true });
  if (error.message) {
    report += `${chalk('ERROR:\x20')} ${message}\n`;
  }

  console.log(message);
    // ----------------------------------------------
    // Notification

  if (error.line && error.column) {
    var notifyMessage = `Oops! Error in ${path.dirname(error.file).split(path.sep).pop() + path.sep + path.basename(error.file)} on line ${error.line}, column ${error.column}`;
  } else {
    var notifyMessage = '';
  }


  // const filePath = `atm://open?url=file://${error.file}&line=${error.line}&column=${error.column}`;


// atm://open?url=file:///Users/sghoweri/sites/bolt-styleguide/sandbox/pattern-library/node_modules/@bolt/settings-all/node_modules/@bolt/settings-breakpoints/index.scss:54
// &line=54&column=3
//
  // const command = `if ! [ -x $(command -v ${openInApp}) ]; then echo 'Error: git is not installed.' >&2 exit 1; fi`;
  //
  // exec(command, (err, stdout, stderr) => {
  //   console.log(err);
  //   console.log(stdout);
  //   console.log(stderr);
  //
  //
  // //   if (err) {
  // //   // node couldn't execute the command
  // //     return;
  // //   }
  // //
  // // // the *entire* stdout and stderr (buffered)
  // //   console.log(`stdout: ${stdout}`);
  // //   console.log(`stderr: ${stderr}`);
  // });


  // console.log(error.message);

  notifier.notify({
    title: `: ${error.plugin}`,
    message: `${notifyMessage} See console.`,
    wait: true,
    sticky: true,
    timeout: 15,
    closeLabel: 'Dismiss',
    actions: actionLabel,
    // open: `"atm://open?url=file://${error.file}&line=${error.line}&column=${error.column}"`,
    sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  // }).write(error);
  }, (error, response, metadata) => {
    if (error) throw error;

    if (metadata.activationValue !== actionLabel) {
      return; // No need to continue if being dismissed
    }


    openEditor(openInAppPath);
  });

  notifier.on('click', (notifierObject, options) => {
    openEditor(openInAppPath);
    // Triggers if `wait: true` and user clicks notification
  });


  gutil.beep(); // System beep (backup)


    // ----------------------------------------------
    // Prevent the 'watch' task from stopping

  this.emit('end');

  // console.log("Message:", options.message);
}

module.exports = {
  reportError
};
