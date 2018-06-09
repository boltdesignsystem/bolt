Text component. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

## Install via NPM

```
npm install @bolt/components-text
```

### Description:

The text component provides an encapsulated pattern for including bolt specific typograpy elements. *Note: Future replacement of Headline component.*

## Web Component

Bolt Text is a web component, which means you can use the custom tag `bolt-text` to render it.

```
<bolt-text>
  This is an Eyebrow
</bolt-text>
```

### Shorthand Defaults

Using the shorthand method allows for consistency while also leaving room for customizations.

#### Eyebrow

```
<bolt-text eyebrow>
  This is an Eyebrow
</bolt-text>
```

By using the `eyebrow` boolean attribute, the following attribute defaults are being set:

- `font-size`: xsmall
- `font-family`: headline
- `text-color`: theme-headline
- `line-height`: tight
- `letter-spacing`: wide
- `transform`: uppercase
- `opacity`: 80

#### Headline

```
<bolt-text headline>
  This is a Headline
</bolt-text>
```

By using the `headline` boolean attribute, the following attribute defaults are being set:

- `tag`: h2
- `font-size`: xlarge
- `font-family`: headline
- `text-color`: theme-headline
- `letter-spacing`: narrow
- `weight`: bold

```
<bolt-text headline
  font-size="xxxlarge"
>
  This is a Headline
</bolt-text>
```

To render all sizes of headlines, all you have to do is change `font-size` to your desired size. *Note: if set to `xxxlarge` and the title exceeds 60 characters, the font size will scale down from 3.083rem to 2.275rem.*

- xxxlarge
- xxlarge
- xlarge
- large
- small
- xsmall

#### Subheadline

```
<bolt-text subheadline>
  This is a subheadline
</bolt-text>
```

By using the `subheadline` boolean attribute, the following attribute defaults are being set:

- `font-size`: large
- `font-family`: headline
- `text-color`: theme-headline

```
<bolt-text subheadline
  font-size="xlarge"
>
  This is a subheadline
</bolt-text>
```

To render all sizes of subheadlines, all you have to do is change `font-size` to your desired size.

- xxlarge
- xlarge
- large
