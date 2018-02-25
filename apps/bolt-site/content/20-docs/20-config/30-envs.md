---
title: Environments 
---

These values can be set in `.boltrc.js` files to configure the build tools:

```
env:
  type: string
  title: Environment Type
  description: Where is this being compiled? Pattern Lab? Drupal?
  enum:
    - pl
    - static
    - drupal
```
