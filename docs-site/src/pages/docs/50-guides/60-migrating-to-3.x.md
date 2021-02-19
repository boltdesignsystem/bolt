---
title: Migrating to Bolt 3.x
---

## Base theme updates

## Loading scripts

1. Load `bolt-global.js` first, before any other theme JS, at the bottom of the page before the closing `</body>` tag.
2. Load `bolt-global.js` synchronously, i.e. do not add `async` or `defer` to the script tag.
3. Remove any inline critical CSS and JS in the `<head>`.
4. Remove any other fallback `<script>` tags for legacy browsers, as we no longer support IE11.

## Configuring .boltrc.js

The following packages are no longer required. Please remove them from `.boltrc`:

- `postcss-themify`
- `components-critical-css`
- `components-critical-css-vars`
- `components-critical-fonts`
- `critical-path-polyfills`

## Site-specific theme updates

## Remove previously deprecated features

1. The deprecated old card (@bolt-components-band/band.twig) has been removed 3.x. Any usage should be replaced with
   the new card (@bolt-components-card-replacement/card-replacement.twig) before updating.

### Upgrade Bolt

`fin composer require pega/bolt-release:^3.1.1`

### Upgrade Base Theme

`fin composer require pega/pega_bolt_theme:8.x-3.x`

### Upgrade Node (if necessary)

- Be sure your theme contains a `.nvmrc` file with version `v12.20.1`. See [example](https://gitlab.com/pegadigital/pegawww/pegawwwd8/-/blob/release/release-85/docroot/themes/custom/pegawww_theme/.nvmrc).
- Update Node version in your Dockerfile to `v12.20.1`. See [example](https://gitlab.com/pegadigital/pegawww/pegawwwd8/-/blob/release/release-85/.docksal/cli/Dockerfile#L17-18).
- Update Bamboo to install version `v12.20.1` (tbd)

### Upgrade any Bolt dependencies in theme

- Search site-specific theme for `@bolt/` to find Bolt dependencies still using `^2.x.x`.
- Update all of these to `^3.1.x`. The latest version for most packages is `3.1.0` or `3.1.1`. See npm ([example](https://www.npmjs.com/package/@bolt/core-v3.x)) for the exact version number of your package.
- A common dependency is `@bolt/core-v3.x`. Update that like so:

```
-    "@bolt/core-v3.x": "^2.31.2"
+    "@bolt/core-v3.x": "^3.1.1"
```

### Delete any build-related patches (if necessary)

In most cases, patches to the Bolt build should be deleted. In the past, patches were added because the build tools were out of sync with the latest Bolt code. Now that the build tools have been updated, patches should not be necessary. Let us know if you find an exception.

### Add `/cache/*` to theme `.gitignore` file

The updated build tools will add a cache directory to the theme. Ignore this directory. See [example](https://gitlab.com/pegadigital/pegawww/pegawwwd8/-/blob/release/release-85/docroot/themes/custom/pegawww_theme/.gitignore#L12).

### Rebuild front-end

Either use your site's makefiles or manually run the following:

- `cd docroot/themes/custom/YOUR_THEME`
- `fin exec yarn install --force`
- `fin exec yarn gulp`
- `fin drush cr`
