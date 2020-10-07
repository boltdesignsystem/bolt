---
title: Migrating to Bolt 3.x
---

## Loading styles and scripts

If you are migrating to Bolt `v3.x` from `v2.x` you may need to update how you load Bolt styles and scripts. We recommend the following document structure:

```
<html>
  <head>
    <link rel="stylesheet" href="./build/bolt-global.css" media="all">
    <script type="module" src="./build/bolt-global.js" async></script>
  </head>
  <body>
    <bolt-text>Hello World!</bolt-text>
  </body>
</html>
```

Previously, we recommended including the `<script>` tag just before the closing `<body>` tag. With the introduction of the `async` attribute on the `<script>` tag we can now efficiently load JS in the `<head>`. That is where we recommend including the `<script>` tag for `v3.x`.

Be sure to include `type="module"` on the `<script>` tag as well. It is required for `async` to work. See the [V8 docs](https://v8.dev/features/modules#browser) for more on using JS modules in the browser.

That's it. We no longer support IE11, so there's no need to include any other fallback `<script>` tags for legacy browsers and no need to inline critical CSS and JS in the `<head>` as we did in the past.

## Configuring .boltrc.js

The following packages are no longer required now that we've dropped IE11 support. Please remove them from `.boltrc`:

- `postcss-themify`
- `components-critical-css`
- `components-critical-css-vars`
- `components-critical-fonts`
- `critical-path-polyfills`
