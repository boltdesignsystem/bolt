# Critical Path Polyfills
A small batch of cross-browser polyfills (element.closest and element.matches) meant to be inlined and run at the the browser's [critical rendering path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/).

## Install

**For NPM Users:**
```
npm install @bolt/critical-path-polyfills
```

**For Yarn Users:**
```
yarn add @bolt/critical-path-polyfills
```

## Usage

The `@bolt/critical-path-polyfills` package is already pre-compiled to use in the browser (no compiling required!) so this package's Javascript can get copied over and inlined right onto the page.

For those using the Bolt Design System's Webpack build (used under the hood in `@bolt/build-tools`), you can automatically copy this file over to your `build` directory by adding a `copy` config option to the `.boltrc.js` file.

```javascript
copy: [
  {
    from: require.resolve(`@bolt/critical-path-polyfills`),
    to: path.join(__dirname, '../www/build'), // update to custom build directory if needed
  },
  // ...
]
```

For developers already using the Bolt Design System's Twig templates & Twig Extensions, this JavaScript file can _also_ get automatically inlined onto the page!

To do this, first make sure the `@bolt-assets` Twig namespace config has been added to your `.boltrc.js` config:  

 ```javascript
// .boltrc.js
extraTwigNamespaces: {
  'bolt-assets': {
    recursive: true,
    paths: ['../www/build'],
  },
},
]
```

Finally, update the main Twig template that's responsible for adding JavaScript / CSS to the main site `<head>`. 

Specifically, this package's Javascript needs to get inlined before _ANY_ 3rd party Javascript gets loaded! 

Preferably this means:
1. Adding a script tag right at the top of the Twig template's `<head>` tag
2. Checking to make sure the `@bolt-assets/bolt-critical-path-polyfills.cjs.js` file exists (using the fileExists Bolt Twig Extension) 
3. And if that file does exist, inlining the contents via `{{ inline("@bolt-assets/bolt-critical-path-polyfills.cjs.js") }}`

```html
<!-- ex. html.html.twig -->

{# boilerplate code to grab the webpack manifest config file and look up the assets compiled #}
{% if bolt.data.config.lang is iterable %}
  {% set lang = bolt.data.config.lang[0] %}
{% else %}
  {% set lang = bolt.data.config.lang %}
{% endif %}

{% set manifestConfigFile = "@bolt-assets/bolt-webpack-manifest#{lang != "" ? "-" ~ lang : ""}.json" %}

{% set assets = [] %}
{% if fileExists(manifestConfigFile) %}
  {% set assets = get_data(manifestConfigFile) %}
{% endif %}

<!DOCTYPE html>
<html{{ html_attributes }}>
  <head>
    <head-placeholder token="{{ placeholder_token }}">
    {% if fileExists("@bolt-assets/bolt-critical-path-polyfills.cjs.js") %}
    <script>{{ inline(assets["bolt-critical-path-polyfills.cjs.js"]) }}</script>
    {% endif %}
    <!-- rest of head tag contents -->
```


