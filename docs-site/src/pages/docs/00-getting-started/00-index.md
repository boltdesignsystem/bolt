---
title: Getting Started
category: Quick Start
---

## Create bolt config file

Create a file called `.boltrc.js` with:

<code>
module.exports = {
  buildDir: 'www/build',
  components: {
    global: [
    ],
    individual: [
    ],
  },
};
</code>

## Install Build Tools

Ensure you have a `package.json` file, if not, run `npm init`.

```bash
npm install --save @bolt/build-tools
```

Add this to your `package.json`:

```diff
"scripts": {
+   "build": "bolt build",
+   "build:prod": "NODE_ENV=production bolt build",
+   "start": "bolt start"
}
```

## Consider adding global styling

All global styles are kept in a single package, if you'd like it, run:

```bash
npm install --save @bolt/global
```

Then add it to `.boltrc.js`:

```diff
module.exports = {
  buildDir: 'www/build',
  components: {
    global: [
+     '@bolt/global',
    ],
    individual: [
    ],
  },
};
```

## Install Components

Install any Bolt Component via `npm` as it's docs suggest. If you were going to install the Button, you'd run:

```bash
npm install --save @bolt/components-button
```

Then add it to `.boltrc.js`:

```diff
module.exports = {
  buildDir: 'www/build',
  components: {
    global: [
      '@bolt/global',
+     '@bolt/components-button',
    ],
    individual: [
    ],
  },
};
```

Continue to do so with as many components as you'd like.

## Build It

Run this to build:

```bash
npm run build
```

You can optionally run `npm run build:prod` for smaller files sizes - though it does take longer. CI should run this command.

All files will build to the directory you've configured as your `buildDir`.
