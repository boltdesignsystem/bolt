---
title: SCSS coding conventions
label: SCSS
---

In order to enforce consistent conventions and avoid errors in our stylesheets, we use the mighty [stylelint](https://stylelint.io/) linter.

## Rules

### Presets

We use the following presets:
-   [stylelint-config-sass-guidelines](https://github.com/bjankord/stylelint-config-sass-guidelines), a config based on [Sass Guidelines](https://sass-guidelin.es/)
-   [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard), a standard config derived from the common rules found within a handful of CSS styleguides, including: [The Idiomatic CSS Principles](https://github.com/necolas/idiomatic-css),
[GitHub's PrimerCSS Guidelines](http://primercss.io/guidelines/#scss),
[Google's CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html#CSS_Formatting_Rules), [Airbnb's Styleguide](https://github.com/airbnb/css#css), and [@mdo's Code Guide](http://codeguide.co/#css)

### Plugins

Furthermore, we added the [stylelint-selector-bem-pattern](https://github.com/davidtheclark/stylelint-selector-bem-pattern) plugin to check the validity of selectors against our BEM-style conventions. All the classes we provide should follow the `.ecl-block__element--modifier` pattern.

In order to enable the BEM-style validation, you have to define a component with a comment.

```scss
/** @define label */
.ecl-label {}
.ecl-label--primary {}
```

More information can be found on [postcss-bem-linter](https://github.com/postcss/postcss-bem-linter#defining-a-component-and-utilities)'s project.

### Configuration

All the rules are made availble through our [stylelint-config-ecl](https://github.com/ec-europa/ecl-toolkit/tree/master/packages/stylelint-config-ecl) config. You are not supposed to override this configuration.

## Automatically formats stylesheets

You can try to use [stylefmt](https://github.com/morishitter/stylefmt) to format your stylesheets automatically. It can save you a lot of time but it can also introduce new errors.

For this reason, we don't officially support it. Use it at your own risk.

## IDE integration

Plugins for both stylelint and stylefmt are available for major editors like Atom and Sublime Text.
