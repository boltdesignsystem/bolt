const webpackTasks = require('@bolt/build-tools/tasks/webpack-tasks');
const createWebpackConfig = require('@bolt/build-tools/create-webpack-config');
const { buildPrep } = require('@bolt/build-tools/tasks/task-collections');
const imageTasks = require('@bolt/build-tools/tasks/image-tasks');
const { getConfig } = require('@bolt/build-tools/utils/config-store');

module.exports = async function() {
  try {
    let config = await getConfig();
    await buildPrep(); // Generate folders, manifest data, etc needed for Twig renderer
    await imageTasks.processImages(); // process image fixtures used by any tests

    // don't compile anything in Webpack except for the exported JSON data from Bolt's Design Tokens
    config.components.global = ['./packages/core/styles/index.scss'];
    config.components.individual = [];

    // Disabling Sourcemaps here technically isn't REQUIRED but this might help speed things along, especially on Travis
    config.sourceMaps = false;

    const customWebpackConfig = await createWebpackConfig(config);

    await webpackTasks.compile(customWebpackConfig);
  } catch (error) {
    console.log(error);
  }
};
