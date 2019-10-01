---
title: Adding Custom Icons
---

To add custom SVG icons to your Bolt installation, simply update the `iconDir` array in `.boltrc.js` with the path to your new icons, like so:

```
module.exports = {
  ..
  buildDir: 'www/build',
  iconDir: [path.join(__dirname, './assets/custom/icons')],
  wwwDir: '../www',
  ..
};
```

The next time you run `start` or `build`, the icons will be moved into your Bolt installation. Specifically, these files will be modified:

- `../components/bolt-icon/icon.schema.json`
- `../components/bolt-icons/src/index.js`
- `../components/bolt-icons/src/icons/CUSTOM_ICON.js`

You can then use your custom icon as you would any other in the design system.

<u>Note</u>: Add custom icons to your Bolt installation as a last resort. An icon may already exist in the design system that would meet your needs or one could be added if you let us know. If you need an icon that isn't in Bolt, the first step is to submit a request to the Bolt team with your particular use case. From there, we can work together to find a solution that meets your needs and keeps the design system relevant and maintainable.
