Sass map for organizing the color swatches + tint variations used in the Bolt design system. 

# @bolt/setting-colors
Colors.

- [Documentation](https://boltdesignsystem.com/sassdoc/#setting: colors)

## Install
```bash
npm install @bolt/settings-colors --save-dev
```

## Basic usage
This package requires that [node-sass](https://github.com/sass/node-sass) (or one of the grunt, gulp, etc. equivalents) in combination with the [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer) custom importer is used.

```scss
// Import the main _settings.colors.scss file with the rest of your ITCSS variables / config files.
@import '~@bolt/settings-colors';
@import '01-settings/my-local-variables';
...
```


## Usage
The Bolt `palette` Sass function was created to make using the colors in the Design System as painless as possible. 

Check out `@bolt/tools-palette` for info on installing / configuring but essentially it's as simple as:

```scss
// Use the `blue` color (which defaults to `base`) via the `@bolt/tools-palette` function
.c-selector {
  color: palette(blue);
}

// Using the `darker` shade of blue
.c-other-selector {
  color: palette(blue, darker);
}
```