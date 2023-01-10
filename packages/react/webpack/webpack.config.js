const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const eslintConfig = require('./.eslintrc.json');
const data = require('./public/api/db.json');
const babelOptions = require('./.babelrc.js');
const supportedLocales = require('@bolt/react-components/Notifications/locales');

const config = {
  entry: {
    notifications: './src/',
    // 'bolt-scripts': './src/bolt-scripts.js',
    // 'notification-feed--generic': './src/generic.js',
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      middlewares.unshift(
        {
          name: 'activity-feed',
          path: '/activity-feed',
          middleware: (req, res) => {
            res.send(data['activity-feed']);
          },
        },
        {
          name: 'session-token',
          path: '/session/token',
          middleware: (req, res) => {
            res.send(data['session-token']);
          },
        },
        {
          name: 'mark-read',
          path: '/mark-read',
          middleware: (req, res) => {
            res.send({ data: 'Notification updated.', method: 'POST' });
          },
        },
      );

      return middlewares;
    },
    open: true,
    client: {
      overlay: false,
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public/lib', to: 'lib' }],
    }),
    new ESLintPlugin({
      failOnError: false,
      baseConfig: eslintConfig,
      useEslintrc: false,
    }),
    new MiniCssExtractPlugin(),
    // @see https://github.com/date-fns/date-fns/blob/master/docs/webpack.md
    new webpack.ContextReplacementPlugin(
      /^date-fns[/\\]locale$/,
      new RegExp(`\\.[/\\\\](${supportedLocales.join('|')})[/\\\\]index\\.js$`),
    ),
  ],
  // resolve: {
  // alias: {
  //   'pega-react': path.resolve(__dirname, '../../pega_react/js/src'),
  // },
  // extensions: [
  //   '.js',
  //   '.jsx',
  //   '.mjs',
  //   '.json',
  //   '.svg',
  //   '.scss',
  //   '.ts',
  //   '.tsx',
  //   '.jpg',
  // ],
  // },
};

module.exports = config;
