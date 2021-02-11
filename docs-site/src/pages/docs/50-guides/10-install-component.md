---
title: Installing a Component
---

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
+     '@bolt/components-button',
    ],
    individual: [
    ],
  },
};
```

Continue to do so with as many components as you'd like.
