---
title: Components 
---

These values can be set in `.boltrc.js` files to configure the build tools:

```
components:
  type: object
  properties:
    global:
      type: array
      uniqueItems: true
      # array of objects
      items:
        -
          type: string
    individual:
      type: array
      uniqueItems: true
      # array of objects
      items:
        -
          type: string
```
