Background can be added to any container. Part of the Bolt “Components” CSS framework that powers the [Bolt Design System](https://www.boltdesignsystem.com).

### Install via NPM
```
npm install @bolt/components-background
```

### Usage
Bolt background is a component that is depended on content to wrap:
```
{% embed "@bolt-components-band/band.twig" with {
  ...
} %}
  {% block band_background %}
    {% include "@bolt-components-background/background.twig" with {
      opacity: "heavy",
      fill: "gradient",
      focalPoint: {
      vertical: "center",
      horizontal: "center"
    },
    contentItems: [
      {
        pattern: "image",
        src: "/images/content/backgrounds/background-tall-4.jpg",
        lazyload: false,
      }
    ]
    } %}
  {% endblock band_background %}
  
  {% block band_content %}
    // Content here
  {% endblock band_content %}
{% endembed %}
```
