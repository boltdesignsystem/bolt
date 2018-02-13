Band is a panel with vertical spacing. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

### Install via NPM
```
npm install @bolt/components-band
```

### Example usage
A band can be an extremely simple component or it can accept a wide variety of components and content items to become something more complex:
```
{% include "@bolt-components-band/band--collection.twig" with {
  contentItems: [
    {
      pattern: "card",
      ...
    },
    {
      pattern: "card-w-teaser",
      ...
    },
    {
      pattern: "teaser",
      ...
    }
  ]
} only %}
```
```
{% include "@bolt-components-band/band--card-collection.twig" with {
  contentItems: [
    {
      pattern: "card",
      ...
    },
    {
      pattern: "card",
      ...
    },
    {
      pattern: "card",
      ...
    }
  ]
} only %}
```
```
{% include "@bolt-components-band/band--feature.twig" with {
  primaryTeaser: {
    headlines: [
      ...
    ]
  }
} only %}
```
```
{% include "@bolt-components-band/band--flag.twig" with {
  eyebrow: {
    text: "Who is Pega?"
  },
  headline: {
    text: "Pega is #1 in software for customer engagement and operational excellence."
  },
  buttons: [
    ...
  ]
} only %}
```
```
{% include "@bolt-components-band/band--teaser-collection.twig" with {
 contentItems: [
    {
      pattern: "teaser",
      ...
    },
    {
      pattern: "teaser",
      ...
    },
    {
      pattern: "teaser",
      ...
    }
  ]
} only %}
```