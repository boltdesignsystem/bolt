# Sass Plugin for Theme Tools

> Theme core plugins let you easily pass in configuration and get a set of Gulp-ready task functions back that have sensible defaults and work well together.

## Features

- Scss compiling via `gulp-sass` & libsass
- Sourcemaps
- [Autoprefixer](https://github.com/postcss/autoprefixer#readme)
- Documentation generation via [SassDoc](http://sassdoc.com/)
- Linting via [Stylelint](http://stylelint.io)
- Native OS Notifications for Errors

# Getting Started

## Requirements

- Gulp 4 installed with `npm install --save gulpjs/gulp#4.0`

## Install

```bash
npm install @theme-tools/plugin-sass --save
```

## Configure

The config that is passed in is merged with [`config.default.js`](config.default.js). We suggest starting with [`config.simple.js`](config.simple.js) to get started:

```bash
cp node_modules/@theme-tools/plugin-sass/config.simple.js config.sass.js
```

See [details on configuration](#configuration) below.

## Basic Setup

Add this to your `gulpfile.js`:

```js
const gulp = require('gulp');
const config = {};
config.sass = require('./config.sass.js');
const sassTasks = require('@theme-tools/plugin-sass')(config.sass);

gulp.task('sass', sassTasks.compile);
gulp.task('watch:sass', sassTasks.watch);
gulp.task('validate:sass', sassTasks.validate);
gulp.task('clean:sass', sassTasks.clean);
gulp.task('docs:sass', sassTasks.docs);
```

- See [Task Details](#tasks) below
- See [Setting up SassDoc](#setting-up-sassdoc) below
- See [Setting up Stylelint](#setting-up-stylelint) below

# Details

## Tasks

These tasks are methods inside `sassTasks` from the above code example. You can run them anyway you can run a function, though they are often ran via Gulp. All tasks take a callback function as the first and only parameter that will run when the task is done - exactly how `gulp.task()`, `gulp.parallel()`, and `gulp.series()` want.

### `sassTasks.compile()` - Compile Sass

The main task that takes Sass files and turns them into CSS files after passing them through AutoPrefixer.

### `sassTasks.validate()` - Validate Sass using Stylelint

If you have a [Stylelint config](https://stylelint.io/user-guide/configuration/) present next to your Gulpfile, then this will run that for you. Disabled by default.

### `sassTasks.clean()` - Clean compiled CSS.

Deletes files that are made by the other tasks.

### `sassTasks.docs()` - Create documentation using SassDoc

Creates [SassDoc](http://sassdoc.com/) documentation for you.

### `sassTasks.watch()` - Watch Sass

The watch task that will fire off the compile, validate, and docs tasks (if enabled).


## Configuration

**All configuration is deep merged with [`config.default.js`](config.default.js).**

### `src`

Type: `Array<String>` Default: `[ 'scss/**/*.scss' ]`

The collection of files to compile, watch, validate, and document. This is passed to `gulp.src`. Supports globbing.

### `dest`

Type: `String` Default: `'dest/'`

Where to output the compiled files: CSS files, SourceMaps, and SassDoc output ends up here.

### `extraWatches`

Type: `Array<String>` Default: `[]`

Extra collection of files to watch; when these change the enabled tasks (compile, validate, docs) will run (but not with these added to their `src`). Supports globbing.

### `flattenDestOutput`

Type: `Boolean` Default: `true`

If `true`, no folders will be made in the `dest` folder, and all files will be one level deep. If `false`, then the folders will be made; so for example:

- This `scss/path/to/file.scss`
- Compiles to `dest/path/to/file.css`

### `sourceComments`

Type: `Boolean` Default: `false`

Enables additional debugging information in the output file as CSS comments. Shouldn't need to use unless SourceMaps isn't working for you. Passed to [`node-sass`'s `sourceComments`](https://github.com/sass/node-sass#sourcecomments).

### `sourceMapEmbed`

Type: `Boolean` Default: `false`

Embed SourceMaps in CSS file or in own `.css.map` file? Passed to [`node-sass`'s `sourceMapEmbed`](https://github.com/sass/node-sass#sourcemapembed).

### `outputStyle`

Type: `String` Default: `'expanded'` Values: `nested`, `expanded`, `compact`, `compressed`

Determines the output format of the final CSS style. Passed to [`node-sass`'s `outputStyle`](https://github.com/sass/node-sass#outputstyle).

### `autoPrefixerBrowsers`

Type: `Array<String>` Default: `[ 'last 2 versions', 'IE >= 10' ]` Values: [see list](https://github.com/ai/browserslist#queries).

Based on the browsers you want to support, this adds the vendor prefixes you'll need. It's recommended to have Stylelint check to make sure you don't write vendor prefixes in your source code as well.

### `includePaths`

Type: `Array<String>` Default: `[ './node_modules' ]`

An array of paths that LibSass can look in to attempt to resolve your `@import` declarations. Useful for importing libraries you install via npm. Passed to [`node-sass`'s `includePaths`](https://github.com/sass/node-sass#includepaths).

### `lint`

Type: `Object`

Config for [Stylelint](http://stylelint.io); see below for properties.

#### `lint.enabled`

Type: `Boolean` Default: `false`

Uses [Stylelint](http://stylelint.io). If enabled, this will export out a `sassTasks.validate` task, and lint the most recently changed file on watch triggers. Requires [Stylelint configuration](https://stylelint.io/user-guide/configuration/) to be set up.

#### `lint.onWatch`

Type: `Boolean` Default: `true`

If `true`, lint the files that just changed after each save. If `false`, then it is not ran on watch, but you still have the full lint task of `sassTasks.validate()`.

### `sassdoc`

Type: `Object`

Configuration for [SassDoc](http://sassdoc.com/); see below for properties.

#### `sassdoc.enabled`

Type: `Boolean` Default: `false`

If enabled, you'll have a `sassTasks.docs()` task and it'll trigger on watch.

#### `sassdoc.dest`

Type: `String` Default: `'dest/sassdoc'`

Where to compile SassDoc to.

#### `sassdoc.verbose`

Type: `Boolean` Default: `false`

Show more debugging information.

#### `sassdoc.basePath`

Type: `String` Default: `''`

Allows you to have a "View Source" link next to code documentation to it's GitHub/Bitbucket view. Set it to `https://github.com/USERNAME/REPOSITORY/tree/master` (or `/blob/<branch_name>`). Passed to [SassDoc's `basePath`](http://sassdoc.com/customising-the-view/#base-path).

#### `sassdoc.exclude`

Type: `Array<String>` Default: `[]`

Doesn't document these files. Passed to [SassDoc's `exclude`](http://sassdoc.com/configuration/#exclude).

### `sassdoc.theme`

Type: `String` Default: `'default'`

Theme for SassDoc. Passed to [SassDoc's `theme`](http://sassdoc.com/configuration/#theme).

#### `sassdoc.sort`

Type: `Array<String>` Default: `[ 'file', 'group', 'line>' ]`

Passed to [SassDoc's `sort`](http://sassdoc.com/extra-tools/#sort-sort).

## Setup Details

### Setting up Stylelint

This uses [Stylelint](http://stylelint.io) via [`gulp-stylelint`](https://www.npmjs.com/package/gulp-stylelint) - see those pages for further docs.

1. Set `lint.enabled` to `true`.
2. Run `npm install --save-dev stylelint-scss`
3. Create these files: `.stylelintignore` (for ignored files) and a config file, `.stylelintrc.js` with this:

```js
// Docs: http://stylelint.io
// Style lint rule detail: https://github.com/stylelint/stylelint/tree/master/src/rules/RULE-NAME

module.exports = {
  plugins: [
    "stylelint-scss"
  ],
  rules: {
    // Just some sample rules to get you started.
    "declaration-no-important": true,
    "indentation": 2,
    "max-nesting-depth": 3,
    "selector-max-specificity": "0,3,3",
    "scss/at-extend-no-missing-placeholder": true,
    "at-rule-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true
  }
};
```

You can disable rules for a single place using this, or [other](http://stylelint.io/user-guide/configuration/#turning-rules-off-from-within-your-css), approaches:

```scss
.utility--spacing-down {
  margin-bottom: $spacing !important; // stylelint-disable-line declaration-no-important
}
```

[Sometimes `!important` is ok](https://csswizardry.com/2016/05/the-importance-of-important/); most of the time it's not.

### Setting up SassDoc

1. Set `sassdoc.enabled` to `true`
2. Use [SassDoc comment annotations](http://sassdoc.com/annotations/) in your Sass. These all use comments like `///` instead of the regular `//`. See below for examples.
3. Open `sassdoc.dest` (defaults to `dest/sassdoc/`) to view SassDoc.

```scss
/// Link Color
$color--link: blue;

/// Center an element vertically and/or horizontally in its container.
/// @param $horizontally [true] - center horizontally
/// @param $vertically [true] - center vertically
@mixin center($horizontally: true, $vertically: true) {
  position: relative;
  @if ($horizontally == true and $vertically == true) {
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  @if ($vertically == true and $horizontally == false) {
    top: 50%;
    transform: translateY(-50%);
  }
  @if ($horizontally == true and $vertically == false) {
    left: 50%;
    transform: translateX(-50%);
  }
}
```

## Theme Core Events

This is only info for other Theme Core plugin developers.

### emit `'reload'`

This event is emmited when files are done compiling. The first paramater is a String of the files changed.
