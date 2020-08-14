---
title: Creating a New Component
---

# Setting Up

When building out a new component, make sure you take a look at some other existing components to get a sense of the coding standards and typical component structure in Bolt. The goal here is to have new and existing components feel just as consistent and coherent - nothing should stick out like a sore thumb!

Bolt supplies an easy to use command that will allow you to quickly create an integrated Bolt component. Simply run `yarn cc` in the Bolt repo root and provide answers to the two questions that follow.

The command will create two folders with nested files. One folder is in `docs-site/src/pages/pattern-lab/_patterns/40-components/` and is used exclusively for use with the [pattern library](https://boltdesignsystem.com/pattern-lab/?p=components-overview). The other folder is in `packages/components/` and is the main working directory for your new component.

Once the questions are answered, we recommend running `yarn setup` before beginning development again with `yarn start`.

## Leveraging Other Components

Many times, when creating a new component, it can be useful to leverage another component, for example, the eyebrow text component found nested within [bolt-headline](https://boltdesignsystem.com/pattern-lab/?p=viewall-components-headline). To do so, include the relevant twig markup:

```twig
{% if eyebrow %}
    {% include "@bolt-components-headline/eyebrow.twig" with eyebrow only %}
{% endif %}
```

By looking at the Headline [schema](https://boltdesignsystem.com/pattern-lab/?p=viewall-components-headline), you can see that Eyebrow accepts an array of data including variables like `text` and `weight`. It is important to pass only data specified in the schema to your leveraged component.

Be sure to update the schema in your new component directory to include any data you've added, and you can even reference your leveraged components like so:

```js
eyebrow: {
    type: 'object',
    description: 'Eyebrow text component',
    ref: 'headline',
}
```
