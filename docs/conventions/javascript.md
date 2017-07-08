---
title: JavaScript coding conventions
label: JavaScript
---

We follow the most widely adopted JavaScript Style Guide: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). It helps us follow good practices and avoid some errors.

## Prettier

Upon that, we use [prettier](https://github.com/prettier/prettier) which removes all original styling and ensures that all outputted JavaScript conforms to a consistent style.

## ECL configuration

Thus, our [eslint-config-ecl](https://github.com/ec-europa/ecl-toolkit/tree/master/packages/eslint-config-ecl) extends both  [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) and [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier).

## Automatically format the code and fix errors

On every git commit, a hook is called and runs the following commands:

```json
  "*.js": [
    "prettier-eslint --write",
    "git add"
  ],
```

It formats your JavaScript using `prettier` followed by `eslint --fix`.
