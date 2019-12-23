# babel-preset-bolt

This package includes the [Babel](https://babeljs.io) preset used by the [Bolt Design System](https://github.com/bolt-design-system/bolt)

## Usage in Bolt Projects

The easiest way to use this configuration is with Bolt, which includes it by default. **You don’t need to install it separately in Bolt projects.**

## Usage Outside of Bolt

If you want to use this Babel preset in a project not built with Bolt, you can install it with following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then create a file named `.babelrc` with following contents in the root folder of your project:

  ```js
  {
    "presets": ["@bolt/babel-preset-bolt"]
  }
  ```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/), which assumes that `Object.assign` is available or polyfilled.