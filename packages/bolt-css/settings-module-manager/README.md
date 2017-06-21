# @bolt/setting-module-manager

A simple wrapper for the Sass Versioning library. Used to version Sass modules + manage related dependencies.

Note: because this is a Sass mixin that all modules depend on (including ITCSS Settings files), this library is categorized as a `setting` vs a `tool` so this library is loaded & available at the appropriate time.


- [Documentation](https://boltdesignsystem.com/sassdoc/#setting:colors)

## Install
```bash
npm install @bolt/settings-module-manager --save-dev
```
Note: Bolt components should already be including this as a built-in dependency so this may not even be required.  


## Basic usage
This package requires that [node-sass](https://github.com/sass/node-sass) (or one of the grunt, gulp, etc. equivalents) in combination with the [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer) custom importer is used.

```scss
// Import the main _settings.module-manager.scss file with the rest of your ITCSS variables / config files.
@import '~@bolt/settings-module-manager';
@import '01-settings/settings-foobar';
...
```


## Usage
The Bolt `palette` Sass function was created to make using the colors in the Design System as painless as possible.

```scss
@include add-module(
  $name:    'tools.module-name',
  $version: '0.1.0',
  $dependencies: (
    'settings.colors': '0.1.0',
    'tools.sassy-maps': '0.1.0'
  )
);
```