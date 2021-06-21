# bolt/settings-spacing

Spacing settings based on Bolt design principles. Part of the Bolt “Core” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

- [Sassdocs](https://www.boltdesignsystem.com/docs/#settings:%20layout-variable-bolt-spacing-values)
- Demo (Coming Soon)

---

## Table of Contents

- [Cheat Sheet](#cheat-sheet)
- [Getting Started](#getting-started)
- [Spacing Features](#spacing-features)
- [Further Reading](#further-reading)

## Cheat Sheet

### Install via NPM

```
npm install @bolt/settings-spacing
```

### Spacing Chart\*

#### Vertical and Horizontal Spacing Base

| Direction  |    Size    | Related to |
| :--------: | :--------: | :--------: |
|  Vertical  | `1.650rem` |  Leading   |
| Horizontal | `2.000rem` |   Gutter   |

#### Spacing Size Multiplier

|     Size      | Multiplier |  Vertical   | Horizontal  |
| :-----------: | :--------: | :---------: | :---------: |
|    xxsmall    |  `0.125`   | `0.206rem`  | `0.250rem`  |
|    xsmall     |  `0.250`   | `0.413rem`  | `0.500rem`  |
|     small     |  `0.500`   | `0.825rem`  | `1.000rem`  |
| medium (base) |  `1.000`   | `1.650rem`  | `2.000rem`  |
|     large     |  `2.000`   | `3.300rem`  | `4.000rem`  |
|    xlarge     |  `4.000`   | `6.600rem`  | `8.000rem`  |
|    xxlarge    |  `8.000`   | `13.200rem` | `16.000rem` |

#### Squished and Stretched Ratio

|   Name    | Vertical | Horizontal |
| :-------: | :------: | :--------: |
| Squished  |  `50%`   |   `100%`   |
| Stretched |  `100%`  |   `150%`   |

---

## Getting Started

The best way to start using Bolt is via the _Bolt Starterkit_ (coming soon), a pre-assembled front-end boilerplate designed to get you up and running as quickly as possible.

You can also use the full [Bolt Core](https://www.npmjs.com/package/@bolt/core) CSS framework on its own, or, install just the parts you need and fold the different ITCSS layers of Bolt into your existing codebase.

Installing Bolt’s spacing settings is as easy as running NPM install:

```
npm install @bolt/settings-spacing
```

> **TIP:**: Don’t have a `package.json` file? Need a little help getting started? Check out our [Getting Started](https://www.boltdesignsystem.com/getting-started) guide for some tips to help get you up to speed.

### Usage

Once installed, you should `@import` the main Sass partial into your project’s main `.scss` file to make the included variables available to the rest of your code.

```
// Settings
@import ‘@bolt/settings-spacing’
...

// Tools
@import ‘@bolt/tools-...’
```

Since Bolt's CSS architecture is based on [ITCSS (Inverted Triangle CSS)](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)<sup>[1](#1-learn-more-about-itcss)</sup>, what Sass partials you import, and in what order, makes a whole world of difference. That’s why importing any Settings packages from Bolt in your project’s Settings layer (prior to any Sass mixins, resets, base HTML element styles, etc) is so important.

### Compiling

We recommend using Bolt’s Gulp-based [front-end build tools](https://www.npmjs.com/package/@bolt/build-tools) to compile your Sass as we're pre-packaging many of the latest tools and add-ons to help you write your very best: LibSass, Autoprefixer, PostCSS, CleanCSS, Sassdoc, Stylelint, Gulp Plumber, npm-sass, and BrowserSync live reloading.

---

## Further Reading:

### 1. Learn more about ITCSS

- [Harry Roberts - Managing CSS Projects with ITCSS - YouTube](https://www.youtube.com/watch?v=1OKZOV-iLj4)
- [ITCSS: Scalable and Maintainable CSS Architecture - Xfive](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [Manage large CSS projects with ITCSS | Creative Bloq](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)
- [How I Shrank my CSS by 84kb by Refactoring with ITCSS](https://medium.com/@jordankoschei/how-i-shrank-my-css-by-84kb-by-refactoring-with-itcss-2e8dafee123a)

### 2. Spacing

- [Space in Design Systems | Nathan Curtis ](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
- [Handling spacing in a UI component library | Chris Pearce](https://medium.com/fed-or-dead/handling-spacing-in-a-ui-component-library-70f3b22ec89)
