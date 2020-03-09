---
title: Bolt CSS Custom Props Spec (Draft)
category: Architecture
hidden: false
---

<bolt-text font-size="large" font-weight="bold" class="u-bolt-margin-bottom-none">
  Recommendations + Notes:
</bolt-text>

- In general, Bolt has 3 tiers of CSS custom properties
  1. **Global** (pure vars / values)
  2. **Context-specific** (opinionated defaults shared across multiple things)
  3. **Component-specific** (tokens for specific components like buttons, links, etc)

### Implementation Details

1. Switch to use Amazon's [Style Dictionary](https://github.com/amzn/style-dictionary) to auto-convert design tokens into the different formats required (including converting into Sass Maps...)
   - These should most likely be defined as JSON (Style Dictionary's default) OR preferably as `.js` files (my personal preference + also supported by Style Dictionary)
2. New Sass tooling + updates to existing Sass tooling required
3. Our existing ITCSS `settings.global.scss` file goes away and gets broken out into other (new) settings / token files appropriately
  - Most of our other existing ITCSS settings files should map out quite nicely
4. Global vars only use single dashes. Context and component-specific vars use double-dashes after the `--bolt-[THING]` prefix

### Considerations:
- **The simpler, the better** (Limiting Verbosity)
  - We should try to favor using _shorter_ variable names instead of trying to match the CSS property being used. (discussion needed)
- **Web performance**
  - Utility classes are the largest contributor to our large CSS file size. Auto-generated CSS custom prop values are probably the 2nd largest contributor to our large CSS file size...
- **Best Docs Are No Docs**
  - The simpler the naming convention, the easier it is to adopt and use (plus requires less docs to reference)

## Questions + Discussion Points:
1. No more `rgba(var(--bolt-theme-primary), .5)` and instead favor `--bolt-theme-primary--transparent-50` or `--bolt-theme-primary--alpha-50` or something; basically transparency is part of our global tokens
2. Retire `bolt-color(indigo, xlight)` and instead move to `bolt-color(indigo-500)`, `bolt-color(indigo-100)`, etc 
   - alt. re-introduce (`light|lighter|lightest|dark|darker|darkest`)?
   - Ex. `bolt-color(indigo, lightest)`
3. Do we _REALLY_ need a `--default` suffix for UI that has multiple states?
   - `--bolt-button--background-color` vs `--bolt-button--background-color--default`
4. Do we _REALLY_ need to include `-color` suffix on everything?
  - `--bolt-btn--background` === `--bolt-btn--background-color` acceptable shorthand?
  - `--bolt-btn--text` === `--bolt-btn--text-color` acceptable shorthand?
  - `--bolt-button--border` === `--bolt-btn--border-color` acceptable shorthand?
5. Sass tooling
6. When, where, why, and how do we handle CSS custom prop fallbacks
3. How do utility classes tie into all of this?


```
--bolt-font-size-md
// vs
--bolt-font-size-medium
```

```
--bolt-shadow-lg
// vs
--bolt-shadow-large
```

```
--bolt-btn--bg
--bolt-btn--bg-color
--bolt-btn--background
--bolt-btn--background-color

--bolt-button--bg
--bolt-button--bg-color
--bolt-button--background
--bolt-button--background-color
```


# References

- https://www.duetds.com/tokens/
- https://www.patternfly.org/v4/design-guidelines/styles/colors
- https://github.com/castastrophe/wc-theming-standards/wiki/Proposed-variables
- https://github.com/material-components/material-components-web/blob/master/docs/theming.md

<hr>

<bolt-text font-size="xxxlarge" tag="h2" font-weight="semibold">
  #1. Global Tokens
</bolt-text>

<bolt-text font-size="large" font-weight="bold" class="u-bolt-margin-bottom-none">
  Syntax
</bolt-text>

<bolt-code-snippet lang="html">--bolt-[NAME]-[VALUE]-[OPTIONAL VARIANT]</bolt-code-snippet>

<bolt-text font-size="xlarge" tag="h3" font-weight="light" class="u-bolt-margin-bottom-none">
  Notes:
</bolt-text>

- TLDR: Basically ITCSS `settings.scss` layer as flat static CSS custom property values
- no double-dashes in any of the names beyond the `--bolt-` at the start of the variable; only single dashes.
- not component or use-case specific
- think of these as pure raw ingredients that can be used anywhere

```
--bolt-color-indigo
--bolt-spacing-large
--bolt-opacity-50
```


### Mapping Global Tokens to ITCSS Settings

<bolt-table first-col-fixed-width>

| Token           | CSS Custom Property Name |
| ---             | ---                                                                     |
| Border Radius   | `--bolt-border-radius-full`      <br> `--bolt-border-radius-small`      |
| Breakpoints     | `--bolt-breakpoint-xxsmall`      <br> `--bolt-breakpoint-medium`        |
| Colors          | `--bolt-color-indigo-xdark`      <br> `--bolt-color-red`                |
| Font family     | `--bolt-font-family-heading`     <br> `--bolt-font-family-body`         |
| Font size       | `--bolt-font-size-xsmall`        <br> `--bolt-font-size-medium`         |
| Line height     | `--bolt-bolt-line-height-medium` <br> `--bolt-line-height-medium-tight` |
| Font weight     | `--bolt-font-weight-light`       <br> `--bolt-font-weight-bold`         |
| Transitions     | `--bolt-transition-fast`         <br> `--bolt-transition-slow`          |
| Opacity         | `--bolt-opacity-20`              <br> `--bolt-opacity-50`               |
| Spacing         | `--bolt-spacing-medium`          <br> `--bolt-vspacing-medium`          |
| Shadows         | `--bolt-shadow-100`              <br> `--bolt-shadow-300`               |

</bolt-table>

> Note: we should consider renaming status colors to pure color names + move down to the context layer

<hr>

<bolt-text font-size="xxxlarge" tag="h2" font-weight="semibold">
  #2. Context-specific Tokens (Themes, Density, UI Types)
</bolt-text>

- Theming system definitions (previously living in `settings`)
- New `density` layer
- Generic component defaults also live here (some previously in `global.scss`)

> NOTE: As a rule of thumb: if 2 or more bits of UI should stay magically in sync, it might make sense to define that shared rule here.

### Syntax

<bolt-code-snippet lang="css">
--bolt-[Context]--[SCOPE]--[PROP]--[MODIFIER]
/**
  * Context will likely be one of 3 things: 
  * - `theme`
  * - `density`
  * - `ui` (maybe...)
  */
    --bolt-theme--[SCOPE]--[PROP]--[MODIFIER]  //--> color palette
  --bolt-density--[SCOPE]--[PROP]--[MODIFIER] //--> spacing density
       --bolt-ui--[SCOPE]--[PROP]--[MODIFIER] // --> UI defaults
/**
  * Note: because themes ONLY affect color, putting `color` 
  * in the name shouldn't be necessary
  **/
--bolt-theme--background
--bolt-theme--border
--bolt-theme--text
--bolt-theme--icon
--bolt-theme--primary--bg-color
--bolt-theme--primary--bg-color--disabled
</bolt-code-snippet>


# Notes / Discussion Points

- How do we handle surfaces / overlays in the context of themes (ex. Navbar dropdown within different themes)?

### Theming Examples

```
--bolt-theme--heading
--bolt-theme--text
--bolt-theme--background-color
--bolt-theme--background-gradient
--bolt-theme--border

--bolt-theme--primary--background-color
--bolt-theme--primary--background-color--hover

--bolt-theme--primary--shadow
--bolt-theme--primary--shadow--raised

--bolt-theme--secondary--text
--bolt-theme--secondary--text--disabled
--bolt-theme--tertiary--border-color

--bolt-theme--text-on-background
--bolt-theme--heading-on-background
--bolt-theme--text-on-primary
--bolt-theme--text-on-secondary
--bolt-theme--text-on-tertiary

// --bolt-theme--surface?
// --bolt-theme--overlay?
// --bolt-theme--shadow?
```

### Density Examples

```
--bolt-density--spacing--xlarge
--bolt-density--vspacing--medium
--bolt-density--font-size--medium
--bolt-density--line-height--medium
```

### UI Examples?

```
// By type of thing and/or element
--bolt-ui--text--...
--bolt-ui--headings--...
--bolt-ui--h1--...
--bolt-ui--h6--...

// By component type
--bolt-ui--overlays--...
--bolt-ui--dividers--...
--bolt-ui--input--...
```

> NOTE: this UI-specific detail is one thing in still a little on the fence with... 

<hr>

<bolt-text font-size="xxxlarge" tag="h2" font-weight="semibold">
  #3. Component-specific Tokens (Buttons, Cards, etc)
</bolt-text>


- doesn't have to be 1:1 to the component name
- doesn't (and probably **shouldn't**) be required to map to a specific css property
- the shorter (within reason), the better; when in doubt, prefer clarity over conciseness 

### Syntax

```
--bolt-[COMPONENT-NAME]--[PURPOSE]--[STATE/MODIFIER]`
        ^- who            ^- what    ^- when / how

--bolt-btn--bg-color--hover: ...
```

### Examples

```css
// ex. button vars
--bolt-btn--bg-color: ...
--bolt-btn--bg-color--hover: ...
--bolt-btn--bg-color--active: ...
--bolt-btn--bg-color--disabled: ..
--bolt-btn--border-width
--bolt-btn--border-color

// ex. icon vars
--bolt-icon--color:
--bolt-icon--bg-color:
--bolt-icon--bg-opacity:
--bolt-icon--size--medium:
--bolt-icon--size--large:

// ex. card vars
--bolt-card--shadow
--bolt-card--shadow--raised
--bolt-card--spacing
--bolt-card--spacing--large
--bolt-card--radius
--bolt-card--radius--large
--bolt-card--bg-color

```