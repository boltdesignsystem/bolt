# bolt/settings-font-sizes
Fluid, font size settings based on a typographic modular scale. Part of the Bolt “Core” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

- [Sassdocs](https://www.boltdesignsystem.com/docs/#settings:%20typography-variable-font-sizes)
- Demo (Coming Soon)

- - - -
## Table of Contents
- [Cheat Sheet](#cheat-sheet)
- [Getting Started](#getting-started)
- [Font Size Features](#font-size-features)
- [Further Reading](#further-reading)

## Cheat Sheet
### Install via NPM
```
npm install @bolt/settings-font-sizes
```

### Font Sizing Chart*

|  Name       | Font Size (rems)  | Min to max font size (px) | Line Height  |
| :------------- | :----------------------: | :---------------------------: | ----------------:  |
| xxxlarge** |  `2.28rem`  to `3.08rem` | `34.20px to 55.44px` |`1.14`|
| xxlarge      |  `1.78rem`          | `26.70px to 32.04px`    |  `1.13`  |
| xlarge        | `1.42rem`           | `21.30px to 25.56px`    |  `1.21`  |
| large          | `1.11rem`           | `16.65px to 19.98px`    |  `1.31`  |
| medium (base) | `1.00rem`  | `15.00px to 18.00px`    |  `1.65`  |
| small         | `0.90rem`            | `13.50px to 16.20px`    |  `1.51`  |
| xsmall       | `0.80rem`            | `12.00px to 14.40px`    |  `1.45`  |

**Sizes Rounded to 2 decimal places*

***In addition to scaling according to base, `xxxlarge` has another scaling that takes care of devices with narrow screen.*


#### Base font size range
`15px` (min) to `18px` (max)

#### To calculate font size in pixels: 
`Pixel font size = font size (in rems) × responsive font size base`

#### To calculate line-height n pixels: 
`Pixel line-height = font size in px × unitless line height`

- - - -

## Getting Started
The best way to start using Bolt is via the *Bolt Starterkit* (coming soon), a pre-assembled front-end boilerplate designed to get you up and running as quickly as possible.

You can also use the full [Bolt Core](https://www.npmjs.com/package/@bolt/core) CSS framework on its own, or, install just the parts you need and fold the different ITCSS layers of Bolt into your existing codebase.

Installing Bolt’s font-size settings is as easy as running NPM install:

```
npm install @bolt/settings-font-sizes
```

> **TIP:**: Don’t have a `package.json` file? Need a little help getting started? Check out our [Getting Started](https://www.boltdesignsystem.com/getting-started) guide for some tips to help get you up to speed.  

### Usage
Once installed, you should  `@import`  the main Sass partial into your project’s main `.scss` file to make the included variables available to the rest of your code.

```
// Settings
@import ‘@bolt/settings-font-sizes’
...

// Tools
@import ‘@bolt/tools-...’
```

Since Bolt's CSS architecture is based on [ITCSS (Inverted Triangle CSS)](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)<sup>[1](#1-learn-more-about-itcss)</sup>, what Sass partials you import, and in what order, makes a whole world of difference. That’s why importing any Settings packages from Bolt in your project’s Settings layer (prior to any Sass mixins, resets, base HTML element styles, etc) is so important. 

### Compiling
We recommend using Bolt’s Gulp-based [front-end build tools](https://www.npmjs.com/package/@bolt/build-tools) to compile your Sass as we're pre-packaging many of the latest tools and add-ons to help you write your very best: LibSass, Autoprefixer, PostCSS, CleanCSS, Sassdoc, Stylelint, Gulp Plumber, npm-sass, and BrowserSync live reloading.

- - - -

## Font Size Features
The *Bolt Design System* team has gone through vigorous testing to make sure all types are legible on all devices. We have created the following range of sizes to be used for headings and body text. All font sizes are responsive in relation to device screen size.

### **Font Sizes Defined as rems vs px** <sup>[2](#2-rems-for-font-sizes)</sup>
Bolt’s font sizes are defined in rems and and are organized in a structured Sass Map for consistency and maintainability.

> Rem “represents the font-size of the root element (e.g., the font-size of the <html> element). When used within the root elements font-size, it represents its initial value (common browser default is 16px, but changes based upon users preferences).”  
> -- [<length> - CSS | MDN](https://developer.mozilla.org/en/docs/Web/CSS/length)  

### Line heights Included <sup>[3](#3-unitless-line-heights)</sup>
Each font size includes two pre-defined `unitless` line-heights: the default `regular` line-height for more editorial-focused designs and a `tight` shorter line height option for more interface-focused designs.

### Responsive Ready <sup>[4](#4-fluid-typography--modular-scale)</sup>
By defining our font sizes in REMs and by using unit-less line-heights, Bolt’s font sizes are responsive-ready out of the box. This responsive fluid typographic behavior is automatically included in the separate `bolt/elements-page` package (which gets @imported in the ITCSS elements layer)

```
/*------------------------------------*\
  HTML + BODY ELEMENTS
\*------------------------------------*/
/**
	* 1. Sets minimum base font size
	* 2. Automatic responsive typopgraphy via viewport units
	* 3. Sets maximum base font size
	*/
html {
  font-size: $bolt-font-size--min-px; /* [1] */

  @include bolt-mq(medium) {
    font-size: calc(#{$font-size--min-px} + (#{$font-size--max - $font-size--min} * (100vw - #{$breakpoint--min}) / #{strip-unit($breakpoint--max) - strip-unit($breakpoint--min)})); /* [2] */
  }

  @include bolt-mq(xlarge) {
    font-size: $font-size--max-px; /* [3] */
  }
}
```

### Defined as T-shirt Sizes <sup>[5](#5-naming-things-using-t-shirt)</sup>
As with most sizing options in Bolt, font sizes are categorized and referenced as `t-shirt` sizes, with `medium` being the default base font size (ie. the font size on the <body> or <html> tag), with each t-shirt size option being one step larger/smaller in the typographic modular scale.


## Further Reading:
<h3 id="learn-about-itcss">1. Learn more about ITCSS</h3>

- [Harry Roberts - Managing CSS Projects with ITCSS - YouTube](https://www.youtube.com/watch?v=1OKZOV-iLj4)
- [ITCSS: Scalable and Maintainable CSS Architecture - Xfive](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [Manage large CSS projects with ITCSS | Creative Bloq](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)
- [How I Shrank my CSS by 84kb by Refactoring with ITCSS](https://medium.com/@jordankoschei/how-i-shrank-my-css-by-84kb-by-refactoring-with-itcss-2e8dafee123a)


<h3 id="font-size-rems">2. Rems for Font Sizes</h3>

- [There’s more to the CSS rem unit than font sizing | CSS-Tricks](https://css-tricks.com/theres-more-to-the-css-rem-unit-than-font-sizing/)	
- [Font Size Idea: px at the Root, rem for Components, em for Text Elements | CSS-Tricks](https://css-tricks.com/rems-ems/)
- [Guide: EM vs REM vs PX. Which should you use? | Engage](http://engageinteractive.co.uk/blog/em-vs-rem-vs-px)

<h3 id="line-heights-included">3. Unitless Line Heights</h3>

- [line-height | CSS-Tricks](https://css-tricks.com/almanac/properties/l/line-height/#article-header-id-0)
- [Nope, nope, nope, line-height is unitless · Matt Smith](http://allthingssmitty.com/2017/01/30/nope-nope-nope-line-height-is-unitless/)

<h3 id="fluid-typography-modular-scale">4. Fluid typography / modular scale</h3>

- [Fluid Responsive Typography With CSS Poly Fluid Sizing – Smashing Magazine](https://www.smashingmagazine.com/2017/05/fluid-responsive-typography-css-poly-fluid-sizing/)
- [Responsive Typography with Sass Maps](https://www.smashingmagazine.com/2015/06/responsive-typography-with-sass-maps/#organizing-font-sizes-with-sass-maps)
- [GitHub - modularscale/modularscale-sass: Modular scale calculator built into your Sass](https://github.com/modularscale/modularscale-sass)

<h3 id="naming-things-using-t-shirt-sizes">5. Naming things using t-shirt</h3>

- [Space in Design Systems – EightShapes – Medium](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)

