const merge = require('merge'); // wipe out overrides, not just merge in

module.exports = (options) => {
  const commonConfig = require('./webpack.config.release');
  
  const releaseConfig = merge(commonConfig({
    sassDataExportPath: `${process.cwd()}/dist/`
  }), {
    entry: {}, // Since the CLI params will be taking care of these
    output: {
      filename: '[name].min.js',
      path: `${process.cwd()}/dist/`
    }
  });


  // var result = releaseConfig.filter(function (obj) {
  //   return obj.b == 6;
  // });

  // console.log(releaseConfig);

  return releaseConfig;
};
