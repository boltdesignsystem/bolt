---
title: Bolt CSS Custom Props Spec (Draft)
category: Architecture
hidden: false
---

<bolt-text font-size="large" font-weight="bold" class="u-bolt-margin-bottom-none">
  Notes / Discussion Points
</bolt-text>

1. Switch to use Amazon's [Style Dictionary](https://github.com/amzn/style-dictionary) to auto-convert design tokens into the different formats required (including converting into Sass Maps...)
   - Most likely should be defined as JSON (Style Dictionary's default) OR as `.js` files (my personal preference)
2. We have 3 tiers of tokens
   - **#1. Global tokens** (pure values)
   - **#2. Category-specific** tokens (opinionated defaults shared across multiple things)
   - **#3. Component-specific** tokens (tokens just for buttons, just for links, etc)
3. Our existing ITCSS `settings.global.scss` file needs to go away -- break some of these out into other settings / tokens appropriately
4. Most other existing ITCSS settings files map out fairly nicely 
5. We should really try to favor using shorter variable names instead of trying to match the CSS property being used.

```
// example of "shorthand" font sizes
--bolt-font-size-md
--bolt-font-size-lg
--bolt-font-size-xxl

// vs. 

--bolt-font-size-medium
--bolt-font-size-large
--bolt-font-size-xxlarge
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

- no double-dashes in any of the names beyond the `--bolt-` at the start of the variable
- not component or use-case specific
- think of these as pure raw ingredients that can be used anywhere 



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
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-border-radius-full
--bolt-border-radius-small
--bolt-border-radius-default
--bolt-border-radius-none
</bolt-code-snippet>
      </td>
    </tr>
    <tr>
      <td>Breakpoints</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-breakpoint-xxsmall
--bolt-breakpoint-medium
...
--bolt-breakpoint-xxlarge
</bolt-code-snippet>
      </td>
    </tr>
    <tr>
      <td>Colors</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-color-indigo-xdark
--bolt-color-indigo
--bolt-color-red
--bolt-color-blue-dark
</bolt-code-snippet>

<br>
> Note: we might want to consider renaming our existing status colors at this level and redefine at a lower level
      </td>
    </tr>
    <tr>
      <td>Font Family</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-font-family-heading
--bolt-font-family-body
--bolt-font-family-code
</bolt-code-snippet>
<br>
> Note: nix font-family-bodySubset
      </td>
    </tr>
    <tr>
      <td>Font Size</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-font-size-xsmall
--bolt-font-size-medium
--bolt-font-size-xxlarge
</bolt-code-snippet>
      </td>
    </tr>
    <tr>
      <td>Font Family</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-font-family-heading
--bolt-font-family-body
--bolt-font-family-code
</bolt-code-snippet>
<br>
> Note: nix font-family-bodySubset
      </td>
    </tr>
    <tr>
      <td>Line height</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-line-height-medium    // default for medium fonts
--bolt-line-height-medium-tight         // tighter line-height for medium-sized fonts
--bolt-line-height-medium-loose         //  looser line-height for large-sized fonts
...
--bolt-line-height-large
...
</bolt-code-snippet>
      </td>
    </tr>
    <tr>
      <td>Font Weights</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-font-weight-light
--bolt-font-weight-regular
--bolt-font-weight-semibold
--bolt-font-weight-bold
--bolt-font-weight-extrabold
</bolt-code-snippet>
      </td>
    </tr>
    <tr>
      <td>Font Weights</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-font-weight-light
--bolt-font-weight-regular
--bolt-font-weight-semibold
--bolt-font-weight-bold
--bolt-font-weight-extrabold
</bolt-code-snippet>
      </td>
    </tr>
    <tr>
      <td>Transitions</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-transition-fast
--bolt-transition-slow
</bolt-code-snippet>
      </td>
    </tr>
    <tr>
      <td>Opacity</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-opacity-0
--bolt-opacity-20
--bolt-opacity-40
--bolt-opacity-50
--bolt-opacity-80
--bolt-opacity-100
// ... etc
</bolt-code-snippet>
      </td>
    </tr>
    <tr>
      <td>Spacing</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">// horizontal spacing
--bolt-spacing-medium
--bolt-spacing-medium-squished
--bolt-spacing-medium-stretched
...
// v-spacing
--bolt-vspacing-medium
</bolt-code-snippet>
      </td>
    </tr>
    <tr>
      <td>Shadows</td>
      <td>
<bolt-code-snippet lang="css" class="u-bolt-negative-margin-bottom-medium u-bolt-block">--bolt-shadow-100
--bolt-shadow-300
--bolt-shadow-500
--bolt-shadow-900
</bolt-code-snippet>
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







## Opacity


## Shadows






# Tier 2: Prop Values Affected By Context

Theme
Density
UI

Rule of thumb: if 2 or more pieces of UI need to stay magically in sync, you probably want a definition here.


--bolt-[Context]--[SCOPE]--[PROP]--[MODIFIER]
    --bolt-theme--[SCOPE]--[PROP]--[MODIFIER]  --> color palette
  --bolt-density--[SCOPE]--[PROP]--[MODIFIER] --> spacing density
       --bolt-ui--[SCOPE]--[PROP]--[MODIFIER] --> UI defaults



Themes ONLY affect color so putting color in the name isn't necessary
--bolt-theme--background
--bolt-theme--border
--bolt-theme--text
--bolt-theme--icon
--bolt-theme--primary--bg-color
--bolt-theme--primary--bg-color--disabled




// by hierchy
--bolt-...--primary--...
--bolt-...--secondary--...
--bolt-...--tertiary--...

// by type of thing and/or element
--bolt-...--text--...
--bolt-...--headings--...
--bolt-...--h1--...
--bolt-...--h6--...

--bolt-...--overlays--...
--bolt-...--dividers--...

--bolt-...--input--...





--bolt-ui--primary--bg-color
--bolt-ui--primary--bg-color--hover
--bolt-ui--primary--bg-color--active
--bolt-ui--secondary--bg-color
--bolt-ui--tertiary--bg-color
--bolt-ui--input--border-color--disabled


--bolt-ui--input--border-color--disabled

--bolt-ui--divider--border-color


--bolt-ui--dropdown--bg-color


- Status colors
- Interactive UI with Hierchy (Primary, Secondary, Tertiary)
- Themed UI

Basically if you want all of X type of UI to use Y styles, this is where those definitions live.



Themes are still color only:

--bolt-theme--dark--background
--bolt-theme--light--background
--bolt-theme--orange--background
--bolt-theme--purple--background

--bolt-theme--teal--background-gradient
--bolt-theme--teal--background-gradient

--bolt-theme--teal--text-on-background
--bolt-theme--teal--text-on-background
--bolt-theme--teal--heading-on-background

--bolt-theme--teal--primary-on-background

--bolt-theme--teal--primary
--bolt-theme--teal--text-on-primary





--bolt-theme--background
--bolt-theme--background-gradient
--bolt-theme--text-on-background
--bolt-theme--heading-on-background


--bolt-theme--primary-ui--bg-color
--bolt-theme--primary-ui--bg-color--hover
--bolt-theme--primary-ui--bg-color--disabled
--bolt-theme--primary-ui--text-color--disabled




--bolt-theme--primary--background
--bolt-theme--primary--background--hover
--bolt-theme--primary--background--hover

--bolt-theme--secondary
--bolt-theme--tertiary
--bolt-theme--primary


--bolt-theme--primary-on-background
--bolt-theme--secondary-on-background

--bolt-theme--background


States:
info
error
warning
success


--bolt-ui--container--bg-color--indigo-dark
--bolt-ui--container--bg-color--teal

--bolt-theme--teal--background
--bolt-theme--teal--text-on-background
--bolt-theme--teal--heading-on-background
--bolt-theme--teal--primary-on-background
--bolt-theme--teal--secondary-on-background

--bolt-theme--text-on--teal
--bolt-theme-teal


--bolt-ui--container--bg-color--indigo-dark



--bolt-ui--primary--bg-color:
--bolt-ui--primary--bg-color--active
--bolt-ui--primary--bg-color--disabled

--bolt-ui--secondary--bg-color:
--bolt-ui--secondary--bg-color--hover
--bolt-ui--secondary--bg-color--focus
--bolt-ui--secondary--bg-color--active
--bolt-ui--secondary--bg-color--disabled



--bolt-ui--success


--bolt-ui--success--text-color:
--bolt-ui--success--bg-color:


--bolt-ui--primary-interactive--border-width:
--bolt-ui--primary-interactive--border-color:
--bolt-ui--primary-interactive--bg-color:

--bolt-ui--primary-interactive--bg-color--disabled
--bolt-ui--primary-interactive--text-color--disabled






--bolt-opacity-30
--bolt-opacity-50
--bolt-opacity-85
--bolt-opacity-100



# Types of CSS Custom Properties

## Tier 1: Global DS Definitions

```css
--bolt-global--color--indigo
--bolt-global--color--indigo-base

--bolt-global--color--indigo-dark
--bolt-global--color--indigo-dark--transparent-100



--bolt-global--spacing--xsmall
--bolt-global--spacing--medium-squished
--bolt-global--spacing--medium-stretched
--bolt-global--spacing--medium


// always transparent = --[OPACITY] (> 99 and < 1000)
--bolt-global--opacity--500
```


## Tier 2: Design Tokens (which use Global Definitions)


```css
--bolt-global--divider--background





--bolt-global--font-family--sans




--bolt-ui--primary
--bolt-ui--primary--background-color
--bolt-ui--primary--background-color--disabled

--bolt-ui--secondary
--bolt-ui--secondary--text-color
--bolt-ui--secondary--shadow


--bolt-ui--tertiary--background-color
--bolt-ui--tertiary--text-color
--bolt-ui--tertiary--text-color--active


--bolt-ui--surface


--bolt-ui--input--padding--medium
--bolt-ui--input--padding--small

--bolt-ui--h1
--bolt-ui--h5
--bolt-ui--title
--bolt-ui--subtitle
--bolt-ui--eyebrow--text-color
--bolt-ui--eyebrow--font-size
--bolt-ui--divider
--bolt-ui--divider--subtle




--bolt-tokens--input--border-color
--bolt-tokens--input--border-color--disabled

--bolt-tokens--primary-ui--background:        --bolt-color--indigo-default--500
--bolt-tokens--primary-ui--text--active:        bolt-color(indigo, default, 0.5);


--bolt-tokens--text-on-primary:        bolt-color(indigo, dark, 0.5);
--bolt-tokens--primary-ui--background: bolt-color(indigo, dark, 0.5);


--bolt-tokens--warning:
--bolt-tokens--text-on-warning:


--bolt-tokens--text-h1--font-size:
--bolt-tokens--text-h6--line-height:


--bolt-tokens--border-color--default
--bolt-tokens--border-color--focus
--bolt-tokens--border-color--active
```


## Tier 3: Design Tokens (which use Global Definitions)

// component-specific vars:
  - doesn't have to be 1:1 to the component name
  - doesn't (and probably shouldn't) have to map to a specific css property
  - the shorter, the better
  - use `--bolt-[COMPONENT-NAME]--[PURPOSE]--[OPTIONAL-STATE]` format

```css
--bolt-btn--bg-color
--bolt-btn--bg-color--hover
--bolt-btn--bg-color--active
--bolt-btn--bg-color--disabled


--bolt-btn--font-size
--bolt-btn--text-color--focus


--bolt-btn--text-color
--bolt-btn--shadow-color


--bolt-btn--border-width
--bolt-btn--icon-color





--bolt--color--indigo-light
--bolt--color--indigo
--bolt--color--indigo-dark
--bolt--color--indigo-xdark


--bolt-global--color--indigo-100


--bolt-global--spacing--xlarge



--bolt-global--background-color--teal
--bolt-global--background-color--light
--bolt-global--background-color--dark



--bolt-input--border-color
--bolt-input--border-color--focus
--bolt-input--background-color--error
background-color--input


--bolt-theme--primary-bg
--botl-theme--primary-bg--hover


bolt-theme--background
bolt-theme--interactive--primary


bolt-theme--shadow--primary


//
--bolt-theme--background
--bolt-theme--primary
--bolt-theme--primary--hover


--bolt-theme--border
--bolt-theme--border-dark
--bolt-theme--border-light

--bolt-theme--text-on-primary
--bolt-theme--text-on-background

--bolt-global--spacing-


--botl-theme--text-on-primary-bg

--botl-theme--primary-text--hover

--botl-theme--dark-text--hover


--bolt--color--indigo--transparent-900
--bolt--color--indigo--transparent-500
--bolt--color--indigo--transparent-100



--bolt--color--orange
--bolt--color--black
--bolt--color--white


--bolt--color--warning



--bolt--color--primary--default
--bolt--color--primary--hover
--bolt--color--primary--hover



// values
--bolt-color-success-default
--bolt-color-success-hover
--bolt-color-success-active


--bolt-color-success-transparent-100





--bolt--colors--indigo-xdark
--bolt--spacing--large
--bolt--spacing--large-squished




// tokens

--bolt-global--primary-bg--hover
--bolt-global--primary-bg--hover


--bolt-global--link--color--hover
--bolt-global--link--color--hover


--bolt-global--link--color--hover


//
--button--bg:


--bolt--



--bolt--color--indigo
--bolt--color--indigo-dark
--bolt--color--indigo-light


--bolt--spacing--xxs
--bolt--spacing--xs
--bolt--spacing--sm
--bolt--spacing--md
--bolt--spacing--lg
--bolt--spacing--xl
--bolt--spacing--xxl

--bolt--shadow--50


--bolt--font-size--md
--bolt--font-size--lg

--bolt--font-family--serif


--bolt--opacity--60





```