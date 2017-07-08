[![Build Status](https://travis-ci.org/pega-digital/pegakit-css.svg?branch=master)](https://travis-ci.org/pega-digital/pegakit-css)

# PegaKit CSS
**PegaKit's site-agnostic CSS Framework core.**

<!--# Sky CSS Style Guide

> Believe in Better CSS

An Evolving CSS / Sass Style Guide for Sky

## Contents

### Writing CSS / Sass

* [Template](#template)
* [Architecture](#architecture)
* [Formatting](#formatting)
* [Selectors and Naming](#selectors-and-naming)
* [Properties](#properties)
* [Extending and Modifying](#extending-and-modifying)
* [Specificity](#specificity)
* [Resources](#resources)

### Linter

* [Installation](#installation)
* [Versioning](#versioning)
* [Maintainers](#maintainers)

---

## Writing CSS / Sass

### Template

Before diving into the details of CSS coding style, you can find a Sky-conformant `.scss` template over at [git.io/template](https://git.io/template).

Instantly get started with:

```
curl -L git.io/template -o _<your-file-name>.scss
```

[⬆ Back to contents](#contents)

### Architecture

Project stylesheets should be structured following closely to the principles of [ITCSS](https://medium.com/@jordankoschei/how-i-shrank-my-css-by-84kb-by-refactoring-with-itcss-2e8dafee123a#.7gdzbrk1m), imported in the following order for greater control over re-usability and specificity:

0. **Settings** - Global configuration and variables.
0. **Tools** - Mixins and functions.
0. **Generic** - High-level styles such as resets and [normalize.css](https://github.com/necolas/normalize.css).
0. **Elements** - Base HTML styling.
0. **Objects** - Common non-cosmetic structural design patterns.
0. **Components** - Specific cosmetic elements of UI.
0. ~~Trumps~~ **Utilities** - Helpers and overrides.

[⬆ Back to contents](#contents)

### Formatting

* Use soft tabs (**2** spaces) for indentation.
* Use lower-case hyphenated naming over camelCase.
* Put a space before an opening bracket `{` and a new line after.
* Put a new line before and after a closing bracket `}`.
* Put a space after, but not before, a colon `:`.
* Put a new line after a semi-colon `;`, with no space before.
* Don't leave more than **1** line empty.
* Use `// comment` commenting for non-outputted SCSS (e.g. settings, functions).
* Use `/* comment */` commenting for all other SCSS
  * Outputted comments are useful for debugging, and can always be removed later in production using various build tools.
* Leave an empty line at the end of a file.
* Use leading zeros for decimal values (e.g. `0.5` instead of `.5`) for better readability.
* Don't specify units for zero values (e.g. `0` instead of `0px`).

[⬆ Back to contents](#contents)

### Selectors and Naming

It's important we keep code transparent and self-documented when it comes to naming our selectors.

:x: **Don't**

* **Don't** use `html` tags in selectors.
* **Don't** use IDs (`#`) in selectors.
* **Don't** unnecessarily nest selectors.
  * Try to keep selectors flat, at the same level of specificity.
  * Avoid going more than 2 levels deep.

:white_check_mark: **Do**

* **Do** use classes.

[⬆ Back to contents](#contents)

#### BEM

**B**lock, **E**lement, **M**odifier

[BEM](http://getbem.com/naming/) is naming convention that aims to improve readability and re-usability.

All CSS class names should follow the BEM pattern.

##### Block

A block represents an independent component and should **specifically** describe its purpose.

```html
<div class="block"></div>
```

For more detail on BEM blocks, visit [bem.info](https://en.bem.info/methodology/quick-start/#block).

##### Element

Elements represent parts of a block and cannot be used separately, they have no standalone meaning.

An element should be named to describe its purpose, prefixed with a double underscore `__` to separate from the block.

```html
<div class="block">
  <div class="block__element">
  </div>
</div>
```

In your stylesheet this would look like:

```scss
.block {
  /* block styles here */
}

.block__element {
  /* element styles here */
}
```

Avoid using the SCSS ampersand shortcut (`&__`) when defining elements, it'll make searching your codebase a lot less productive.

:warning: **Don't** create elements inside elements (e.g. `.block__element__element`). Consider creating a new block for the parent element instead.

For more detail on BEM
elements, visit [bem.info](https://en.bem.info/methodology/quick-start/#element).

##### Modifier

Modifiers define a change in cosmetics, used alongside a block or element.

Changes in a state shouldn't be dictated by modifiers, and are handled [slightly differently](#states).

A modifier should be named to describe its purpose, prefixed with a double hyphen `--` to separate from the block or element.

```html
<div class="block block--modifier">
  <div class="block__element">
  </div>
</div>
```

and / or

```html
<div class="block">
  <div class="block__element block__element--modifier">
  </div>
</div>
```

In your stylesheet this would look like:

```scss
.block {
  /* block styles here */
}

.block--modifier {
  /* modifier styles here */
}
```

Avoid using the SCSS ampersand shortcut (`&--`) when defining elements, it'll make searching your codebase a lot less productive.

For more detail on BEM
modifiers, visit [bem.info](https://en.bem.info/methodology/quick-start/#modifier).

#### States

* `is-`
* `has-`

State prefixes signify that the piece of UI in question is currently styled a certain way because of a [state or condition](https://smacss.com/book/type-state). It tells us that the DOM currently has a temporary, optional, or short-lived style applied to it due to a certain state being invoked.

```html
<div class="c-example is-active"></div>
```

or

```html
<div class="c-example">
  <div class="c-example__element is-active">
  </div>
</div>
```

#### Namespacing

Following a prefix convention provides better insight into a class' purpose for other developers to work with.

* `o-` signifies that this class is an **Object**, and that it may be used in any number of unrelated contexts to the one you can currently see it in. :warning: Making modifications to these types of class could potentially have knock-on effects in a lot of other unrelated places.
* `c-` signifies that this class is a **Component**. This is a concrete, implementation-specific piece of UI. All of the changes you make to its styles should be detectable in the context you're currently looking at. Modifying on top of these styles should be safe and have no side effects.
* `u-` signifies that this class is a **Utility** class. It has a very specific role (often providing only one declaration) and should not be bound onto or changed. It can be reused and is not tied to any specific piece of UI. You will probably recognise this namespace from libraries and methodologies like SUIT.
* `t-` signifies that a class is responsible for adding a **Theme** to a view. It lets us know that UI Components' current cosmetic appearance may be due to the presence of a theme.
* `js-` signifies that this piece of the DOM has some **behaviour** acting upon it, and that JavaScript binds onto it to provide that behaviour. If you're not a developer working with JavaScript, leave these well alone.
* `qa-` signifies that a **QA or Test Engineering** team is running an automated UI test which needs to find or bind onto these parts of the DOM. Like the JavaScript namespace, this reserves hooks in the DOM for non-CSS purposes.

[⬆ Back to contents](#contents)

### Properties

Properties should be ordered in the following manner (a style similar to [Dropbox](https://github.com/dropbox/css-style-guide#rule-ordering)) to promote readability:

0. **@include** - use your previously-defined mixins right at the start for ease of modification and readability.
0. **Structure** - `display`, `position`, `margin`, `padding`, `width`, `height`, `box-sizing`, `overflow` etc.
0. **Typography** - `font-*`, `line-height`, `text-*`, `letter-spacing` etc.
0. **Cosmetic** - `color`, `background-*`, `border-*`, `animation`, `transition` etc.
0. **Native interaction** - `appearance`, `cursor`, `user-select`, `pointer-events` etc.
0. **Pseudo-elements** - `::before`, `::after` etc.
0. **Nested elements**
0. **Pseudo-classes** - `:hover`, `:focus`, `:active` etc.
0. **@media** - media queries should be defined last for ease of modification and readability.

Defining separately:

0. [**State classes**](#states)
0. [**Modifier classes**](#bem)

##### Example

```scss
.c-example {
  @include example-mixin();
  padding: 20px;
  position: relative;
  font-size: 1.25em;
  color: black;
  border: solid 1px grey;
  transition: border 1s ease;

  &:focus,
  &:hover {
    text-decoration: underline;
    border: solid 1px black;
  }

  @media(min-width: 721px) {
    font-size: 1em;
  }
}

.c-example__heading {
  text-transform: uppercase;
}

/* States
  =========================================== */

.c-example.is-active {
  border: solid 1px blue;
}

/* Modifiers
  =========================================== */

.c-example--large {
  font-size: 2.5em;
}
```

[⬆ Back to contents](#contents)

### Extending and Modifying

:warning: **Never** use `@extend`.

Extending styles isn't flexible and leads to bloated stylesheets. When re-building common styles, `@mixin`s are always a more powerful and stable approach.

:warning: **Never** directly overwrite a previously defined class.

Avoid the confusion of selectors being defined in multiple places by using a new [BEM](#bem) `--modifier` class.

```scss
/* .c-example is a component defined earlier in the project */

/* Don't overwrite the class */
.c-example {
  color: red;
}

/* Do create a new `--modifier` class */
.c-example--error {
  color: red;
}
```

[⬆ Back to contents](#contents)

### Specificity

By following the steps above (specifically by using classes and limited nesting) conflicts with specificity shouldn't be a problem.

:warning: **Never** use `!important`

If you're struggling to override styles, battling specificity, the safest option is to [chain the selector to itself](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/#safely-increasing-specificity). In SCSS we can achieve this by:

```scss
/**
 * Doubling up a selector's specificity in SCSS.
 *
 * 1. Outputs as `.c-example.c-example`
 *
 */

.c-example {
  color: #4a4a4a;

  &#{&} { /* [1] */
    text-decoration: none;
  }
}
```

[⬆ Back to contents](#contents)

### Resources

#### Reference

* [CSS Almanac (CSS-Tricks)](https://css-tricks.com/almanac/)
* [cssreference.io](http://cssreference.io/)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

#### Guides

* [Code Guide](http://codeguide.co/)
* [CSS Guidelines](http://cssguidelin.es/)
* [idiomatic-css](https://github.com/necolas/idiomatic-css)
* [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)

#### Organisation Style Guides

* [Airbnb](https://github.com/airbnb/css)
* [Dropbox](https://github.com/dropbox/css-style-guide)
* [Primer (GitHub)](http://primercss.io/guidelines/)

[⬆ Back to contents](#contents)

---

## Linter

### Installation

Our CSS linter runs on [Stylelint](https://github.com/stylelint/stylelint), you can install the configuration by running:

```
$ npm install stylelint-config-sky-uk --save
```

After installing, create/amend your `.stylelintrc` to extend the config:

```
{
  "extends": "stylelint-config-sky-uk"
}
```

### Usage

Run the following command to lint all `.scss` files in your project directory.:

```
$ stylelint '**/*.scss' --syntax scss
```

To ignore dependency folders such as `node_modules`, you'll need to create a [`.stylelintignore`](https://github.com/sky-uk/css/blob/master/.stylelintignore) file or use `--ignore-path` in the CLI.

### Versioning

The CSS Style Guide follows [Semantic Versioning](http://semver.org) to help manage the impact of releasing new library versions.

### Maintainers

The CSS Style Guide is maintained by the [Toolkit Champions](https://github.com/sky-uk/toolkit#champions).-->