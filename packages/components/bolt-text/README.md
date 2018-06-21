New (still in progress) Text component. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

###### Install via NPM

```
npm install @bolt/components-text
```

## Web Component

Bolt Text is a web component, which means you can use the custom tag `bolt-text` to render it.

```
<bolt-text>
  This is a piece of text.
</bolt-text>
```

## Common Settings

Common props that `bolt-text` accepts.

### display=""

Inline text or a block of text.

#### block

```
<bolt-text
  tag="div"
  display="block"
>
  This is a block of text.
</bolt-text>
```

#### inline

```
Here, you can set some
<bolt-text
  tag="span"
  display="inline"
  font-style="italic"
>
  inline text
</bolt-text>
that is italic.
```

### tag=""

You can set semantic tag to reflect the kind of text you are rendering.

```
<bolt-text
  tag="h1"
>
  Make this the h1 because it's the most important text on the page.
</bolt-text>
```

### color=""

You can assign theme variables to the text color. Currently 2 variables are enabled, `theme-headline` and `theme-body`. `theme-headline` will produce the Headline Color, and `theme-body` will produce the Body Text Color. Both colors are defined in all of our themes. By assigning text colors this way, the design will always stay consistent and always work with a theme.

```
<bolt-text
  color="theme-headline"
>
  This piece of text has the Headline Color from the theme.
</bolt-text>
```
```
<bolt-text
  color="theme-body"
>
  This piece of text has the Body Text Color from the theme.
</bolt-text>
```

## Additional Settings

|Prop           |Values                                                                 |Default
|---            |---                                                                    |---
|line-height    |`tight`, `regular`, `loose`                                            |`regular`
|align          |`inherit`,`left`, `center`, `right`                                    |`inherit`
|letter-spacing |`narrow`, `regular`, `wide`                                            |`regular`
|text-transform |`regular`, `uppercase`, `lowercase`, `capitalize`                      |`regular`
|font-family    |`headline`, `body`, `code`                                             |`body`
|font-size      |`xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`, `xxxlarge`  |`medium`
|font-weight    |`regular`, `semibold`, `bold`                                          |`regular`
|font-style     |`regular`, `italic`                                                    |`regular`
|opacity        |`100`, `80`, `60`, `40`, `20`                                          |`100`
|quoted         |(This is a boolean prop)                                               |
|url            |(This is a string, for example: http://pega.com)                       |

## Utilities (overrides)

Use any Bolt utility to override the design.

### util=""

```
<bolt-text
  util="margin-bottom-large, padding-top-small, color-indigo"
>
  This piece of text has utility overrides.
</bolt-text>
```

## Typographic Recipes

Using the shorthand method allows for consistency while also leaving room for customizations. The following are the official recipes for each piece of our typography. They will cover all common use cases. Only in edge cases, you'd want to break away and create your own recipes.

|Prop         |Values                          |Default
|---          |---                             |---
|eyebrow      |(This is a boolean prop)        |
|headline     |(This is a boolean prop)        |
|subheadline  |(This is a boolean prop)        |

### Eyebrow

```
<bolt-text eyebrow>
  This is an Eyebrow
</bolt-text>
```

By using the `eyebrow` boolean attribute, the following attribute defaults are being set:

- `font-size`: xsmall
- `font-family`: headline
- `color`: theme-headline
- `line-height`: tight
- `letter-spacing`: wide
- `transform`: uppercase
- `opacity`: 80

### Headline

```
<bolt-text headline>
  This is a Headline
</bolt-text>
```

By using the `headline` boolean attribute, the following attribute defaults are being set:

- `tag`: h2
- `font-size`: xlarge
- `font-family`: headline
- `color`: theme-headline
- `letter-spacing`: narrow
- `weight`: bold

#### XXXL Headline

```
<bolt-text headline
  font-size="xxxlarge"
>
  This is a XXXL Headline
</bolt-text>
```

#### XXL Headline

```
<bolt-text headline
  font-size="xxlarge"
>
  This is a XXL Headline
</bolt-text>
```

#### XL Headline

```
<bolt-text headline
  font-size="xlarge"
>
  This is a XL Headline
</bolt-text>
```

#### L Headline

```
<bolt-text headline
  font-size="large"
>
  This is a L Headline
</bolt-text>
```

#### S Headline

```
<bolt-text headline
  font-size="small"
>
  This is a S Headline
</bolt-text>
```

To render all sizes of headlines, all you have to do is change `font-size` to your desired size. *Note: if set to `xxxlarge` and the title exceeds 60 characters, the font size will scale down from 3.083rem to 2.275rem.*

#### XS Headline

```
<bolt-text headline
  font-size="xs"
  text-transform="uppercase"
  letter-spacing="wide"
>
  This is a XS Headline
</bolt-text>
```

XS headline is a special case and should be used sparingly. In addition to `font-size`, `text-transform` and `letter-spacing` also need to be defined.

### Subheadline

```
<bolt-text subheadline>
  This is a subheadline
</bolt-text>
```

By using the `subheadline` boolean attribute, the following attribute defaults are being set:

- `font-size`: large
- `font-family`: headline
- `color`: theme-headline

#### XXL Subheadline

```
<bolt-text subheadline
  font-size="xxlarge"
>
  This is a XXL subheadline
</bolt-text>
```

#### XL Subheadline

```
<bolt-text subheadline
  font-size="xlarge"
>
  This is a XL subheadline
</bolt-text>
```

#### L Subheadline

```
<bolt-text subheadline
  font-size="large"
>
  This is a L subheadline
</bolt-text>
```

To render all sizes of subheadlines, all you have to do is change `font-size` to your desired size.
