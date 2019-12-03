const convertHrtime = require('convert-hrtime');
const prettyMs = require('pretty-ms');

function start() {
  return process.hrtime();
}

function end(startTime) {
  const diff = convertHrtime(process.hrtime(startTime));
  return prettyMs(diff.milliseconds);
}

module.exports = {
  start,
  end,
};
