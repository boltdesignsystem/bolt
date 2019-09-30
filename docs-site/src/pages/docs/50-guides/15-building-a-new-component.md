---
title: Building a new component
---

When building out a new component, make sure you take a look at some other existing components to get a sense of the coding standards and typical component structure in Bolt. The goal here is to have new and existing components feel just consistant and conherent - nothing should stick out like a sore thumb!

Additionally, *all* new components must include the following config within their `package.json`:

```
"publishConfig": {
  "access": "public"
}
```

This is required so lerna can successfully publish Bolt's packages to NPM!


Below you'll find a step-by-step guide to walk through the process of adding a new component to the Bolt ecosystem.

**<u>Step 1</u>:**  Create a new dir under `/packages/components/[bolt-NEW-COMPONENT]`

**<u>Step 2</u>:** `cd` into the new dir and create a new `package.json` in the new dir:
```
{
  "name": "@bolt/[NEW-COMPONENT]",
  "description": "BLANK Component in Bolt",
  "version": "0.0.0",
  "homepage": "https://boltdesignsystem.com",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/bolt-design-system/bolt/"
  },
  "bugs": {
    "url": "https://github.com/bolt-design-system/bolt/issues"
  },
  "style": "src/[COMPONENT].scss",
  "main": "src/[COMPONENT].js",
  "twig": "src/[COMPONENT].twig",
  "publishConfig": {
    "access": "public"
  },
  "dependencies": {
    "@bolt/core": "0.0.0"
  }
}
```
**Notes:**
- Ensure you're ONLY adding the assets needed (e.g. if you don't need JavaScript then don't add `"main": "src/[COMPONENT].js"`)
- Make sure to add any required Bolt components to `dependencies`

**<u>Step 3</u>:** Add your necessary SCSS and JS files to `[bolt-NEW-COMPONENT]/src/`

- Make sure all are reflected within `package.json`
- Within your main scss file be sure to import core styles: `@import '@bolt/core';`
- Within your main JS file be sure to include the pollyfillLoader:

```
import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./COMPONENT.standalone.js');
});
```

**<u>Step 4</u>:** Add your necessary Twig files to `[bolt-NEW-COMPONENT]/src/`

- Be sure to follow the general coding style and practices of the Bolt design system (review other components for reference)

**<u>Step 5</u>:** Add a new `README.md` at the root of your component, next to `package.json` (with pertinent details)

- A description of the component's functionality should reside at the very top of the readme
- Be sure to review an existing readme and include the "Install via NPM" instructions
- Consider adding a "description" section as well as a "best practices" bullet list

**<u>Step 6</u>:** In the `package.json` file in the root of the Bolt repo, add the new component's folder path to the `workspaces` key. This tells Lerna and Yarn where to look when installing and symlinking together the different packages that make up the Bolt codebase (**hint:** that's what happens when running `npm run bootstrap`)

```
"workspaces": [
    "packages/components/bolt-action-blocks",
    "packages/components/bolt-[COMPONENT-FOLDER-NAME]",
   ...
]
```

**<u>Step 7</u>:** Add component to `package.json` AND `.boltrc.js` within the Pattern Lab dir `/docs-site/`

**<u>Step 8</u>:** Build the things! `cd` to the root and run `npm run bootstrap`

- This command will install your references to the new component and will allow you to begin to build/test your new component within Pattern Lab.

**<u>Step 9</u>:** Create a new dir for your component within `/docs-site/src/_patterns/02-components/` and add a new "docs" twig file, named like `00-COMPONENT-docs.twig`:

```
{% set schema = get_data('@bolt-components-COMPONENT/NEW-COMPONENT.schema.yml') %}
{% set code %}
  {% verbatim %}
    {# component implementation example here #}
  {% endverbatim %}
{% endset %}

{% include '@utils/docs.twig' with {
  schema: schema,
  code: code,
  readmeFile: '@bolt-components-COMPONENT/README.md',
} only %}
```

**<u>Step 10</u>:** Create a new `[NEW-COMPONENT].schema.yml` file within the component dir `/packages/components/[bolt-NEW-COMPONENT]`:

```
$schema: http://json-schema.org/draft-04/schema#
title: COMPONENT NAME
type: object
required:
  - src
  - alt
properties:
  sources:
    type: array
    description: 'Social media sources to share to'
    enum:
      - 'facebook'
      - 'twitter'
      - 'linkedin'
``` 

- <u>Note</u>: that the `required` properties are called out at the top of the file before the component `properties` get set
- <u>Tip</u>: Review other `*.schema.yml` files for common solutions in structuring data
- If a default exists, set it within `default` for that property
- Detailed information about schema data [found here](https://spacetelescope.github.io/understanding-json-schema/)

**<u>Step 11</u>:** within the same directory as step 9 above - add your first demo component within a file named like `05-COMPONENT.twig`.

- This will serve as a space for you to develop and test your new component!
- When completed - this initial demo should be the simplest implementation of the component available.

**<u>Step 12</u>:** Once you have the initial demo completed - it's time to add our schema validation to our package component within the base twig file (at the very bottom) `/packages/components/[bolt-NEW-COMPONENT]/src/[COMPONENT].twig`:

```
{% if enable_json_schema_validation %}
  {{ validate_data_schema(bolt.data.components['@bolt-components-COMPONENT'].schema, _self) | raw }}
{% endif %}
```

- **<u>Note</u>:** Review the developer console for validation errors.
- As you fix validation errors the process will outline how data should be correctly added
- The final result will be a well formed schema that will both aid in data validation and generate the schema table within the Pattern Lab docs for your new component
