[![npm version](https://badge.fury.io/js/webpack-shell-plugin.svg)](https://badge.fury.io/js/webpack-shell-plugin)
![](https://reposs.herokuapp.com/?path=1337programming/webpack-shell-plugin)
[![npm](https://img.shields.io/npm/dm/webpack-shell-plugin.svg)]()
# Webpack Shell Plugin

This plugin allows you to run any shell commands before or after webpack builds. This will work for both webpack and webpack-dev-server.

Goes great with running cron jobs, reporting tools, or tests such as selenium, protractor, phantom, ect.

## WARNING

This plugin is meant for running simple command line executions. It is not meant to be a task management tool.

## Installation

`npm install --save-dev webpack-shell-plugin`

## Setup
In `webpack.config.js`:

```js
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  ...
  ...
  plugins: [
    new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:['echo "Webpack End"']})
  ],
  ...
}
```

## Example

Insert into your webpack.config.js:

```js
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');

var plugins = [];

plugins.push(new WebpackShellPlugin({
  onBuildStart: ['echo "Starting"'],
  onBuildEnd: ['python script.py && node script.js']
}));

var config = {
  entry: {
    app: path.resolve(__dirname, 'src/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // regular webpack
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src') // dev server
  },
  plugins: plugins,
  module: {
    loaders: [
      {test: /\.js$/, loaders: 'babel'},
      {test: /\.scss$/, loader: 'style!css!scss?'},
      {test: /\.html$/, loader: 'html-loader'}
    ]
  }
}

module.exports = config;

```
Once the build finishes, a child process is spawned firing both a python and node script.

### API
* `onBeforeBuild`: array of scripts to execute before every build. **Default: [ ]**
* `onBuildStart`: array of scripts to execute on the initial build. **Default: [ ]**
* `onBuildEnd`: array of scripts to execute after files are emitted at the end of the compilation. **Default: [ ]**
* `onBuildExit`: array of scripts to execute after webpack's process is complete. *Note: this event also fires in `webpack --watch` when webpack has finished updating the bundle.* **Default: [ ]**
* `dev`: switch for development environments. This causes scripts to execute once. Useful for running HMR on webpack-dev-server or webpack watch mode. **Default: true**
* `safe`: switches script execution process from spawn to exec. If running into problems with spawn, turn this setting on. **Default: false**
* `verbose`: **DEPRECATED** enable for verbose output. **Default: false**

### Developing

If opening a pull request, create an issue describing a fix or feature. Have your pull request point to the issue by writing your commits with the issue number in the message.

Make sure you lint your code by running `npm run lint` and you can build the library by running `npm run build`.

I appreciate any feed back as well, Thanks for helping!

### Other Webpack Plugins
Also checkout our other webpack plugin [WebpackBrowserPlugin](https://github.com/1337programming/webpack-browser-plugin).

### Contributions
Yair Tavor
