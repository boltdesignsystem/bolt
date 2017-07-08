[![PegaKit](https://img.shields.io/badge/PK-PegaKit-0092f8.svg)](http://pegakit.io/)
[![dependencies Status](https://david-dm.org/pega-digital/pegakit-build-tools/status.svg)](https://david-dm.org/pega-digital/pegakit-build-tools)

# PegaKit Build Tools
A collection of helpful front-end gulp tasks and build processes. Originally inspired by the awesome [fourkitchens/fourk-gulp](https://github.com/fourkitchens/emulsify-gulp) project.

## How to use it
* `npm i --save-dev pega-digital/pegakit-build-tools`
  * This will install the `master` branch. Please add `#tag/branchname` at the end if you need a certain branch/tag.
* Add the following to your project's gulp file (ex. gulpfile.babel.js) in the root of your project. This will pass gulp and any local configuration overrides along to the newly installed build tasks.

```
const gulp = require('gulp-help')(require('gulp'));
const _ = require('lodash');
let localConfig = {},
    webpackConfig = {};

// Attempt to load an optional local configuration file.
try {
  localConfig = require('./local.gulp-config');
}
catch (e) {}

// Attempt to load an optional local configuration file.
try {
  webpackConfig = require('./local.webpack.config.js');
}
catch (e) {}

// Load all gulp tasks.
require('pegakit-build-tools')(gulp, localConfig, webpackConfig);
```

* You'll now be able to execute any task in this repo. Run `gulp help` for more info on these tasks.


## Default Webpack configuration

The default Webpack configuration bundled has a few assumptions that can be easily overwritten and customized by adding a `local.webpack.config.js` file to the root of your project.

Here's a few default settings currently set:

1. **Default Source Path**: Any custom source code (that is, any JavaScript that isn't automatically installed  via npm and required into your project) lives inside the `source/scripts` folder. In Webpack 1.x, this is configued by the `context` setting in your webpack.config.js file.
  ```
  context: __dirname + "/../../source/scripts",
  ```
2. **Default Entry File**: There's at least one JS entry file in your project. By default, we assume the main JS entry point file is called app.js and lives in the root of your scripts folder (ex. `/source/scripts/app.js`). Additional entry files (say, for separate bundles handling Critical JS vs Non-Critical JS) can be set in Webpack 1.x in the `entry` section of your local.webpack.config.js file:
  
  Let's say we wanted to have 2 main JavaScript bundles: our main `app.js` bundle that includes any standalone JS modules we've created and a completely separate JS bundle for handling any critical logic that we want to inline on the page, `critical.js`:
  ```
  entry: {
    app: './app.js',
    critical: './critical.js'
  },
  ```
3. **Default Output Path** Any JavaScript entry points specified are individually bundled and moved to the `public/scripts` folder, tacking on .built.js to the end of the file name. For example, our `/source/scripts/app.js` file will compile to `/public/scripts/app.built.js`.
  
  In Webpack 1.x, this can be updated in the `output` section of our local.webpack.config.js file:
  ```
  output: {
    path: path.resolve('public'),
    publicPath: '/scripts/',
    filename: '[name].built.js',
    chunkFilename: '[chunkhash].bundle.js'
  },
  ```


## Roadmap
* **@TODO**: Add in ESLint default config + JS validation options
* **@TODO**: Lint existing default configs + Gulp tasks
* **@TODO**: Merge Webpack config with local Gulp config options.
* **@TODO**: Refactor gulp tasks to actually USE the local config options. The Webpack configuration / overrides work however everything else is still hard-coded in the individual build tasks themselves.
* **@TODO**: Document an example of adding additional build tasks to the default set of pre-defined tasks.
* **@TODO**: Work through ways of auto-generating the initial gulpfile + config. Possibly via Yeoman...
* **@TODO**: Document Webpack config + available options
* **@TODO**: Document high-level summary of currently available gulp tasks (ex. what you get by running `gulp help`)

<!-- In Progress -->
<!--* The gulp-config.js file is still used and most likely would be committed to the project repo. The local.gulp-config could be used to override config for your machine and should be gitignored.-->