const log = require('./log');

// @todo tweak, prod, and test the crap out of this

/**
 * Run tasks in a series, one after another
 * @param {function[]} tasks - An array of functions that return Promises
 */
async function series(tasks) {
  for (let task of tasks) {
    try {
      await task();
    } catch (error) {
      log.errorAndExit('Series task run failed.', error);
    }
  }
}

/**
 * Run tasks in parallel, all at the same time
 * @param {function[]} tasks - An array of functions that return Promises
 */
async function parallel(tasks) {
  try {
    const allTasks = tasks.map(task => task());
    allTasks.forEach(async (task) => {
      await task;
    });
  } catch (error) {
    log.errorAndExit('Parallel task run failed.', error);
  }
}

module.exports = {
  series,
  parallel,
};
