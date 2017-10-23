const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const exportJson = require('node-sass-export');
const npmSass = require('npm-sass');
const fs = require('fs-extra');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pkg = require('./package.json');

const isDev = process.argv.find(arg => arg.includes('webpack-dev-server'));
const ENV = isDev ? 'development' : 'production';
const outputPath = isDev ? path.resolve('src') : path.resolve('dist');


const BROWSERS = process.env.BROWSERS === 'module' ? ['last 2 Chrome versions', 'Safari 10'] : ['last 2 versions', 'not ie <= 11'];
const IS_MODULE_BUILD = BROWSERS[0].includes('Chrome');
const processEnv = {
  NODE_ENV: JSON.stringify(ENV),
  appVersion: JSON.stringify(pkg.version)
};

const sassDataExport = `${process.cwd()}/bolt-website/data`;
if (!fs.existsSync(sassDataExport)) {
  fs.mkdirp(sassDataExport);
}


// const copyStatics = require('./webpack.config').copyStatics;


module.exports = (options) => {
  // const webpack = require('webpack');
  // const path = require('path');
  const commonConfig = require('./webpack.config');
  // const ExtractTextPlugin = require('extract-text-webpack-plugin');
  // // const outputPath = isDev ? resolve('src') : resolve('dist');
  // const WorkboxPlugin = require('workbox-webpack-plugin');

  const commonES6Config = Object.create(commonConfig(options));

  console.log(commonES6Config);
  // releaseConfig.devtool = 'sourcemap';

  // releaseConfig.plugins = releaseConfig.plugins.concat(
  //   new CleanWebpackPlugin([outputPath], { verbose: true }),
  //   new WorkboxPlugin({
  //     globDirectory: outputPath,
  //     globPatterns: ['**/*.{html,js,css}'],
  //     swDest: join(outputPath, 'sw.js')
  //   }),
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': '"production"'
  //   }),
  //   new ExtractTextPlugin({
  //     filename: '[name].min.css?[hash]-[chunkhash]-[contenthash]-[name]',
  //     disable: false,
  //     allChunks: true
  //   }),
  //   new webpack.optimize.UglifyJsPlugin({
  //     mangle: true,
  //     compress: true,
  //       // compress: {
  //       //   warnings: false,
  //       //   screw_ie8: true,
  //       //   conditionals: true,
  //       //   unused: true,
  //       //   comparisons: true,
  //       //   sequences: true,
  //       //   dead_code: true,
  //       //   evaluate: true,
  //       //   if_return: true,
  //       //   join_vars: true,
  //       // },
  //     output: {
  //       comments: false,
  //     },
  //   }),
  //   new webpack.NoErrorsPlugin(),
  //   new webpack.LoaderOptionsPlugin({
  //     minimize: true,
  //     debug: false
  //   }),
  //   new CopyWebpackPlugin(
  //     [].concat(copyStatics.copyWebcomponents, copyStatics.copyOthers)
  //   )
  // );
  // releaseConfig.performance = {
  //   maxAssetSize: 250000,
  //   maxEntrypointSize: 250000
  // };

  return commonES6Config;
};
