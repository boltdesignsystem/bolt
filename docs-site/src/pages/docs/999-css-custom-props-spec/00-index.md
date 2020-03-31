---
title: CSS Custom Props Spec
category: Architecture
hidden: false
---

- [TLDR Spec](#tldr-spec)
- [Global Tokens](#global-tokens)
  - [Syntax](#syntax)
  - [Global Tokens Example](#global-tokens-example)
  - [Mapping Global Tokens to ITCSS](#mapping-global-tokens-to-itcss)
- [Context & Token-specific Variables (Themes, Density, UI Types)](#context--token-specific-variables-themes-density-ui-types)
  - [Syntax](#syntax-1)
  - [Theming Examples](#theming-examples)
  - [Density Examples (TBD)](#density-examples-tbd)
- [Component-specific Tokens (Buttons, Cards, etc)](#component-specific-tokens-buttons-cards-etc)
  - [Syntax](#syntax-2)
  - [Component-specific Examples](#component-specific-examples)
- [Do's and Don'ts](#dos-and-donts)
- [Things To Consider](#things-to-consider)
- [Implementation Details](#implementation-details)
- [Questions](#questions)
- [References](#references)

---


## TLDR Spec

- Bolt has 3 tiers of CSS custom properties
  1. **Global** (prefix-less `--bolt-`) for raw design token values
  2. **Context or Token-specific** (`--t-bolt-` prefix) for defaults shared across UI like themes
  3. **Component-specific** (`--c-bolt-` prefix) for component-specific variables

```
// global
--bolt-color-yellow: ...
--bolt-color-indigo-dark: ...
--bolt-shadow-300

// contextual / token-specific
--t-bolt-[token-name]: ...
--t-bolt-primary: ...
--t-bolt-secondary--active: ...

// component-specific
--c-bolt-card-bg:
--c-bolt-button-bg: ...
```
---

## Global Tokens
- TLDR: Basically ITCSS `settings.scss` layer as flat static CSS custom property values
- no double-dashes in any of the names beyond the `--bolt-` at the start of the variable; only single dashes.
- not component or use-case specific
- think of these as pure raw ingredients that can be used anywhere

### Syntax

```
--bolt-[NAME]-[VALUE]-[OPTIONAL VARIANT]
```

### Global Tokens Example

```
--bolt-color-indigo
--bolt-spacing-lg
--bolt-opacity-50
```


### Mapping Global Tokens to ITCSS

<bolt-table first-col-fixed-width>

| Token           | CSS Custom Property Name |
| ---             | ---                                                                     |
| Border Radius   | `--bolt-border-radius-full`      <br> `--bolt-border-radius-sm`      |
| Breakpoints     | `--bolt-breakpoint-xxs`          <br> `--bolt-breakpoint-md`        |
| Colors          | `--bolt-color-indigo-xdark`        <br> `--bolt-color-red`                |
| Font family     | `--bolt-font-family-heading`     <br> `--bolt-font-family-body`         |
| Font size       | `--bolt-font-size-xs`            <br> `--bolt-font-size-md`         |
| Line height     | `--bolt-line-height-md`          <br> `--bolt-line-height-md-tight` |
| Font weight     | `--bolt-font-weight-light`       <br> `--bolt-font-weight-bold`         |
| Transitions     | `--bolt-transition-fast`         <br> `--bolt-transition-slow`          |
| Opacity         | `--bolt-opacity-20`              <br> `--bolt-opacity-50`               |
| Spacing         | `--bolt-spacing-md`              <br> `--bolt-vspacing-md`          |
| Shadows         | `--bolt-shadow-100`              <br> `--bolt-shadow-300`               |

</bolt-table>

> Note: we should consider renaming status colors to pure color names + move down to the context layer

---

## Context & Token-specific Variables (Themes, Density, UI Types)

- Theming system definitions (previously living in `settings`)
- New `density` layer
- Generic component defaults could also live here (previously in `settings.global.scss`)
- `--t-bolt-` prefix in the name

> NOTE: As a rule of thumb: if 2 or more bits of UI should stay magically in sync, it might make sense to define that shared rule here.

### Syntax

```
--bolt-[Context]-[SCOPE]-[PROP]--[MODIFIER]
/**
  * Context will likely be one of 3 things: 
  * - `theme`
  * - `density`
  * - `ui` (maybe...)
  */
    --bolt-theme-[SCOPE]-[PROP]--[MODIFIER]  //--> color palette
  --bolt-density-[SCOPE]-[PROP]--[MODIFIER] //--> spacing density
       --bolt-ui-[SCOPE]-[PROP]--[MODIFIER] // --> UI defaults
/**
  * Note: because themes ONLY affect color, putting `color` 
  * in the name shouldn't be necessary
  **/
--t-bolt-background
--t-bolt-border
--t-bolt-text
--t-bolt-icon
--t-bolt-primary
--t-bolt-primary--disabled
```


### Theming Examples

```
--t-bolt-heading
--t-bolt-text
--t-bolt-bg-color
--t-bolt-bg-gradient
--t-bolt-border

--t-bolt-primary-bg-color
--t-bolt-primary-bg-color--hover

--t-bolt-primary-shadow
--t-bolt-primary-shadow--raised

--t-bolt-secondary-text
--t-bolt-secondary-text--disabled
--t-bolt-tertiary-border-color

--t-bolt-text-on-background
--t-bolt-heading-on-background
--t-bolt-text-on-primary
--t-bolt-text-on-secondary
--t-bolt-text-on-tertiary

```

### Density Examples (TBD)

```
--t-bolt-density-spacing-xl
--t-bolt-density-vspacing-md
--t-bolt-density-font-size-md
--t-bolt-density-line-height-md
```

> NOTE: this UI-specific detail is one thing in still a little on the fence with... 

---

## Component-specific Tokens (Buttons, Cards, etc)

- doesn't have to be 1:1 to the component name
- doesn't (and probably **shouldn't**) be required to map to a specific css property
- the shorter (within reason), the better; when in doubt, prefer clarity over conciseness
- `--c-bolt-` prefix in the name

### Syntax

```
--c-bolt-[COMPONENT-NAME]-[PURPOSE]--[STATE/MODIFIER]`
        ^- who            ^- what    ^- when / how

--c-bolt-button-bg--hover: ...
```

### Component-specific Examples

```css
// ex. button vars
--c-bolt-button-bg: ...
--c-bolt-button-bg--hover: ...
--c-bolt-button-bg--active: ...
--c-bolt-button-bg--disabled: ..
--c-bolt-button-border-width
--c-bolt-button-border-color

// ex. icon vars
--c-bolt-icon-color:
--c-bolt-icon-bg:
--c-bolt-icon-bg-opacity:
--c-bolt-icon-size-md:
--c-bolt-icon-size-lg:

// ex. card vars
--c-bolt-card-shadow
--c-bolt-card-shadow--raised
--c-bolt-card-spacing
--c-bolt-card-spacing--lg
--c-bolt-card-radius
--c-bolt-card-radius--lg
--c-bolt-card-bg-color

```

---


## Do's and Don'ts

<div class="o-bolt-grid o-bolt-grid--flex">
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: green;">Use single dashes for everything but states (`--active`, `--selected`, etc)</h3>
    
```
// Examples
--c-bolt-link-opacity--hover: ...
--c-bolt-link-opacity--active: ...

// Possible states
--checked
--unchecked
--default
--current 
--empty
--read-only
--enabled
--disabled
--visited
--hover
--active
--focus
--valid
--invalid
--fullscreen 
```
</code>
  </div>
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: red;"><em>Only</em> use double-dashes for states</h3>

```
--c-bolt--link--text--disabled
--c-bolt--button--raised
```
</code>
  </div>
</div>


<div class="o-bolt-grid o-bolt-grid--flex">
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: green;">Do use the full component name</h3>

```
--c-bolt-button-bg
--c-bolt-band-spacing
```
</code>
  </div>
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: red;">Avoid using component nicknames</h3>

```
--c-bolt-btn-bg
--c-bolt-feature-band-spacing
```
</code>
  </div>
</div>



<div class="o-bolt-grid o-bolt-grid--flex">
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: green;">Do use shorter variable names</h3>

```
`bg` instead of `background`
`shadow` instead of `box-shadow`

...

--c-bolt-button-bg         
--c-bolt-button-shadow
```
</code>
  </div>
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: red;">Don't use verbose names</h3>

```
--c-bolt-button-background
--c-bolt-button-box-shadow
```
</code>
  </div>
</div>


<div class="o-bolt-grid o-bolt-grid--flex">
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: green;">Use shorter t-shirt sizes</h3>

```
--bolt-font-size-md
--bolt-shadow-lg

--c-bolt-band-spacing-xl
--c-bolt-card-spacing-md
```
</code>
  </div>
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: red;">Don't use longhand t-shirt sizes</h3>

```
--bolt-font-size-medium
--bolt-shadow-large

--c-bolt-band-spacing-xlarge
--c-bolt-card-spacing-medium
```
</code>
  </div>
</div>


<div class="o-bolt-grid o-bolt-grid--flex">
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: green;">Use `-X00` suffix for items in a series like shadows</h3>

```
--bolt-shadow-100
--bolt-shadow-500
```
</code>
  </div>
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: red;">Don't use the `-X00` suffix in spacing</h3>
    <br>

```
--bolt-spacing-100
--bolt-spacing-500
```
</code>
  </div>
</div>


<div class="o-bolt-grid o-bolt-grid--flex">
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: green;">Always omit `color` in `--bolt-theme` vars</h3>

```
--t-bolt-bg
--t-bolt-primary
```
</code>
  </div>
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: red;">Don't include `color` in theme vars</h3>

```
--t-bolt-bg-color
--t-bolt-primary-color
```
</code>
  </div>
</div>

<div class="o-bolt-grid o-bolt-grid--flex">
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: green;">Do use `color` in global vars</h3>

```
--bolt-color-indigo
--bolt-color-orange
--bolt-color-yellow-dark
```
</code>
  </div>
  <div class="o-bolt-grid__cell u-bolt-width-6/12">
    <h3 style="color: red;">Don't omit `color` in global vars</h3>

```
--bolt-indigo
--bolt-orange
--bolt-yellow-dark
```
</code>
  </div>
</div>

---

## Things To Consider
- **Verbosity** (the simpler, the better)
  - We should try to favor using _shorter_ variable names instead of trying to match the CSS property being used. (discussion needed)
- **Web Performance**
  - Utility classes are the largest contributor to our large CSS file size. Auto-generated CSS custom prop values are probably the 2nd largest contributor to our large CSS file size...
- **Intuitive** (aka the best docs are no docs)
  - The simpler the naming convention, the easier it is to adopt and use (plus requires less docs to reference)

## Implementation Details

1. Switch to use Amazon's [Style Dictionary](https://github.com/amzn/style-dictionary) to auto-convert design tokens into the different formats required (including converting into Sass Maps...)
   - These should most likely be defined as JSON (Style Dictionary's default) OR preferably as `.js` files (my personal preference + also supported by Style Dictionary)
2. New Sass tooling + updates to existing Sass tooling required
3. Our existing ITCSS `settings.global.scss` file goes away and gets broken out into other (new) settings / token files appropriately
     - Most of our other existing ITCSS settings files should map out quite nicely
4. ~Global vars only use single dashes. Context and component-specific vars use double-dashes after the `--bolt-[THING]` prefix~ Only use single dashes for custom prop names unless it's for a modifier at the end (ex. `--active`, `--raised`, or `--disabled`)

---

## Questions
1. How do we handle surfaces / overlays in the context of themes (ex. Navbar dropdown within different themes)?
2. When do we / don't include a default CSS custom property value?

## References

- https://www.duetds.com/tokens/
- https://www.patternfly.org/v4/design-guidelines/styles/colors
- https://github.com/castastrophe/wc-theming-standards/wiki/Proposed-variables
- https://github.com/material-components/material-components-web/blob/master/docs/theming.md
