

module.exports = (options) => {
  const webpack = require('webpack');
  const path = require('path');

  const config = {
    resolve: {
      alias: {
        // modules: path.resolve(__dirname, 'src/scripts/modules/'),
        // 'critical-path': path.resolve(__dirname, 'src/scripts/critical-path/'),
        // libs: path.resolve(__dirname, 'src/scripts/libs/'),
        // jquery: 'jquery/dist/jquery.js'
      }
      // extensions: ['.js', '.jsx', '.json', '.svg']
    },
    entry: {
      // 'patternlab-pattern': `${__dirname}/src/scripts/patternlab-pattern.js`,
      // 'patternlab-viewer': `${__dirname}/src/scripts/patternlab-viewer.js`,
      'bolt-critical-path': `${process.cwd()}/packages/bolt-toolkit-ui/components/components-critical-path`,
    },
    output: {
      path: `${process.cwd()}/bolt-website/scripts/`,
      filename: '[name].min.js',
      publicPath: `${process.cwd()}/bolt-website/scripts/`
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }
      ]
    },
    devtool: 'cheap-source-map',
    performance: {
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin()
    ]
  };

  return config;
};
