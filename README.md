
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
- PHP (PHP 7 required)

### Homebrew
- Homebrew (needed for easy install of GD and Imagick -- used for responsive images / image optimization)

```
brew install imagemagick
brew install graphicsmagick
```


## Installing
Once Bolt is cloned down locally (and you’ve already gone ahead and installed the prerequisites)  all you need to do to finish setting up Bolt is run `npm run setup` to install the required NPM dependencies, run Lerna bootstrap, and install Pattern Lab + any composer dependencies for the very first time.

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