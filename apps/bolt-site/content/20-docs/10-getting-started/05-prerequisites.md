---
title: Prerequisites
---

## Overview

- Node v8.9 + 
- Yarn v1 +
- Composer v1 +
    - Prestissimo
- Yarn v1 +
- imagemagick & graphicsmagick
- PHP v7.1 +

All package installation command below assume a Mac with Homebrew (`brew`) installed. If it's Linux, then it's *probably* just `apt-get`, if it's Windows, then emulate a Linux environment. 

## Node.js

We use the latest [Long Term Support](https://github.com/nodejs/Release) Node version; 8.9.0 (Codename Carbon), which was released Oct 2017 & will be supported by them until April 2019. This ensures things are fast without overhead of polyfills in our build tools.

### How to install
  
```bash
brew install nvm
nvm install lts/carbon # v8.9 +
nvm alias default lts/carbon
```

If you don't have a Mac, just [read the node docs on installing](https://nodejs.org).

## Install PHP Dependencies

PHP 7.x or higher and Composer v1+ is required.

```
brew install composer
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
