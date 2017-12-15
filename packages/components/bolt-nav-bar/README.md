# bolt/components-nav-bar
Nav-bar is a list of secondary links. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

## Demo

```
<bolt-nav-bar bolt-component>
  <bolt-band size="xsmall" theme="dark" bolt-component>
    <div class="c-bolt-band c-bolt-band--xsmall c-bolt-band--full t-bolt-dark">
      <bolt-wrapper size="xxlarge" full="true" bolt-object>
        <div class="o-bolt-wrapper o-bolt-wrapper--xxlarge o-bolt-wrapper--full">
          <bolt-background bolt-component>
            ...
          </bolt-background>
          <div class="c-bolt-band__content">
            <nav class="c-bolt-nav-bar">
              <div class="c-bolt-nav-bar__title">
                <div class="c-bolt-nav-bar__title-item">
                  <bolt-icon name="icon-name" size="large"></bolt-icon>
                </div>
                <div class="c-bolt-nav-bar__title-item">
                  <h2 class="c-bolt-text c-bolt-text--semibold c-bolt-text--normal c-bolt-text--large">
                    <span class="c-bolt-text__text">
                      Title
                    </span>
                  </h2>
                </div>
              </div>
              <div class="c-bolt-nav-bar__nav">
                ...
              </div>
            </nav>
          </div>
        </div>
      </bolt-wrapper>
    </div>
  </bolt-band>
</bolt-nav-bar>
```

- - - -

## Table of Contents
- [Cheat Sheet](#cheat-sheet)
- [Getting Started](#getting-started)
- [Further Reading](#further-reading)

## Cheat Sheet
### Install via NPM
```
npm install @bolt/components-nav-bar
```

- - - -

## Getting Started
The best way to start using Bolt is via the *Bolt Starterkit* (coming soon), a pre-assembled front-end boilerplate designed to get you up and running as quickly as possible.

You can also use the full [Bolt Core](https://www.npmjs.com/package/@bolt/core) CSS framework on its own, or, install just the parts you need and fold the different ITCSS layers of Bolt into your existing codebase.

Installing Bolt’s Nav-bar component is as easy as running NPM install:

```
npm install @bolt/components-nav-bar
```

> **TIP:**: Don’t have a `package.json` file? Need a little help getting started? Check out our [Getting Started](https://www.boltdesignsystem.com/getting-started) guide for some tips to help get you up to speed.

### Usage
Once installed, you should  `@import`  the main Sass partial into your project’s main `.scss` file to make the included variables available to the rest of your code.

```
// Settings
@import '@bolt/settings-global';
@import '@bolt/settings-colors';
@import '@bolt/settings-font-size';
@import '@bolt/settings-font-weight';

// Tools
@import '@bolt/tools-spacing';
@import '@bolt/tools-color-palette';
@import '@bolt/tools-font-size';
@import '@bolt/tools-font-weight';

```

Since Bolt’s CSS architecture is based on [ITCSS (Inverted Triangle CSS)](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)<sup>[1](#1-learn-more-about-itcss)</sup>, what Sass partials you import, and in what order, makes a whole world of difference. That’s why importing any Settings packages from Bolt in your project’s Settings layer (prior to any Sass mixins, resets, base HTML element styles, etc) is so important.

### Compiling
We recommend using Bolt’s Gulp-based [front-end build tools](https://www.npmjs.com/package/@bolt/build-tools) to compile your Sass as we’re pre-packaging many of the latest tools and add-ons to help you write your very best: LibSass, Autoprefixer, PostCSS, CleanCSS, Sassdoc, Stylelint, Gulp Plumber, npm-sass, and BrowserSync live reloading.

- - - -

## Further Reading:
<h3 id="learn-about-itcss">1. Learn more about ITCSS</h3>

- [Harry Roberts - Managing CSS Projects with ITCSS - YouTube](https://www.youtube.com/watch?v=1OKZOV-iLj4)
- [ITCSS: Scalable and Maintainable CSS Architecture - Xfive](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [Manage large CSS projects with ITCSS | Creative Bloq](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)
- [How I Shrank my CSS by 84kb by Refactoring with ITCSS](https://medium.com/@jordankoschei/how-i-shrank-my-css-by-84kb-by-refactoring-with-itcss-2e8dafee123a)
