// const exec = require('child_process').exec;
// const merge = require('merge').recursive;
// const notifier = require('node-notifier');
// const yaml = require('js-yaml');
// const fs = require('fs');

const events = require('./events');
const utils = require('./utils');
const notify = require('./notifier');

/**
 * Show Tasks from a Plugin along with Description.
 * @param {object} tasks - Tasks object returned from plugin.
 */
function showTasks(tasks) {
  const taskList = Object.keys(tasks);
  if (taskList.length) {
    taskList.forEach((task) => {
      process.stdout.write(`Task Name: '${task}'`);
      if (tasks[task].description) {
        process.stdout.write(` - Description: ${tasks[task].description}`);
      }
      process.stdout.write('\n');
    });
  } else {
    process.stdout.write('No tasks available.\n');
  }
}

module.exports = {
  events,
  utils,
  notify,
  showTasks
};
