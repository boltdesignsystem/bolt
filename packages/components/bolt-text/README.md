Text component. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

### Install via NPM
```
npm install @bolt/components-text
```

## Description:
The text component provides an encapsulated pattern for including bolt specific typograpy elements.

**<u>Note</u>:** Future replacement of Headline component.

### Shorthand Defaults
Using the shorthand method allows for consistency while also leaving room for customizations.

### Eyebrow
`<bolt-text eyebrow>Here is an eyebrow</bolt-text>`

- **fontSize:** `xsmall`
- **transform:** `uppercase`
- **opacity:** `80`
- **fontFamily:** `headline`

#### Headline
`<bolt-text headline>Headline text to go here</bolt-text>`

- **fontSize:** `xlarge`
  - <u>Note</u>: if set to `xxxlarge` and the title exceeds 60 characters, the font size will switch from using `xxxlarge` (3.083rem) to `$bolt-font-size--xxxlarge--min` (2.275rem) 
- **weight:** `bold`
- **letterSpacing:** `narrow`
- **fontFamily:** `headline`

#### Subheadline
`<bolt-text subheadline>A short subheadline here</bolt-text>`

- **fontSize:** `large`
- **fontFamily:** `headline`