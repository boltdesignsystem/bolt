module.exports = (options) => {
  const commonConfig = require('./webpack.config.release');
  const releaseConfig = Object.create(commonConfig({
    entry: {},
    output: {
      filename: '[name].min.js',
      path: `${process.cwd()}/dist/`
    }
  }));
  releaseConfig.devtool = 'sourcemap';

  return releaseConfig;
};
