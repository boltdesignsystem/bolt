# Sass Export Data

Uses [custom functions in `node-sass`](https://www.npmjs.com/package/node-sass#functions--v300---experimental) to export JSON files from Sass maps and other variables.

### Install

```bash
npm install --save @theme-tools/sass-export-data
```

### Setup

```js
const config = {
  name: 'export_data', // Name of Sass function
  path: 'path/to/export/folder/' // Folder where to place JSON files
};
const sassExportData = require('@theme-tools/sass-export-data')(config);
```

Then pass `sassExportData` to the [`functions` option in `node-sass`](https://www.npmjs.com/package/node-sass#functions--v300---experimental). It'll be the object like it wants, so you could merge it with other functions if needed. This can work with many ways to compile sass: gulp, webpack, basic cli, or anything that utilizes `node-sass`.

### Usage

In your sass declare this mixin to make it easier:

```scss
/// Export Sass Data to JSON in `path/to/export/folder/` folder
/// @param {String} $filename - ie `mystuff.json`
/// @param $var - What to turn into JSON
/// @example scss
///   @include export-data-to-lib('filename.json', $sass-map);
@mixin export-data($filename, $var) {
  // The `export_data` function is a custom function added to Sass.
  // The `$data` var is weird, but needed.
  $data: export_data($filename, $var);
};
```

Then you can do this wherever you'd like:

```scss
$x: (
  a: 'Apple',
  b: 'Beer',
);

@include export-data('example.json', $x);
```

This will create the file `example.json` in `path/to/export/folder/` with:

```json
{
  "a": "Apple",
  "b": "Beer"
}
```

### Details

- If the file hasn't changed, it won't output. That helps watchers go less crazy.

Special thanks to [`node-sass-export`](https://www.npmjs.com/package/node-sass-export) for inspiration and much of the original code.
