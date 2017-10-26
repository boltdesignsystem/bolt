// const ManifestPlugin = require('webpack-manifest-plugin');
// const exportJson = require('node-sass-export');
// const npmSass = require('npm-sass');
// const fs = require('fs-extra');
// const WorkboxPlugin = require('workbox-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const autoprefixer = require('autoprefixer');
// const pkg = require('./package.json');
// const ConcatPlugin = require('webpack-concat-plugin');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('merge').recursive;

// const isDev = process.argv.find(arg => arg.includes('webpack-dev-server'));
// const ENV = isDev ? 'development' : 'production';
// const outputPath = isDev ? path.resolve('src') : path.resolve('./bolt-website');


// const BROWSERS = process.env.BROWSERS === 'module' ? ['last 2 Chrome versions', 'Safari 10'] : ['last 2 versions', 'not ie <= 11'];
// const IS_MODULE_BUILD = BROWSERS[0].includes('Chrome');
// const processEnv = {
//   NODE_ENV: JSON.stringify(ENV),
//   appVersion: JSON.stringify(pkg.version)
// };

// const sassDataExport = `${process.cwd()}/bolt-website/data`;
// if (!fs.existsSync(sassDataExport)) {
//   fs.mkdirp(sassDataExport);
// }

module.exports = (options) => {
  // const webpack = require('webpack');
  // const path = require('path');
  // const ExtractTextPlugin = require('extract-text-webpack-plugin');
  // // const outputPath = isDev ? resolve('src') : resolve('dist');
  // const WorkboxPlugin = require('workbox-webpack-plugin');
  
  const commonConfig = require('./webpack.config');
  const releaseConfig = Object.create(commonConfig({
    devtool: 'sourcemap'
  }));
  
  
  releaseConfig.plugins = releaseConfig.plugins.concat(
    new CleanWebpackPlugin([!process.env.cli && releaseConfig.output.path ? releaseConfig.output.path : ''], {
      verbose: true,
      root: process.cwd() // set root context to wherever webpack is getting run (globally or at the component level)
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin({
      filename: '[name].min.css?[hash]-[chunkhash]-[contenthash]-[name]',
      disable: false,
      allChunks: true
    }),
    new UglifyJSPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  );
  releaseConfig.performance = {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000
  };

  return releaseConfig;
};
