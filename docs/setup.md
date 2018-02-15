# Getting setup with Bolt
**Below you'll find a step-by-step guide for getting your local environment configured**

## Prerequisites
### Node Prerequisites
Bolt uses [Node](https://nodejs.org) for core processing and scripting, [npm](https://www.npmjs.com/) to manage project dependencies, [gulp.js](http://gulpjs.com/) to run front-end build tasks and to interface with the Pattern Lab PHP core library, and [Lerna](https://github.com/lerna/lerna) for versioning and publishing individual packages in Bolt to NPM, in addition to symlinking any local Bolt packages that depend on one-another.

#### Installing Node & NPM
Node v8.9.0 or higher is required. You can use the command below or follow the directions for [installing Node](https://nodejs.org/en/download/) on the nodejs.org website if you haven't done so already.
```
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

Installing Node also installs the latest version of npm by default however if you’ve already installed Node in the past, you should upgrade to at least v9.4.0 of NPM. 
```
npm install npm@latest -g 
```

### Homebrew
Needed for easy install of Composer, GD, Imagick, and Yarn. More details [available here](https://brew.sh/).
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
The script explains what it will do and then pauses before it does it. There are more installation options [here](https://docs.brew.sh/Installation.html).

### Install PHP Dependencies
PHP 7.x or higher is required.

- Composer
```
brew install composer
```
then run `composer --version` to verify everything went smoothly (you should see a version number)

- Prestissimo (optional, but recommend)
```
composer global require hirak/prestissimo
```

### GD and Imagick
Used for responsive images / image optimization.
```
brew install imagemagick
brew install graphicsmagick
```

### Yarn
Yarn v1.x or higher is required. Yarn caches every package it downloads so it never needs to download it again. It also parallelizes operations to maximize resource utilization so install times are faster than ever.
```
brew install yarn
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
npm start
```

## Building for Production (Quick Build)
```
npm run build
```

## Building for Production (Full Build)
Everything done in the normal production build in addition to regenerating the bolt-manaifest.yml file in the root of the project -- used when dynamically referencing arrays of Twig templates in a way that is more D8 friendly out of the box
```
npm run build:full
```