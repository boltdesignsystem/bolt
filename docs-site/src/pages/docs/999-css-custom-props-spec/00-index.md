---
title: Bolt CSS Custom Props Spec (Draft)
category: Architecture
hidden: false
---

<bolt-text font-size="large" font-weight="bold" class="u-bolt-margin-bottom-none">
  Recommendations + Notes:
</bolt-text>

1. Switch to use Amazon's [Style Dictionary](https://github.com/amzn/style-dictionary) to auto-convert design tokens into the different formats required (including converting into Sass Maps...)
   - These should most likely should be defined as JSON (Style Dictionary's default) OR preferably as `.js` files (my personal preference + also supported by Style Dictionary)
2. We have 3 tiers of tokens
   - **#1. Global tokens** (pure values)
   - **#2. Context-specific** tokens (opinionated defaults shared across multiple things)
   - **#3. Component-specific** tokens (tokens for specific components like buttons, links, etc)
3. Our existing ITCSS `settings.global.scss` file needs to go away -- break some of these out into other settings / tokens appropriately
  - Most of our other existing ITCSS settings files should map out quite nicely
4. We should try to favor using _shorter_ variable names instead of trying to match the CSS property being used. (discussion needed)

`--bolt-font-size-md` vs `--bolt-font-size-medium` <br>
`--bolt-shadow-lg` vs `--bolt-box-shadow-large` <br>
`--bolt--btn--bg-color` vs `--bolt--button--background-color` <br>

5. `--default` suffix for UI with multiple states is optional?
6. Global vars only use single dashes. Context and component-specific vars use double-dashes


```
// Global
--bolt-color-indigo: ...

// Context-specific
--bolt--theme--text-color: ...
--bolt--density--spacing--medium: ...
--bolt--density--spacing--medium-squished: ...

// Component-specific
--bolt--button--color: ...
--bolt--button--text-color--default: ... // same as previous line?

--bolt--button--bg-color--hover: ...
--bolt--button--bg-color--active: ...
--bolt--button--bg-color--disabled: ...
```

# references

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

<details>
  <summary>Global Token Examples</summary>

<bolt-table first-col-fixed-width>
<table>
  <thead>
    <tr>
      <th scope="col">Type of Token</th>
      <th scope="col">CSS Custom Property Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Border Radius</td>
      <td>

```
--bolt-border-radius-full
--bolt-border-radius-small
--bolt-border-radius-default
--bolt-border-radius-none
```
</td>
    </tr>
    <tr>
      <td>Breakpoints</td>
      <td>

```
--bolt-breakpoint-xxsmall
--bolt-breakpoint-medium
...
--bolt-breakpoint-xxlarge
```
</td>
    </tr>
    <tr>
      <td>Colors</td>
<td>

```
--bolt-color-indigo-xdark
--bolt-color-indigo
--bolt-color-red
--bolt-color-blue-dark
```
<br>
> Note: we might want to consider renaming our existing status colors at this level and redefine at a lower level
</td>
    </tr>
    <tr>
      <td>Font Family</td>
<td>

```
--bolt-font-family-heading
--bolt-font-family-body
--bolt-font-family-code
```
<br>
> Note: nix font-family-bodySubset
</td>
    </tr>
    <tr>
      <td>Font Size</td>
<td>

```
--bolt-font-size-xsmall
--bolt-font-size-medium
--bolt-font-size-xxlarge
```
</td>
    </tr>
    <tr>
      <td>Font Family</td>
<td>

```
--bolt-font-family-heading
--bolt-font-family-body
--bolt-font-family-code
```
<br>
> Note: nix font-family-bodySubset
</td>
    </tr>
    <tr>
      <td>Line height</td>
<td>

```
--bolt-line-height-medium    // default for medium fonts
--bolt-line-height-medium-tight         // tighter line-height for medium-sized fonts
--bolt-line-height-medium-loose         //  looser line-height for large-sized fonts
...
--bolt-line-height-large
```
</td>
    </tr>
    <tr>
      <td>Font Weights</td>
<td>

```
--bolt-font-weight-light
--bolt-font-weight-regular
--bolt-font-weight-semibold
--bolt-font-weight-bold
--bolt-font-weight-extrabold
```
</td>
</tr>

<tr>
<td>Transitions</td>
<td>

```
--bolt-transition-fast
--bolt-transition-slow
```
</td>
    </tr>
    <tr>
      <td>Opacity</td>
<td>

```
--bolt-opacity-0
--bolt-opacity-20
--bolt-opacity-40
--bolt-opacity-50
--bolt-opacity-80
--bolt-opacity-100
// ... etc
```
</td>
    </tr>
    <tr>
      <td>Spacing</td>
<td>

```
// horizontal spacing
--bolt-spacing-medium
--bolt-spacing-medium-squished
--bolt-spacing-medium-stretched
...
// v-spacing
--bolt-vspacing-medium
```
</td>
</tr>
<tr>
  <td>Shadows</td>
  <td>

```
--bolt-shadow-100
--bolt-shadow-300
--bolt-shadow-500
--bolt-shadow-500
--bolt-shadow-900
```
  </td>
</tr>
</tbody>
</table>
</bolt-table>

<!--
--bolt-color-warning
--bolt-color-warning-light
--bolt-color-succes
-->

</details>


<hr>

<bolt-text font-size="xxxlarge" tag="h2" font-weight="semibold">
  #2. Context-specific Tokens (Themes, Density, UI Types)
</bolt-text>

- Theming system definitions (previously living in `settings`)
- New `density` layer
- Generic component defaults also live here (some previously in `global.scss`)

> NOTE: As a rule of thumb: if 2 or more bits of UI should stay magically in sync, it might make sense to define that shared rule here.

<bolt-text font-size="large" font-weight="bold" class="u-bolt-margin-bottom-none">
  Syntax
</bolt-text>

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

- How do we handle surfaces / overlays over themes?

<details>
  <summary>Theming Examples</summary>

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

</details>


<details>

  <summary>Density Examples</summary>

```
--bolt-density--spacing--xlarge
--bolt-density--vspacing--medium
--bolt-density--font-size--medium
--bolt-density--line-height--medium
```

</details>


<details>
  <summary>UI Examples?</summary>

## By type of thing and/or element

```
--bolt-ui--text--...
--bolt-ui--headings--...
--bolt-ui--h1--...
--bolt-ui--h6--...
```

### By component type

```
--bolt-ui--overlays--...
--bolt-ui--dividers--...
--bolt-ui--input--...
```

</details>


<hr>

<bolt-text font-size="xxxlarge" tag="h2" font-weight="semibold">
  #3. Component-specific Tokens (Buttons, Cards, etc)
</bolt-text>


- doesn't have to be 1:1 to the component name
- doesn't (and probably **shouldn't**) be required to map to a specific css property
- the shorter (within reason), the better; when in doubt, prefer clarity over conciseness 


<bolt-text font-size="large" font-weight="bold" class="u-bolt-margin-bottom-none">
  Syntax
</bolt-text>

```
--bolt-[COMPONENT-NAME]--[PURPOSE]--[STATE/MODIFIER]`
        ^- who            ^- what    ^- when / how
```

```css
--bolt-btn--bg-color: ...
--bolt-btn--bg-color--hover: ...
--bolt-btn--bg-color--active: ...
--bolt-btn--bg-color--disabled: ..
--bolt-btn--border-width
--bolt-btn--border-color


--bolt-icon--color:
--bolt-icon--bg-color:
--bolt-icon--bg-opacity:
--bolt-icon--size--medium:
--bolt-icon--size--large:

--bolt-card--shadow
--bolt-card--shadow--raised
--bolt-card--spacing
--bolt-card--spacing--large
--bolt-card--radius
--bolt-card--radius--large
--bolt-card--bg-color

```