# @bolt/settings-font-size
Standardized font sizes in Bolt.

- [Sass Docs](https://www.boltdesignsystem.com/docs/#settings: font-size)

## Install
```bash
npm install @bolt/settings-font-size --save
```

## Basic usage
```scss
@import 'node_modules/@bolt/settings-font-size';
```

<!--
## Usage with [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer)
Using [node-sass](https://github.com/sass/node-sass) (or a plugin for Grunt, gulp or webpack which is using node-sass) in combination with the [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer) custom importer, can make importing CSS dependencies from `node_modules` a much nicer experience.

```scss
// Import the main file.
@import '~@avalanche/setting-font-sizes';
```

## Usage
```scss
// Function.
.selector {
  font-size: setting-font-size(m);
}

// Map.
.selector {
  font-size: map-get($font-sizes, m);
}
```

## Settings
```scss
/// Default font sizes.
/// @type Map
$font-sizes: (
  xs: 0.64em,
  s: 0.8em,
  m: 1em,
  l: 1.25em,
  xl: 1.563em,
  xxl: 1.953em,
  xxxl: 2.441em,
) !default;
```

-->
### License
MIT
