
[![Known Vulnerabilities](https://snyk.io/test/github/pega-digital/bolt/badge.svg)](https://snyk.io/test/github/pega-digital/bolt)

## Requirements
[![Greenkeeper badge](https://badges.greenkeeper.io/bolt-design-system/bolt.svg)](https://greenkeeper.io/)


# Bolt Design System README
## Quick Links
1. **Github**: https://github.com/bolt-design-system/bolt/tree/develop
2. **Travis**: https://travis-ci.org/bolt-design-system/bolt
3. **Main Site (Broken)**: https://www.boltdesignsystem.com
4. **Staging Site** (atomic continuous deployments): ex. https://bolt-website-vlozpidgxm.now.sh
5. **NPM**: https://www.npmjs.com/org/bolt


## Design System Adoption
* **Sites Using Bolt (next gen Design System)**
	* http://staging.d8.pega.com (D8 redesign, login required)
* **Sites Using PegaKit (first gen Design System), Bolt's Predecessor**
	- https://www.pega.com (D7)
	- https://blog.pega.com (D8)
	- https://academy.pega.com (D8)
	- https://accounts.pega.com/register (D8, SSO portal)
- **Site Not Yet Using the Design System**
	- https://pdn.pega.com/ (D7) - Q4 2017
	- https://saleshub.pega.com (D7, internal)


## Prerequisites
### **Node Prerequisites**
Bolt uses [Node](https://nodejs.org) for core processing and scripting, [npm](https://www.npmjs.com/) to manage project dependencies, [gulp.js](http://gulpjs.com/) to run front-end build tasks and to interface with the Pattern Lab PHP core library, and [Lerna](https://github.com/lerna/lerna) for versioning and publishing individual packages in Bolt to NPM, in addition to symlinking any local Bolt packages that depend on one-another.

#### Installing Node & NPM
Node v4 or higher should suffice however the latest v8.x of Node is recommended. You can follow the directions for [installing Node](https://nodejs.org/en/download/current/) on the nodejs.org website if you haven't done so already.

Installing Node also installs the latest version of npm by default however if you’ve already installed Node in the past, you should upgrade to at least v5.x of NPM to take advantage of the performance gains npm 5 introduced. 

```
npm install npm@latest -g 
```

It's also highly recommended that you [install gulp](hhttps://github.com/gulpjs/gulp/blob/4.0/docs/getting-started.md) globally.

> Note: Bolt uses Gulp 4, which may require a new global install of the Gulp command line interface.
> 
> Follow the *Upgrading to Gulp 4* instructions below if you already have Gulp installed and need to upgrade. Gulp 4 is in alpha, but brings many benefits to the table and is relatively stable. The rest of this documentation assumes a global install.

##### Upgrading to Gulp 4
Gulp 4 uses an updated CLI which needs to be updated globally. This CLI is backwards compatible with any Gulp 3.x projects you may have locally.

```
# first uninstall gulp globally
npm uninstall gulp -g

# uninstall from your project directory, or delete node_modules if you need a coffee break
npm uninstall gulp

# install the latest Gulp 4 CLI tools globally
npm install gulpjs/gulp-cli -g
```

Once done you can run npm install again from the Bolt repo and everything should be pulled down again via npm.

You can confirm the correct versions are installed via:
```
gulp -v
[22:35:42] CLI version 1.4.0 (at time of writing)
[22:35:42] Local version 4.0.0-alpha.2
```


### Install Lerna Globally
```
npm install -g lerna
```


### Install PHP Dependencies
- Composer
- Prestissimo (optional, but recommend)
```
composer global require hirak/prestissimo
```
- PHP (PHP 7 recommended)

### Homebrew
- Homebrew (needed for easy install of GD and Imagick -- used for responsive images / image optimization)

```
brew install imagemagick
brew install graphicsmagick
```


## Installing

### First time setup

If this is a fresh clone, run the commands below, then go get lunch.

```bash
npm install
npm run setup
npm start
```

<details>
<summary>**What's that all doing? I wanna know details! (click me)**</summary>
Well, since you asked:

- `npm install` - Installing node dependencies listed in `package.json` into `node_modules/`
- `npm run setup` - This runs these commands:
    - `npm run bootstrap` - Runs `lerna bootstrap --hoist` 
        - Looks at `lerna.json` to find where all packages are, then goes to those directories and runs `npm install`. 
        - Since we use `--hoist`, that installs shared dependencies up in the repo roots `node_modules/` folder.
    - `npm run composer:setup`
        - Checks to see if this is a fresh install and if not:
        - deletes `composer.lock` and `vendor`
        - Runs `composer install` to get dependencies from `composer.json` and put them in `vendor`, these are mainly Pattern Lab dependencies.
- `npm start`
    - Compiles everything
    - Starts watches on files that will trigger builds for what was changed
    - Starts up a server

</details>

## Start up local server, compile, and watch for changes
```
## Alias for `gulp`
npm run start
```

Note: you can always run `gulp --tasks` to see what build tasks are available to run

## Building for Production (Quick Build)
```
npm run build
```

## Building for Production (Full Build)
Everything done in the normal production build in addition to regenerating the bolt-manaifest.yml file in the root of the project -- used when dynamically referencing arrays of Twig templates in a way that is more D8 friendly out of the box
```
npm run build:full
```

## Status Board

name | version | npm url | github url | readme
--- | --- | --- | --- | ---
@bolt/assets-web-fonts | 0.2.0 | https://www.npmjs.com/package/@bolt/assets-web-fonts | https://github.com/bolt-design-system/bolt/tree/master/src/fonts | Missing README.md
@bolt/build-core | 0.4.1 | https://www.npmjs.com/package/@bolt/build-core | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks/build-core | Missing README.md
@bolt/build-icons | 0.1.0 | https://www.npmjs.com/package/@bolt/build-icons | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks/build-icons | Missing README.md
@bolt/build-images | 0.1.1 | https://www.npmjs.com/package/@bolt/build-images | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks/build-images | Missing README.md
@bolt/build-patternlab | 0.5.2 | https://www.npmjs.com/package/@bolt/build-patternlab | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks/build-patternlab | Missing README.md
@bolt/build-server | 0.4.1 | https://www.npmjs.com/package/@bolt/build-server | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks/build-server | Missing README.md
@bolt/build-slack | 0.5.1 | https://www.npmjs.com/package/@bolt/build-slack | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks/build-slack | Missing README.md
@bolt/build-styles | 0.5.1 | https://www.npmjs.com/package/@bolt/build-styles | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks/build-styles | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks/build-styles/README.md
@bolt/build-symlinks | 0.6.2 | https://www.npmjs.com/package/@bolt/build-symlinks | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks/build-symlinks | Missing README.md
@bolt/build-tools | 0.4.2 | https://www.npmjs.com/package/@bolt/build-tools | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks | Missing README.md
@bolt/build-webpack | 0.3.1 | https://www.npmjs.com/package/@bolt/build-webpack | https://github.com/bolt-design-system/bolt/tree/master/build-tools/gulp-tasks/build-webpack | Missing README.md
@bolt/components-accordion | 0.0.1 | https://www.npmjs.com/package/@bolt/components-accordion | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-accordion | Missing README.md
@bolt/components-action-blocks | 0.3.0 | https://www.npmjs.com/package/@bolt/components-action-blocks | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-action-blocks | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-action-blocks/README.md
@bolt/components-all | 0.5.3 | https://www.npmjs.com/package/@bolt/components-all | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components | Missing README.md
@bolt/components-background | 0.2.2 | https://www.npmjs.com/package/@bolt/components-background | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-background | Missing README.md
@bolt/components-band | 0.4.1 | https://www.npmjs.com/package/@bolt/components-band | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-band | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-band/README.md
@bolt/components-blockquote | 0.2.2 | https://www.npmjs.com/package/@bolt/components-blockquote | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-blockquote | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-blockquote/README.md
@bolt/components-button | 0.6.1 | https://www.npmjs.com/package/@bolt/components-button | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-button | Missing README.md
@bolt/components-button-group | 0.2.0 | https://www.npmjs.com/package/@bolt/components-button-group | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-button-group | Missing README.md
@bolt/components-card | 0.5.2 | https://www.npmjs.com/package/@bolt/components-card | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-card | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-card/README.md
@bolt/components-chip | 0.2.0 | https://www.npmjs.com/package/@bolt/components-chip | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-chip | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-chip/README.md
@bolt/components-chip-list | 0.2.0 | https://www.npmjs.com/package/@bolt/components-chip-list | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-chip-list | Missing README.md
@bolt/components-color-swatch | 0.5.0 | https://www.npmjs.com/package/@bolt/components-color-swatch | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-color-swatch | Missing README.md
@bolt/components-critical-fonts | 0.4.2 | https://www.npmjs.com/package/@bolt/components-critical-fonts | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-critical-fonts | Missing README.md
@bolt/components-critical-path | 0.2.0 | https://www.npmjs.com/package/@bolt/components-critical-path | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-critical-path | Missing README.md
@bolt/components-device-viewer | 0.0.0 | https://www.npmjs.com/package/@bolt/components-device-viewer | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-device-viewer | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-device-viewer/README.md
@bolt/components-figure | 0.0.0 | https://www.npmjs.com/package/@bolt/components-figure | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-figure | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-figure/README.md
@bolt/components-headline | 0.6.1 | https://www.npmjs.com/package/@bolt/components-headline | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-headline | Missing README.md
@bolt/components-icon | 0.2.1 | https://www.npmjs.com/package/@bolt/components-icon | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-icon | Missing README.md
@bolt/components-icons | 0.1.1 | https://www.npmjs.com/package/@bolt/components-icons | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-icons | Missing README.md
@bolt/components-image | 0.2.1 | https://www.npmjs.com/package/@bolt/components-image | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-image | Missing README.md
@bolt/components-link | 0.1.0 | https://www.npmjs.com/package/@bolt/components-link | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-link | Missing README.md
@bolt/components-logo | 0.2.1 | https://www.npmjs.com/package/@bolt/components-logo | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-logo | Missing README.md
@bolt/components-ordered-list | 0.1.2 | https://www.npmjs.com/package/@bolt/components-ordered-list | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-ordered-list | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-ordered-list/README.md
@bolt/components-page-footer | 0.4.0 | https://www.npmjs.com/package/@bolt/components-page-footer | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-page-footer | Missing README.md
@bolt/components-page-header | 0.0.1-alpha.1 | https://www.npmjs.com/package/@bolt/components-page-header | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-page-header | Missing README.md
@bolt/components-site | 0.5.0 | https://www.npmjs.com/package/@bolt/components-site | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-site | Missing README.md
@bolt/components-teaser | 0.2.0 | https://www.npmjs.com/package/@bolt/components-teaser | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-teaser | Missing README.md
@bolt/components-unordered-list | 0.1.2 | https://www.npmjs.com/package/@bolt/components-unordered-list | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-unordered-list | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/02-components/bolt-unordered-list/README.md
@bolt/config-browserlist | 0.3.1 | https://www.npmjs.com/package/@bolt/config-browserlist | https://github.com/bolt-design-system/bolt/tree/master/packages/bolt-config-presets/config-browserlist | Missing README.md
@bolt/config-stylelint | 0.4.2 | https://www.npmjs.com/package/@bolt/config-stylelint | https://github.com/bolt-design-system/bolt/tree/master/packages/bolt-config-presets/config-stylelint | https://github.com/bolt-design-system/bolt/tree/master/packages/bolt-config-presets/config-stylelint/README.md
@bolt/core | 0.3.0 | https://www.npmjs.com/package/@bolt/core | https://github.com/bolt-design-system/bolt/tree/master/packages/bolt-core | Missing README.md
@bolt/core-data | 0.1.2 | https://www.npmjs.com/package/@bolt/core-data | https://github.com/bolt-design-system/bolt/tree/master/src/_data | Missing README.md
@bolt/elements-all | 0.5.2 | https://www.npmjs.com/package/@bolt/elements-all | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-all | Missing README.md
@bolt/elements-code | 0.3.2 | https://www.npmjs.com/package/@bolt/elements-code | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-code | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-code/README.md
@bolt/elements-headings | 0.4.0 | https://www.npmjs.com/package/@bolt/elements-headings | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-headings | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-headings/README.md
@bolt/elements-images | 0.3.0 | https://www.npmjs.com/package/@bolt/elements-images | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-images | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-images/README.md
@bolt/elements-links | 0.5.0 | https://www.npmjs.com/package/@bolt/elements-links | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-links | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-links/README.md
@bolt/elements-page | 0.5.0 | https://www.npmjs.com/package/@bolt/elements-page | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-page | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-page/README.md
@bolt/elements-paragraphs | 0.2.0 | https://www.npmjs.com/package/@bolt/elements-paragraphs | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-paragraphs | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-paragraphs/README.md
@bolt/elements-small | 0.5.0 | https://www.npmjs.com/package/@bolt/elements-small | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-small | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-small/README.md
@bolt/elements-tables | 0.4.0 | https://www.npmjs.com/package/@bolt/elements-tables | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-tables | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/04-elements/elements-tables/README.md
@bolt/eslint-config | 0.3.1 | https://www.npmjs.com/package/@bolt/eslint-config | https://github.com/bolt-design-system/bolt/tree/master/packages/bolt-config-presets/config-eslint | https://github.com/bolt-design-system/bolt/tree/master/packages/bolt-config-presets/config-eslint/README.md
@bolt/generic-all | 0.5.2 | https://www.npmjs.com/package/@bolt/generic-all | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-all | Missing README.md
@bolt/generic-font-stacks | 0.2.2 | https://www.npmjs.com/package/@bolt/generic-font-stacks | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-font-stacks | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-font-stacks/README.md
@bolt/generic-global | 0.5.0 | https://www.npmjs.com/package/@bolt/generic-global | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-global | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-global/README.md
@bolt/generic-normalize | 0.5.0 | https://www.npmjs.com/package/@bolt/generic-normalize | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-normalize | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-normalize/README.md
@bolt/generic-reset | 0.5.2 | https://www.npmjs.com/package/@bolt/generic-reset | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-reset | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-reset/README.md
@bolt/generic-shared | 0.5.0 | https://www.npmjs.com/package/@bolt/generic-shared | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-shared | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/03-generic/generic-shared/README.md
@bolt/objects-all | 0.4.1 | https://www.npmjs.com/package/@bolt/objects-all | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-all-objects | Missing README.md
@bolt/objects-bare-list | 0.2.0 | https://www.npmjs.com/package/@bolt/objects-bare-list | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-bare-list-object | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-bare-list-object/README.md
@bolt/objects-block | 0.2.0 | https://www.npmjs.com/package/@bolt/objects-block | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-block-object | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-block-object/README.md
@bolt/objects-crop | 0.2.0 | https://www.npmjs.com/package/@bolt/objects-crop | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-crop-object | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-crop-object/README.md
@bolt/objects-flag | 0.2.0 | https://www.npmjs.com/package/@bolt/objects-flag | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-flag-object | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-flag-object/README.md
@bolt/objects-grid | 0.5.0 | https://www.npmjs.com/package/@bolt/objects-grid | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-grid-object | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-grid-object/README.md
@bolt/objects-inline-list | 0.4.0 | https://www.npmjs.com/package/@bolt/objects-inline-list | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-inline-list-object | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-inline-list-object/README.md
@bolt/objects-island | 0.4.0 | https://www.npmjs.com/package/@bolt/objects-island | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-island-object | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-island-object/README.md
@bolt/objects-ratio | 0.6.0 | https://www.npmjs.com/package/@bolt/objects-ratio | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-ratio-object | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-ratio-object/README.md
@bolt/objects-ui-list | 0.5.0 | https://www.npmjs.com/package/@bolt/objects-ui-list | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-ui-list-object | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-ui-list-object/README.md
@bolt/objects-wrapper | 0.5.1 | https://www.npmjs.com/package/@bolt/objects-wrapper | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-wrapper-object | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/05-objects/bolt-wrapper-object/README.md
@bolt/settings-all | 0.7.2 | https://www.npmjs.com/package/@bolt/settings-all | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-all | Missing README.md
@bolt/settings-breakpoints | 0.7.0 | https://www.npmjs.com/package/@bolt/settings-breakpoints | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-breakpoints | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-breakpoints/README.md
@bolt/settings-colors | 0.6.2 | https://www.npmjs.com/package/@bolt/settings-colors | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-colors | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-colors/README.md
@bolt/settings-font-family | 0.7.2 | https://www.npmjs.com/package/@bolt/settings-font-family | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-font-family | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-font-family/README.md
@bolt/settings-font-size | 0.8.2 | https://www.npmjs.com/package/@bolt/settings-font-size | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-font-size | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-font-size/README.md
@bolt/settings-font-weight | 0.8.1 | https://www.npmjs.com/package/@bolt/settings-font-weight | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-font-weight | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-font-weight/README.md
@bolt/settings-global | 0.7.3 | https://www.npmjs.com/package/@bolt/settings-global | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-global | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-global/README.md
@bolt/settings-spacing | 0.7.0 | https://www.npmjs.com/package/@bolt/settings-spacing | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-spacing | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/01-settings/settings-spacing/README.md
@bolt/templates-default | 0.3.0 | https://www.npmjs.com/package/@bolt/templates-default | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/03-templates/default | Missing README.md
@bolt/themes-all | 0.5.2 | https://www.npmjs.com/package/@bolt/themes-all | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/06-themes/themes-all | Missing README.md
@bolt/themes-dark | 0.1.1 | https://www.npmjs.com/package/@bolt/themes-dark | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/06-themes/general/themes-dark | Missing README.md
@bolt/themes-error | 0.0.1 | https://www.npmjs.com/package/@bolt/themes-error | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/06-themes/states/themes-error | Missing README.md
@bolt/themes-light | 0.1.0 | https://www.npmjs.com/package/@bolt/themes-light | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/06-themes/general/themes-light | Missing README.md
@bolt/themes-notice | 0.0.1 | https://www.npmjs.com/package/@bolt/themes-notice | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/06-themes/states/themes-notice | Missing README.md
@bolt/themes-success | 0.0.1 | https://www.npmjs.com/package/@bolt/themes-success | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/06-themes/states/themes-success | Missing README.md
@bolt/themes-warning | 0.0.1 | https://www.npmjs.com/package/@bolt/themes-warning | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/06-themes/states/themes-warning | Missing README.md
@bolt/themes-xdark | 0.1.1 | https://www.npmjs.com/package/@bolt/themes-xdark | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/06-themes/general/themes-xdark | Missing README.md
@bolt/themes-xlight | 0.1.0 | https://www.npmjs.com/package/@bolt/themes-xlight | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/06-themes/general/themes-xlight | Missing README.md
@bolt/tools-all | 0.5.2 | https://www.npmjs.com/package/@bolt/tools-all | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-all | Missing README.md
@bolt/tools-breakpoint | 0.2.0 | https://www.npmjs.com/package/@bolt/tools-breakpoint | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-breakpoint | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-breakpoint/README.md
@bolt/tools-button-color | 0.5.2 | https://www.npmjs.com/package/@bolt/tools-button-color | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-button-color | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-button-color/README.md
@bolt/tools-clearfix | 0.6.0 | https://www.npmjs.com/package/@bolt/tools-clearfix | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-clearfix | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-clearfix/README.md
@bolt/tools-color-palette | 0.5.2 | https://www.npmjs.com/package/@bolt/tools-color-palette | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-color-palette | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-color-palette/README.md
@bolt/tools-export-data | 0.6.0 | https://www.npmjs.com/package/@bolt/tools-export-data | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-export-data | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-export-data/README.md
@bolt/tools-font-face | 0.2.2 | https://www.npmjs.com/package/@bolt/tools-font-face | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-font-face | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-font-face/README.md
@bolt/tools-font-family | 0.5.2 | https://www.npmjs.com/package/@bolt/tools-font-family | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-font-family | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-font-family/README.md
@bolt/tools-font-kerning | 0.5.0 | https://www.npmjs.com/package/@bolt/tools-font-kerning | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-font-kerning | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-font-kerning/README.md
@bolt/tools-font-size | 0.5.2 | https://www.npmjs.com/package/@bolt/tools-font-size | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-font-size | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-font-size/README.md
@bolt/tools-font-weight | 0.5.1 | https://www.npmjs.com/package/@bolt/tools-font-weight | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-font-weight | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-font-weight/README.md
@bolt/tools-linear-interpolation | 0.2.0 | https://www.npmjs.com/package/@bolt/tools-linear-interpolation | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-linear-interpolation | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-linear-interpolation/README.md
@bolt/tools-list-remove | 0.2.0 | https://www.npmjs.com/package/@bolt/tools-list-remove | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-list-remove | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-list-remove/README.md
@bolt/tools-list-sort | 0.2.0 | https://www.npmjs.com/package/@bolt/tools-list-sort | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-list-sort | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-list-sort/README.md
@bolt/tools-map-sort | 0.2.0 | https://www.npmjs.com/package/@bolt/tools-map-sort | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-map-sort | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-map-sort/README.md
@bolt/tools-no-select | 0.5.0 | https://www.npmjs.com/package/@bolt/tools-no-select | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-no-select | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-no-select/README.md
@bolt/tools-poly-fluid-sizing | 0.2.2 | https://www.npmjs.com/package/@bolt/tools-poly-fluid-sizing | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-poly-fluid-sizing | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-poly-fluid-sizing/README.md
@bolt/tools-px-to-rem | 0.2.2 | https://www.npmjs.com/package/@bolt/tools-px-to-rem | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-px-to-rem | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-px-to-rem/README.md
@bolt/tools-sassy-maps | 0.5.0 | https://www.npmjs.com/package/@bolt/tools-sassy-maps | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-sassy-maps | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-sassy-maps/README.md
@bolt/tools-scrolling | 0.6.0 | https://www.npmjs.com/package/@bolt/tools-scrolling | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-scrolling | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-scrolling/README.md
@bolt/tools-spacing | 0.5.0 | https://www.npmjs.com/package/@bolt/tools-spacing | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-spacing | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-spacing/README.md
@bolt/tools-strip-unit | 0.5.0 | https://www.npmjs.com/package/@bolt/tools-strip-unit | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-strip-unit | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-strip-unit/README.md
@bolt/tools-text-contrast | 0.5.2 | https://www.npmjs.com/package/@bolt/tools-text-contrast | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-text-contrast | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-text-contrast/README.md
@bolt/tools-uppercase | 0.2.0 | https://www.npmjs.com/package/@bolt/tools-uppercase | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-uppercase | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-uppercase/README.md
@bolt/tools-visuallyhidden | 0.6.0 | https://www.npmjs.com/package/@bolt/tools-visuallyhidden | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-visuallyhidden | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/02-tools/tools-visuallyhidden/README.md
@bolt/twig-extensions | 0.3.1 | https://www.npmjs.com/package/@bolt/twig-extensions | https://github.com/bolt-design-system/bolt/tree/master/packages/bolt-twig-extensions | https://github.com/bolt-design-system/bolt/tree/master/packages/bolt-twig-extensions/README.md
@bolt/utilities-all | 0.6.0 | https://www.npmjs.com/package/@bolt/utilities-all | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-all | Missing README.md
@bolt/utilities-clearfix | 0.5.0 | https://www.npmjs.com/package/@bolt/utilities-clearfix | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-clearfix | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-clearfix/README.md
@bolt/utilities-colors | 0.3.0 | https://www.npmjs.com/package/@bolt/utilities-colors | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-colors | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-colors/README.md
@bolt/utilities-flex | 0.5.0 | https://www.npmjs.com/package/@bolt/utilities-flex | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-flex | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-flex/README.md
@bolt/utilities-spacing | 0.5.0 | https://www.npmjs.com/package/@bolt/utilities-spacing | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-spacing | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-spacing/README.md
@bolt/utilities-text-align | 0.2.0 | https://www.npmjs.com/package/@bolt/utilities-text-align | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/bolt-text-align | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/bolt-text-align/README.md
@bolt/utilities-visuallyhidden | 0.5.0 | https://www.npmjs.com/package/@bolt/utilities-visuallyhidden | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-visuallyhidden | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-visuallyhidden/README.md
@bolt/utilities-widths | 0.5.0 | https://www.npmjs.com/package/@bolt/utilities-widths | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-widths | https://github.com/bolt-design-system/bolt/tree/master/src/_patterns/01-core/07-utilities/utilities-widths/README.md
