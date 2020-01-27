const convertHrtime = require('convert-hrtime');
const prettyMs = require('pretty-ms');

function start() {
  return process.hrtime();
}

function end(startTime, showMilliseconds = true) {
  const diff = convertHrtime(process.hrtime(startTime));

  if (showMilliseconds){
    return prettyMs(diff.milliseconds, {
      secondsDecimalDigits: 1
    });
  } else {
    return prettyMs(diff.milliseconds, {
      secondsDecimalDigits: 0
    });
  }
}

module.exports = {
  start,
  end,
};
