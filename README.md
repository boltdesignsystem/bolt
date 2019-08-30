<h1>
  <img align="left" width="40" src="https://raw.githubusercontent.com/bolt-design-system/bolt/master/docs-site/src/assets/images/bolt-logo.png">
  Bolt Design System
</h1>

**Check out our new [Bolt Docs site!](https://boltdesignsystem.com)**

## Quick Start Guide~60 Second Quick Start Guide

```bash
git clone https://github.com/bolt-design-system/bolt.git ~/sites/bolt
cd ~/sites/bolt
yarn
```

> Make sure you have Node.js and Yarn installed!
> 

## Sass Compiling w/ An Array of Files Passed to Webpack (Slow)
```
# Run Webpack Dev Server (~25.806s for first compile)
yarn run start


# Production Build
yarn run build
```


## Sass Compiling via 1 Sass File w/ Imports Passed to Webpack (Very Slow)
```
# Run Webpack Dev Server
yarn run start:sass-import-test


# Production Build
yarn run build:sass-import-test
```
