# bolt/settings-breakpoints
Major breakpoint sizes. Part of the Bolt “Core” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

- [Sassdocs](http://localhost:3000/docs/#settings:breakpoints)
- Demo (Coming Soon)

- - - -
## Table of Contents
- [Cheat Sheet](#cheatsheet)
- [Getting Started](#gettingstarted)
- [Breakpoint Features](#breakpointfeatures)

## Cheat Sheet
### Install via NPM
```
npm install @bolt/settings-breakpoints
```

### Breakpoint Sizing Chart*

| T-Shirt Size  | Size in px |
| :------------ | ---------: |
| xsmall        | `400px`    |
| small         | `600px`    |
| medium        | `800px`    |
| large         | `1000px`   |
| xlarge        | `1200px`   |

- - - -

## Getting Started
The best way to start using Bolt is via the *Bolt Starterkit* (coming soon), a pre-assembled front-end boilerplate designed to get you up and running as quickly as possible.

You can also use the full [Bolt Core](https://www.npmjs.com/package/@bolt/core) CSS framework on its own, or, install just the parts you need and fold the different ITCSS layers of Bolt into your existing codebase.

Installing Bolt’s breakpoint settings is as easy as running NPM install:

```
npm install @bolt/settings-breakpoints
```

> **TIP:**: Don’t have a `package.json` file? Need a little help getting started? Check out our [Getting Started](https://www.boltdesignsystem.com/getting-started) guide for some tips to help get you up to speed.

### Usage
Once installed, you should  `@import`  the main Sass partial into your project’s main `.scss` file to make the included variables and Sass mixins available to use in the rest of your code.

```
// Settings
@import ‘@bolt/settings-breakpoints’
...

// Tools
@import ‘@bolt/tools-...’
```


Since Bolt's CSS architecture is based on [ITCSS (Inverted Triangle CSS)](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)<sup>[1](#1-learn-more-about-itcss)</sup>, what Sass partials you import, and in what order, makes a whole world of difference. That’s why importing any Settings packages from Bolt in your project’s Settings layer (prior to any Sass mixins, resets, base HTML element styles, etc) is so important.

### Compiling
We recommend using Bolt’s Gulp-based [front-end build tools](https://www.npmjs.com/package/@bolt/build-tools) to compile your Sass as we're pre-packaging many of the latest tools and add-ons to help you write your very best: LibSass, Autoprefixer, PostCSS, CleanCSS, Sassdoc, Stylelint, Gulp Plumber, npm-sass, and BrowserSync live reloading.
- - - -

## Breakpoint Features

### Defined as T-shirt Sizes
As with most sizing options in Bolt, breakpoint sizes are categorized and referenced as t-shirt sizes, with `medium` being the default the average *medium-ish* sized screen and each t-shirt size option being one step larger/smaller.

This helps to better explain intended behavior based on the user's available screen size without getting caught up in any assumptions about context or physical form factor ("mobile" vs "tablet" vs "desktop") of the user.

### Breakpoint Size Doesn't Mean Device Type
For example, `small` doesn't mean `mobile` just as much as `large` doesn't mean `desktop`.

**Small** simply means *I have less pixels on my device* which could apply to a phone, but could just as easily apply  to a Windows 10 user docking Microsoft Edge browser to the side of the screen or Safari for iOS on an iPad when viewing two windows side-by-side.

Plain and simple: breakpoints don't necessarily equate to a specific screen size or device type.


### Mobile First
Breakpoints defined and used in Bolt start out with any rules for the smallest of screen sizes first and gradually add additional rules for larger devices as needed.

### Major vs Minor Breakpoints
To help with consistancy in the design system, *major breakpoints* in Bolt are assigned names to help coordinate different behaviors across large ranges of screen and device sizes.

```Sass
@include bolt-mq(medium){
  max-width: none;
}
```

**Minor breakpoints** on the other hand are used much more sparingly to tweak things at the component level, as needed.
```Sass
$bolt-card-horizontal-layout: 650px;
...
.c-bolt-card {
  ...
  @include breakpoint($bolt-card-horizontal-layout){
    flex-direction: row;
  }
}
```
